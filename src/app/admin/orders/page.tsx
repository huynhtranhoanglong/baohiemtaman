'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, RefreshCw, Mail, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Order {
  timestamp: string;
  provider: string;
  vehicleType: string;
  plate: string;
  chassis: string;
  engine: string;
  startDate: string;
  endDate: string;
  email: string;
  amount: string;
  customerName: string;
  orderId: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.data);
      } else {
        setError(data.message || 'Không thể tải danh sách đơn hàng');
      }
    } catch (e) {
      setError('Lỗi kết nối tới máy chủ');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <ShoppingCart className="text-primary" /> Quản lý Đơn hàng (Đồng bộ theo thời gian thực)
        </h2>
        <button 
          onClick={fetchOrders} 
          disabled={isLoading}
          className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin text-primary' : ''} />
          {isLoading ? 'Đang tải...' : 'Làm mới Dữ liệu'}
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2 mb-6">
          <AlertCircle size={20} /> {error}
        </div>
      ) : null}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-bold sticky top-0">
              <tr>
                <th className="px-6 py-4">Mã Đơn / Thời gian</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Xe / Biển số</th>
                <th className="px-6 py-4">Số Tiền</th>
                <th className="px-6 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Chưa có đơn hàng nào hoặc dữ liệu trống.
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => {
                  const queryParams = new URLSearchParams({
                    name: order.customerName,
                    email: order.email,
                    plate: order.plate,
                    chassis: order.chassis,
                    engine: order.engine,
                    startDate: order.startDate,
                    endDate: order.endDate,
                    amount: order.amount.replace(/[,.]/g, '') // remove existing commas if any
                  }).toString();

                  return (
                    <tr key={idx} className="hover:bg-blue-50/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-900">{order.orderId || '#TA000'}</div>
                        <div className="text-xs text-gray-400 mt-1">{order.timestamp}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{order.customerName || '(Trống)'}</div>
                        <div className="text-gray-500">{order.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium mb-1">
                          {order.vehicleType}
                        </span>
                        <div className="font-bold uppercase tracking-wider">{order.plate || '(Chưa điền)'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-orange-600">
                        {order.amount ? Number(order.amount.replace(/[,.]/g, '')).toLocaleString('vi-VN') + ' đ' : '...'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col gap-2">
                          <Link 
                            href={`/admin/email?type=payment&${queryParams}`}
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg font-medium shadow shadow-primary/20 transition-all text-xs"
                          >
                            <Mail size={14} /> Gửi Yêu Cầu TT
                          </Link>
                          <Link 
                            href={`/admin/email?type=certificate&${queryParams}`}
                            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-medium shadow shadow-emerald-600/20 transition-all text-xs"
                          >
                            <Mail size={14} /> Giao Chứng Nhận
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
