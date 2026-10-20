import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

export default function CounsellorReports() {
  const navigate = useNavigate();

  const exportToExcel = () => {
    toast.success('📊 Report exported successfully!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📄 Counsellor Reports</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border rounded-lg px-4 py-2 bg-white">
          <option>Case Summary Report</option>
          <option>At-Risk Student Report</option>
          <option>Session Activity Report</option>
          <option>Monthly Counselling Report</option>
        </select>
        <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">📤 Export Excel</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">📄 Export PDF</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-blue-900">8</div>
          <div className="text-sm text-gray-500">Active Cases</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-red-600">12</div>
          <div className="text-sm text-gray-500">At-Risk Students</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-green-600">15</div>
          <div className="text-sm text-gray-500">Resolved This Month</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📋 Confidential Report Preview</h2>
        <p className="text-sm text-gray-500">This report contains sensitive student information.</p>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">🔒 Confidential – For authorized personnel only</p>
        </div>
      </div>
    </div>
  );
}