import { NextRequest, NextResponse } from 'next/server';
import vision from '@google-cloud/vision';
import path from 'path';

// Tạo Client cho Vision API
// Ưu tiên đọc từ biến môi trường nếu chạy trên Vercel, hoặc dùng trực tiếp file JSON tại Local
const clientConfigs: any = {};
if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  try {
    const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON, 'base64').toString('utf8'));
    clientConfigs.credentials = credentials;
  } catch (e) {
    console.error("Lỗi parse GOOGLE_APPLICATION_CREDENTIALS_JSON");
  }
} else {
  // Tại Localhost, trỏ tới file google-credentials.json gốc dự án
  clientConfigs.keyFilename = path.join(process.cwd(), 'google-credentials.json');
}

const client = new vision.ImageAnnotatorClient(clientConfigs);

/**
 * Hàm helper: trích xuất giá trị từ dòng hiện tại hoặc dòng kế tiếp.
 * 
 * Xử lý 2 trường hợp phổ biến trong Cavet:
 *   Trường hợp 1: "Tên chủ xe: NGUYỄN VĂN A"  → lấy phần sau dấu ":"
 *   Trường hợp 2: "Tên chủ xe"
 *                  "NGUYỄN VĂN A"               → lấy dòng kế tiếp
 */
function extractValue(currentLine: string, nextLine: string | undefined, cleanRegex?: RegExp): string {
  // Trường hợp 1: Giá trị nằm sau dấu ":" hoặc "：" trên cùng dòng
  const colonIndex = currentLine.search(/[:：]/);
  if (colonIndex !== -1) {
    const afterColon = currentLine.substring(colonIndex + 1).trim();
    if (afterColon.length > 0) {
      return cleanRegex ? afterColon.replace(cleanRegex, '') : afterColon;
    }
  }

  // Trường hợp 2: Giá trị nằm ở dòng kế tiếp
  const value = nextLine || '';
  return cleanRegex ? value.replace(cleanRegex, '') : value;
}

export async function POST(req: NextRequest) {
  try {
    // Fix #3: Kiểm tra Content-Length để từ chối payload quá lớn sớm
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Dữ liệu ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn.' },
        { status: 413 }
      );
    }

    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: 'Vui lòng cung cấp dữ liệu ảnh.' }, { status: 400 });
    }

    // Xử lý base64 prefix: `data:image/jpeg;base64,...` -> `...`
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const request = {
      image: { content: base64Data },
      features: [{ type: 'DOCUMENT_TEXT_DETECTION' }], // Tối ưu để đọc văn bản dày đặc
    };

    // Gọi Google Vision API
    const [result] = await client.annotateImage(request);
    const fullTextAnnotation = result.fullTextAnnotation;
    
    if (!fullTextAnnotation || !fullTextAnnotation.text) {
      return NextResponse.json({ 
        success: false, 
        error: 'Không nhận diện được văn bản từ ảnh. Vui lòng chụp rõ nét hơn.',
        extracted: {} 
      });
    }

    const text = fullTextAnnotation.text;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    
    const extracted = {
      ownerName: '',
      licensePlate: '',
      chassisNumber: '',
      engineNumber: '',
      address: '',
    };

    // Regex dọn dẹp cho từng loại field
    const alphanumericDotDash = /[^A-Z0-9.\-]/gi;  // Cho biển số (giữ dấu . và -)
    const alphanumericOnly = /[^A-Z0-9]/gi;          // Cho số khung, số máy
    
    // Fix #2: Logic parse text linh hoạt — kiểm tra cùng dòng (sau dấu ":") trước, rồi mới lấy dòng kế
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].toUpperCase();
        const originalLine = lines[i]; // Giữ nguyên bản gốc (có dấu) cho extractValue
        
        if (line.includes("TÊN") && (line.includes("CHỦ XE") || line.includes("OWNER"))) {
            if (!extracted.ownerName) {
              extracted.ownerName = extractValue(originalLine, lines[i+1]);
            }
        }
        else if (line.includes("BIỂN SỐ") || line.includes("LICENSE PLATE")) {
            if (!extracted.licensePlate) {
              extracted.licensePlate = extractValue(originalLine, lines[i+1], alphanumericDotDash);
            }
        }
        else if (line.includes("SỐ KHUNG") || line.includes("CHASSIS NO")) {
            if (!extracted.chassisNumber) {
              extracted.chassisNumber = extractValue(originalLine, lines[i+1], alphanumericOnly);
            }
        }
        else if (line.includes("SỐ MÁY") || line.includes("ENGINE NO")) {
            if (!extracted.engineNumber) {
              extracted.engineNumber = extractValue(originalLine, lines[i+1], alphanumericOnly);
            }
        }
        else if (line.includes("ĐỊA CHỈ") || line.includes("ADDRESS")) {
            if (!extracted.address) {
              // Địa chỉ cần xử lý đặc biệt vì có thể trải dài nhiều dòng
              let addr = extractValue(originalLine, lines[i+1]);

              // Nếu giá trị lấy từ dòng kế (không phải cùng dòng), thử ghép thêm dòng tiếp theo
              const colonIndex = originalLine.search(/[:：]/);
              const isFromSameLine = colonIndex !== -1 && originalLine.substring(colonIndex + 1).trim().length > 0;

              if (!isFromSameLine && lines[i+2] && 
                  !lines[i+2].toUpperCase().includes("NHÃN HIỆU") && 
                  !lines[i+2].toUpperCase().includes("BRAND") && 
                  !lines[i+2].includes('Nơi cấp')) {
                  addr += ", " + lines[i+2];
              }
              extracted.address = addr.replace(/^, | ,/g, '').trim();
            }
        }
    }

    // Kiểm tra: nếu không trích xuất được field nào → trả lỗi thay vì success rỗng
    const filledCount = Object.values(extracted).filter(v => v).length;
    if (filledCount === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Không nhận diện được thông tin Cavet từ ảnh này. Vui lòng chụp rõ nét hơn hoặc điền thủ công.',
      });
    }
    
    return NextResponse.json({ 
      success: true,
      // Chỉ trả raw text khi đang ở môi trường development (tránh lộ thông tin ở production)
      ...(process.env.NODE_ENV === 'development' && { text }),
      extracted
    });
    
  } catch (error: any) {
    console.error('Lỗi OCR API:', error);
    return NextResponse.json({ 
      error: 'Lỗi khi xử lý hình ảnh.', 
      details: error.message 
    }, { status: 500 });
  }
}
