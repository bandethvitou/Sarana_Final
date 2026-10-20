import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const mockSalaries = [
  { id: 1, staff: 'Mr. John', department: 'Academic', position: 'Teacher', baseSalary: 1800, allowances: 200, total: 2000 },
  { id: 2, staff: 'Ms. Anna', department: 'Finance', position: 'Finance Admin', baseSalary: 2000, allowances: 250, total: 2250 },
  { id: 3, staff: 'Mr. Rudi', department: 'Operations', position: 'Manager', baseSalary: 2500, allowances: 300, total: 2800 },
  { id: 4, staff: 'Mrs. Linda', department: 'Academic', position: 'Teacher', baseSalary: 1800, allowances: 150, total: 1950 },
  { id: 5, staff: 'Ms. Siti', department: 'HR', position: 'HR Admin', baseSalary: 2000, allowances: 200, total: 2200 },
];

const departments = ['All', 'Academic', 'Admin', 'Finance', 'HR', 'Operations'];

export default function SalaryOverview() {
  const navigate = useNavigate();
  const [salaries, setSalaries] = useState(mockSalaries);
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const filtered = salaries.filter(s => {
    if (departmentFilter === 'All') return true;
    return s.department === departmentFilter;
  });

  const exportToExcel = () => {
    const exportData = filtered.map(s => ({
      Staff: s.staff,
      Department: s.department,
      Position: s.position,
      'Base Salary': s.baseSalary,
      Allowances: s.allowances,
      Total: s.total,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Salary');
    XLSX.writeFile(workbook, `Salary_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">💰 Salary Overview</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border rounded-lg px-4 py-2"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <button onClick={exportToExcel} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
          📤 Export Excel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Staff</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-right">Base Salary</th>
              <th className="px-4 py-3 text-right">Allowances</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.staff}</td>
                <td className="px-4 py-3">{s.department}</td>
                <td className="px-4 py-3">{s.position}</td>
                <td className="px-4 py-3 text-right">${s.baseSalary.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">${s.allowances.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-bold">${s.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button className="text-orange-500 hover:underline text-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400">No salary records found</div>
        )}
      </div>
    </div>
  );
}