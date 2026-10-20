import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialManagers = [
  { id: 1, name: 'Mr. John', email: 'john@nis.edu', department: 'Academic', teamSize: 8, status: 'active', performance: '92%' },
  { id: 2, name: 'Ms. Anna', email: 'anna@nis.edu', department: 'Finance', teamSize: 5, status: 'active', performance: '88%' },
  { id: 3, name: 'Mr. Rudi', email: 'rudi@nis.edu', department: 'Operations', teamSize: 6, status: 'active', performance: '75%' },
  { id: 4, name: 'Mrs. Linda', email: 'linda@nis.edu', department: 'Academic', teamSize: 4, status: 'inactive', performance: '60%' },
];

export default function Managers() {
  const [managers] = useState(initialManagers);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const navigate = useNavigate();

  const departments = ['All', 'Academic', 'Finance', 'Operations', 'HR'];

  const filteredManagers = managers.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = departmentFilter === 'All' || m.department === departmentFilter;
    return matchSearch && matchDept;
  });

  const getStatusBadge = (status) => {
    return status === 'active'
      ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
      : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Inactive</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">👥 Managers</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">{managers.length}</div>
          <div className="text-sm text-gray-500">Total Managers</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{managers.filter(m => m.status === 'active').length}</div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{managers.filter(m => m.status === 'inactive').length}</div>
          <div className="text-sm text-gray-500">Inactive</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div className="text-2xl font-bold text-orange-600">{Math.round(managers.reduce((acc, m) => acc + parseInt(m.performance), 0) / managers.length)}%</div>
          <div className="text-sm text-gray-500">Avg Performance</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* Managers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Team Size</th>
              <th className="px-4 py-3 text-left">Performance</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredManagers.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3 text-gray-500">{m.email}</td>
                <td className="px-4 py-3">{m.department}</td>
                <td className="px-4 py-3">{m.teamSize}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${parseInt(m.performance) >= 80 ? 'bg-green-500' : parseInt(m.performance) >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: m.performance }}></div>
                    </div>
                    <span className="text-xs text-gray-500">{m.performance}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{getStatusBadge(m.status)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => navigate('/top-manager/reviews')}
                    className="text-orange-500 hover:underline text-sm font-medium"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredManagers.length === 0 && (
          <div className="text-center py-8 text-gray-400">No managers found</div>
        )}
      </div>
    </div>
  );
}