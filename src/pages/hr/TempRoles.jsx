import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockTempRoles = [
  { id: 1, staff: 'Mr. John', position: 'Dept Head', startDate: '2025-06-01', endDate: '2025-06-25', daysLeft: 5, status: 'active' },
  { id: 2, staff: 'Ms. Anna', position: 'Finance Admin', startDate: '2025-06-05', endDate: '2025-06-28', daysLeft: 8, status: 'active' },
  { id: 3, staff: 'Mr. Rudi', position: 'Manager', startDate: '2025-05-01', endDate: '2025-06-30', daysLeft: 10, status: 'active' },
  { id: 4, staff: 'Mrs. Linda', position: 'Teacher', startDate: '2025-03-01', endDate: '2025-06-15', daysLeft: -5, status: 'expired' },
];

export default function TempRoles() {
  const navigate = useNavigate();
  const [tempRoles, setTempRoles] = useState(mockTempRoles);
  const [search, setSearch] = useState('');

  const filtered = tempRoles.filter(t =>
    t.staff.toLowerCase().includes(search.toLowerCase()) ||
    t.position.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status, daysLeft) => {
    if (status === 'expired') {
      return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 Expired</span>;
    } else if (daysLeft <= 7) {
      return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 Expiring Soon</span>;
    }
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">🟢 Active</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">⏱️ Temp Roles</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search staff or position..."
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Staff</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">End Date</th>
              <th className="px-4 py-3 text-left">Days Left</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.staff}</td>
                <td className="px-4 py-3">{item.position}</td>
                <td className="px-4 py-3">{item.startDate}</td>
                <td className="px-4 py-3">{item.endDate}</td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${item.daysLeft < 0 ? 'text-red-600' : item.daysLeft <= 7 ? 'text-orange-600' : 'text-green-600'}`}>
                    {item.daysLeft} days
                  </span>
                </td>
                <td className="px-4 py-3">{getStatusBadge(item.status, item.daysLeft)}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm mr-2">Renew</button>
                  <button className="text-green-600 hover:underline text-sm mr-2">Convert</button>
                  <button className="text-red-500 hover:underline text-sm">Let Expire</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400">No temp roles found</div>
        )}
      </div>
    </div>
  );
}