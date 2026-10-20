import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const monthlyData = [
  { month: 'Jan', new: 15, dropouts: 5, net: 10, total: 1220 },
  { month: 'Feb', new: 12, dropouts: 3, net: 9, total: 1229 },
  { month: 'Mar', new: 18, dropouts: 7, net: 11, total: 1240 },
  { month: 'Apr', new: 10, dropouts: 4, net: 6, total: 1246 },
  { month: 'May', new: 20, dropouts: 8, net: 12, total: 1258 },
  { month: 'Jun', new: 35, dropouts: 8, net: 27, total: 1285 },
];

const enrollmentByLevel = [
  { level: 'Baby', count: 85, color: 'bg-green-100 text-green-700' },
  { level: 'Kids', count: 520, color: 'bg-blue-100 text-blue-700' },
  { level: 'Junior', count: 310, color: 'bg-yellow-100 text-yellow-700' },
  { level: 'Senior', count: 370, color: 'bg-red-100 text-red-700' },
];

export default function EnrollmentStats() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');

  const totalStudents = monthlyData[monthlyData.length - 1].total;
  const maxValue = Math.max(...monthlyData.map(m => Math.max(m.new, m.dropouts))) * 1.3;

  const exportToExcel = () => {
    const exportData = monthlyData.map(m => ({
      Month: m.month,
      'New Students': m.new,
      Dropouts: m.dropouts,
      'Net Change': m.net,
      'Total Students': m.total,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Enrollment_Stats');
    XLSX.writeFile(workbook, `Enrollment_Stats_${selectedYear}.xlsx`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📊 Enrollment Stats</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <select className="border rounded-lg px-3 py-2 bg-white" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">📤 Export Excel</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">📄 Export PDF</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 New vs Dropouts – {selectedYear}</h2>
        <div className="flex items-end h-60 gap-4 mb-4">
          {monthlyData.map((data, idx) => {
            const newHeight = (data.new / maxValue) * 100;
            const dropoutHeight = (data.dropouts / maxValue) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="flex gap-1 w-full justify-center items-end h-48">
                  <div className="w-7 bg-green-500 rounded-t relative group" style={{ height: `${newHeight}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">+{data.new}</div>
                  </div>
                  <div className="w-7 bg-red-500 rounded-t relative group" style={{ height: `${dropoutHeight}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-red-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">-{data.dropouts}</div>
                  </div>
                </div>
                <span className="text-xs mt-2 font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-6 text-sm">
          <span className="flex items-center gap-2"><span className="w-4 h-4 bg-green-500 rounded"></span> New Students</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 bg-red-500 rounded"></span> Dropouts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Enrollment by Level</h2>
          <div className="grid grid-cols-2 gap-3">
            {enrollmentByLevel.map((item, idx) => (
              <div key={idx} className={`${item.color} rounded-xl p-4 text-center`}>
                <div className="text-3xl font-bold">{item.count}</div>
                <div className="text-sm font-medium">{item.level}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📈 Monthly Trend</h2>
          <div className="space-y-3">
            {monthlyData.map((data, idx) => {
              const trend = data.net >= 0 ? 'text-green-600' : 'text-red-600';
              return (
                <div key={idx} className="flex items-center justify-between text-sm border-b pb-2">
                  <span className="font-medium">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600">+{data.new}</span>
                    <span className="text-red-600">-{data.dropouts}</span>
                    <span className={`font-bold ${trend}`}>{data.net >= 0 ? '+' : ''}{data.net}</span>
                    <span className="text-gray-400">({data.total})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Conversion Rate</h2>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Applications → Enrolled</span>
              <span className="font-bold">73%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
              <div className="bg-blue-900 h-3 rounded-full" style={{ width: '73%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">48</div>
            <div className="text-xs text-gray-500">Applications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">35</div>
            <div className="text-xs text-gray-500">Enrolled</div>
          </div>
        </div>
      </div>
    </div>
  );
}