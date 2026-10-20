import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const mockStaffSummary = {
  total: 34,
  byDepartment: {
    Academic: 15,
    Admin: 8,
    Finance: 3,
    HR: 2,
    Operations: 6,
  },
  byStatus: {
    active: 30,
    inactive: 4,
  },
};

const mockPositionChanges = [
  { date: '2025-06-18', staff: 'Mr. John', action: 'Promoted', positions: 'Teacher → Dept Head', changedBy: 'HR Admin' },
  { date: '2025-06-15', staff: 'Ms. Anna', action: 'Demoted', positions: 'Finance Admin → Staff', changedBy: 'HR Admin' },
];

const mockNewHires = [
  { name: 'Mr. David', position: 'IT Support', department: 'Operations', startDate: '2025-06-15' },
  { name: 'Ms. Lisa', position: 'Teacher', department: 'Academic', startDate: '2025-06-10' },
  { name: 'Mr. Tom', position: 'Finance Admin', department: 'Finance', startDate: '2025-06-01' },
];

const mockLeaveSummary = {
  totalRequests: 45,
  approved: 30,
  pending: 8,
  denied: 7,
};

export default function HrReports() {
  const navigate = useNavigate();

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📄 HR Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Summary */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">👥 Staff Summary</h2>
            <button onClick={() => exportToExcel([mockStaffSummary], 'Staff_Summary')} className="text-sm text-orange-500 hover:underline">Export</button>
          </div>
          <div className="space-y-2">
            <p><strong>Total Staff:</strong> {mockStaffSummary.total}</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(mockStaffSummary.byDepartment).map(([dept, count]) => (
                <div key={dept} className="bg-gray-50 rounded-lg p-2 text-center text-sm">
                  <span className="font-bold">{count}</span> - {dept}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              <span><strong>Active:</strong> {mockStaffSummary.byStatus.active}</span>
              <span><strong>Inactive:</strong> {mockStaffSummary.byStatus.inactive}</span>
            </div>
          </div>
        </div>

        {/* Leave Summary */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">📝 Leave Summary</h2>
            <button onClick={() => exportToExcel([mockLeaveSummary], 'Leave_Summary')} className="text-sm text-orange-500 hover:underline">Export</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-900">{mockLeaveSummary.totalRequests}</div>
              <div className="text-sm text-gray-500">Total Requests</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{mockLeaveSummary.approved}</div>
              <div className="text-sm text-gray-500">Approved</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">{mockLeaveSummary.pending}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{mockLeaveSummary.denied}</div>
              <div className="text-sm text-gray-500">Denied</div>
            </div>
          </div>
        </div>

        {/* Position Changes */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">🔄 Position Changes</h2>
            <button onClick={() => exportToExcel(mockPositionChanges, 'Position_Changes')} className="text-sm text-orange-500 hover:underline">Export</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Staff</th>
                  <th className="px-3 py-2 text-left">Action</th>
                  <th className="px-3 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockPositionChanges.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{item.staff}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.action === 'Promoted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.action}</span>
                    </td>
                    <td className="px-3 py-2">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Hires */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">🆕 New Hires</h2>
            <button onClick={() => exportToExcel(mockNewHires, 'New_Hires')} className="text-sm text-orange-500 hover:underline">Export</button>
          </div>
          <div className="space-y-3">
            {mockNewHires.map((hire, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{hire.name}</p>
                  <p className="text-sm text-gray-500">{hire.position} - {hire.department}</p>
                </div>
                <span className="text-sm text-gray-400">{hire.startDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}