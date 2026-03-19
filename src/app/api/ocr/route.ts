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

export async function POST(req: NextRequest) {
  try {
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
      return NextResponse.json({ extracted: {} });
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
    
    // Logic quét dòng và đọc giá trị kế tiếp (rất phổ biến đối với cấu trúc Cavet)
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].toUpperCase();
        
        if (line.includes("TÊN") && (line.includes("CHỦ XE") || line.includes("OWNER"))) {
            if (!extracted.ownerName) extracted.ownerName = lines[i+1] || '';
        }
        else if (line.includes("BIỂN SỐ") || line.includes("LICENSE PLATE")) {
            if (!extracted.licensePlate) extracted.licensePlate = (lines[i+1] || '').replace(/[^A-Z0-9-]/gi, '');
        }
        else if (line.includes("SỐ KHUNG") || line.includes("CHASSIS NO")) {
            if (!extracted.chassisNumber) extracted.chassisNumber = (lines[i+1] || '').replace(/[^A-Z0-9]/gi, '');
        }
        else if (line.includes("SỐ MÁY") || line.includes("ENGINE NO")) {
            if (!extracted.engineNumber) extracted.engineNumber = (lines[i+1] || '').replace(/[^A-Z0-9]/gi, '');
        }
        else if (line.includes("ĐỊA CHỈ") || line.includes("ADDRESS")) {
            if (!extracted.address) {
              let addr = lines[i+1] || '';
              // Lấy thêm dòng tiếp theo nếu dòng đó không phải là Title của trường tiếp theo
              if (lines[i+2] && !lines[i+2].toUpperCase().includes("NHÃN HIỆU") && !lines[i+2].toUpperCase().includes("BRAND") && !lines[i+2].includes('Nơi cấp')) {
                  addr += ", " + lines[i+2];
              }
              extracted.address = addr.replace(/^, | ,/g, '').trim();
            }
        }
    }
    
    return NextResponse.json({ 
      success: true,
      text: text, // Trả luôn text thô để log debug ở client nếu cần
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
