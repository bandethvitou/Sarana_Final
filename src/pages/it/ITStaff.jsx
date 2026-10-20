import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockStaff = [
  { id: 1, name: 'Mr. David', email: 'david@nis.edu', role: 'IT Lead', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: 'Ms. Linda', email: 'linda@nis.edu', role: 'IT Support', status: 'active', joinDate: '2024-03-01' },
  { id: 3, name: 'Mr. John', email: 'john@nis.edu', role: 'IT Support', status: 'active', joinDate: '2024-04-10' },
];

export default function ITStaff() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(mockStaff);
  const [search, setSearch] = useState('');

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    return status === 'active'
      ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Active</span>
      : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">❌ Inactive</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">👥 IT Staff Management</h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search staff..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Join Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.role}</td>
                <td className="px-4 py-3">{s.joinDate}</td>
                <td className="px-4 py-3">{getStatusBadge(s.status)}</td>
                <td className="px-4 py-3">
                  <button className="text-orange-500 hover:underline text-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStaff.length === 0 && (
          <div className="text-center py-8 text-gray-400">No staff found</div>
        )}
      </div>
    </div>
  );
}