import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const enrollmentData = [
  { month: 'Jan', new: 15, dropouts: 5, total: 1220 },
  { month: 'Feb', new: 12, dropouts: 3, total: 1229 },
  { month: 'Mar', new: 18, dropouts: 7, total: 1240 },
  { month: 'Apr', new: 10, dropouts: 4, total: 1246 },
  { month: 'May', new: 20, dropouts: 8, total: 1258 },
  { month: 'Jun', new: 35, dropouts: 8, total: 1285 },
];

const applicationSummary = {
  total: 48,
  pending: 12,
  approved: 28,
  rejected: 5,
  draft: 3,
};

const tourSummary = {
  total: 12,
  scheduled: 8,
  completed: 3,
  cancelled: 1,
};

export default function AdmissionsReports() {
  const navigate = useNavigate();

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📄 Admissions Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">📊 Enrollment Summary</h2>
            <button onClick={() => exportToExcel(enrollmentData, 'Enrollment_Summary')} className="text-sm text-orange-500 hover:underline">Export</button>
          </div>
          <div className="space-y-2">
            {enrollmentData.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm border-b pb-2">
                <span className="font-medium">{item.month}</span>
                <span className="text-green-600">+{item.new}</span>
                <span className="text-red-600">-{item.dropouts}</span>
                <span className="font-bold">{item.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">📋 Application Summary</h2>
            <button onClick={() => exportToExcel([applicationSummary], 'Application_Summary')} className="text-sm text-orange-500 hover:underline">Export</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-900">{applicationSummary.total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">{applicationSummary.pending}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{applicationSummary.approved}</div>
              <div className="text-sm text-gray-500">Approved</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{applicationSummary.rejected}</div>
              <div className="text-sm text-gray-500">Rejected</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-900">🏫 Tour Summary</h2>
            <button onClick={() => exportToExcel([tourSummary], 'Tour_Summary')} className="text-sm text-orange-500 hover:underline">Export</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-900">{tourSummary.total}</div>
              <div className="text-sm text-gray-500">Total Tours</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{tourSummary.scheduled}</div>
              <div className="text-sm text-gray-500">Scheduled</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{tourSummary.completed}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{tourSummary.cancelled}</div>
              <div className="text-sm text-gray-500">Cancelled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}