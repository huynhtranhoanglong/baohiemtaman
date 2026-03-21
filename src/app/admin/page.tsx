export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Xin chào, Quản trị viên!</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Trang chủ Admin</h3>
        <p className="text-gray-600">
          Đây là bảng điều khiển (Dashboard) dành cho người quản lý của Bảo hiểm Tâm An.
          Hiện tại tính năng Đăng nhập bảo mật đã được kích hoạt.
        </p>
        <p className="text-gray-600 mt-2">
          Các module khác như <span className="font-medium">Quản lý Đơn hàng</span> và <span className="font-medium">Gửi Email Tự động</span> sẽ được lắp ráp vào thanh menu bên trái trong các bản cập nhật sắp tới.
        </p>
      </div>
    </div>
  );
}
