import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const reportData = {
  totalBooks: 5200,
  totalCheckouts: 420,
  totalOverdue: 15,
  totalReturns: 380,
  monthlyCheckouts: 85,
};

export default function LibraryReports() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('monthly');

  const exportToExcel = () => {
    const data = [
      ['LIBRARY REPORT', new Date().toISOString().split('T')[0]],
      [''],
      ['Total Books', reportData.totalBooks],
      ['Total Checkouts', reportData.totalCheckouts],
      ['Total Overdue', reportData.totalOverdue],
      ['Total Returns', reportData.totalReturns],
      ['Monthly Checkouts', reportData.monthlyCheckouts],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Library Report');
    XLSX.writeFile(wb, `Library_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
    toast.success('📊 Report exported successfully!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📄 Library Reports</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border rounded-lg px-4 py-2 bg-white" value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="monthly">Monthly Library Report</option>
          <option value="overdue">Overdue Summary Report</option>
          <option value="inventory">Book Inventory Report</option>
        </select>
        <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          📤 Export Excel
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          📄 Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-blue-900">{reportData.totalBooks}</div>
          <div className="text-sm text-gray-500">Total Books</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-green-600">{reportData.totalCheckouts}</div>
          <div className="text-sm text-gray-500">Total Checkouts</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-red-600">{reportData.totalOverdue}</div>
          <div className="text-sm text-gray-500">Total Overdue</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-purple-600">{reportData.monthlyCheckouts}</div>
          <div className="text-sm text-gray-500">Monthly Checkouts</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📋 Report Preview</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between border-b py-2"><span className="text-gray-500">Report Type</span><span className="font-medium">{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</span></div>
          <div className="flex justify-between border-b py-2"><span className="text-gray-500">Generated Date</span><span className="font-medium">{new Date().toLocaleDateString()}</span></div>
          <div className="flex justify-between border-b py-2"><span className="text-gray-500">Total Books</span><span className="font-medium">{reportData.totalBooks}</span></div>
          <div className="flex justify-between border-b py-2"><span className="text-gray-500">Active Checkouts</span><span className="font-medium">{reportData.totalCheckouts - reportData.totalReturns}</span></div>
          <div className="flex justify-between border-b py-2"><span className="text-gray-500">Overdue</span><span className="font-medium text-red-600">{reportData.totalOverdue}</span></div>
          <div className="flex justify-between py-2"><span className="text-gray-500">Return Rate</span><span className="font-medium">{(reportData.totalReturns / reportData.totalCheckouts * 100).toFixed(1)}%</span></div>
        </div>
      </div>
    </div>
  );
}