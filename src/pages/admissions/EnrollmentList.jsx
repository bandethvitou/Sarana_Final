import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockStudents = [
  { id: 'S001', name: 'Sok Heng', level: 'Kids', class: 'Grade 5', enrolled: '2025-01-15', status: 'active' },
  { id: 'S002', name: 'Mey Lin', level: 'Junior', class: 'Grade 8', enrolled: '2024-09-01', status: 'active' },
  { id: 'S003', name: 'David', level: 'Senior', class: 'Grade 10', enrolled: '2024-08-20', status: 'active' },
  { id: 'S004', name: 'Sok Sreyneang', level: 'Kids', class: 'Grade 3', enrolled: '2025-02-10', status: 'graduated' },
  { id: 'S005', name: 'Kim Menghong', level: 'Baby', class: '0.2', enrolled: '2025-03-01', status: 'active' },
  { id: 'S006', name: 'Chan Rith', level: 'Senior', class: 'Grade 12', enrolled: '2023-08-15', status: 'dropped' },
];

const levels = ['All', 'Baby', 'Kids', 'Junior', 'Senior'];
const statuses = ['All', 'active', 'graduated', 'dropped', 'transferred'];

export default function EnrollmentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'All' || s.level === levelFilter;
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchLevel && matchStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Active</span>;
      case 'graduated': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">🎓 Graduated</span>;
      case 'dropped': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">❌ Dropped</span>;
      case 'transferred': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🔄 Transferred</span>;
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">👥 Enrollment List</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <input type="text" placeholder="Search by name or ID..." className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          {levels.map(l => <option key={l}>{l}</option>)}
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {statuses.map(s => <option key={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Enrolled</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{student.id}</td>
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.level}</td>
                <td className="px-4 py-3">{student.class}</td>
                <td className="px-4 py-3">{student.enrolled}</td>
                <td className="px-4 py-3">{getStatusBadge(student.status)}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm mr-2">View Profile</button>
                  <button className="text-orange-500 hover:underline text-sm mr-2">Transfer</button>
                  <button className="text-red-500 hover:underline text-sm">Mark Dropped</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-8 text-gray-400">No students found</div>}
      </div>
    </div>
  );
}