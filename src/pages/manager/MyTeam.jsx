// src/pages/manager/MyTeam.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data – team members grouped by department
const teamData = {
  'Academic': [
    { id: 1, name: 'Mr. John', email: 'john@nis.edu', phone: '+855 12 345 678', position: 'Teacher', status: 'active', tasks: 4 },
    { id: 2, name: 'Mrs. Linda', email: 'linda@nis.edu', phone: '+855 12 345 679', position: 'Teacher', status: 'active', tasks: 3 },
    { id: 3, name: 'Mr. Rudi', email: 'rudi@nis.edu', phone: '+855 12 345 680', position: 'Dept Head', status: 'active', tasks: 5 },
  ],
  'Finance': [
    { id: 4, name: 'Ms. Anna', email: 'anna@nis.edu', phone: '+855 12 345 681', position: 'Finance Admin', status: 'active', tasks: 2 },
    { id: 5, name: 'Ms. Srey', email: 'srey@nis.edu', phone: '+855 12 345 682', position: 'Accountant', status: 'inactive', tasks: 0 },
  ],
  'Operations': [
    { id: 6, name: 'Mr. Budi', email: 'budi@nis.edu', phone: '+855 12 345 683', position: 'Staff', status: 'active', tasks: 3 },
    { id: 7, name: 'Ms. Siti', email: 'siti@nis.edu', phone: '+855 12 345 684', position: 'Staff', status: 'active', tasks: 2 },
  ],
  'HR': [
    { id: 8, name: 'Ms. Davy', email: 'davy@nis.edu', phone: '+855 12 345 685', position: 'HR Admin', status: 'active', tasks: 1 },
  ],
};

// Position badge colors
const getPositionBadgeClass = (position) => {
  if (position === 'Teacher') return 'bg-blue-100 text-blue-700';
  if (position === 'Dept Head') return 'bg-purple-100 text-purple-700';
  if (position === 'Finance Admin' || position === 'Accountant') return 'bg-green-100 text-green-700';
  if (position === 'HR Admin') return 'bg-pink-100 text-pink-700';
  return 'bg-gray-100 text-gray-700';
};

export default function MyTeam() {
  const navigate = useNavigate();
  const [expandedDept, setExpandedDept] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDepartment = (dept) => {
    setExpandedDept(expandedDept === dept ? null : dept);
  };

  // Get department summary stats
  const getDeptStats = (dept) => {
    const members = teamData[dept];
    const activeCount = members.filter(m => m.status === 'active').length;
    const totalTasks = members.reduce((sum, m) => sum + m.tasks, 0);
    return { activeCount, totalTasks, totalMembers: members.length };
  };

  // Search across all departments
  const getSearchResults = () => {
    const results = [];
    Object.keys(teamData).forEach(dept => {
      teamData[dept].forEach(member => {
        if (
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.position.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({ ...member, department: dept });
        }
      });
    });
    return results;
  };

  const searchResults = searchTerm ? getSearchResults() : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">My Team</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, or position..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-500 mt-2">
            Found {searchResults.length} result(s)
          </p>
        )}
      </div>

      {/* Search Results View */}
      {searchTerm && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Position</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Tasks</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{member.name}</td>
                  <td className="px-4 py-3">{member.department}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPositionBadgeClass(member.position)}`}>
                      {member.position}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{member.email}</td>
                  <td className="px-4 py-3">{member.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{member.tasks}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate('/manager/team/manage', { state: { memberId: member.id } })}
                      className="text-blue-900 hover:underline text-sm"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {searchResults.length === 0 && (
            <div className="text-center py-8 text-gray-400">No team members found</div>
          )}
        </div>
      )}

      {/* Department View (when no search) */}
      {!searchTerm && (
        <div className="space-y-4">
          {Object.keys(teamData).map((dept) => {
            const stats = getDeptStats(dept);
            const isExpanded = expandedDept === dept;
            const members = teamData[dept];

            return (
              <div key={dept} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Department Header - Click to expand/collapse */}
                <button
                  onClick={() => toggleDepartment(dept)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-l-4 border-blue-900"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {dept === 'Academic' && '📚'}
                      {dept === 'Finance' && '💰'}
                      {dept === 'Operations' && '⚙️'}
                      {dept === 'HR' && '👥'}
                    </span>
                    <div className="text-left">
                      <h2 className="text-lg font-semibold text-blue-900">{dept} Department</h2>
                      <p className="text-xs text-gray-500">
                        {stats.totalMembers} members • {stats.activeCount} active • {stats.totalTasks} tasks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {members.slice(0, 3).map((m) => (
                        <div key={m.id} className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                          {m.name.charAt(0)}
                        </div>
                      ))}
                      {members.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold border-2 border-white">
                          +{members.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </button>

                {/* Department Table - Expandable */}
                {isExpanded && (
                  <div className="overflow-x-auto border-t">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left">Name</th>
                          <th className="px-4 py-3 text-left">Position</th>
                          <th className="px-4 py-3 text-left">Email</th>
                          <th className="px-4 py-3 text-left">Phone</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Tasks</th>
                          <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.map((member) => (
                          <tr key={member.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">{member.name}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPositionBadgeClass(member.position)}`}>
                                {member.position}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-500">{member.email}</td>
                            <td className="px-4 py-3">{member.phone}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {member.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">{member.tasks}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => navigate('/manager/roles')}
                                className="text-blue-900 hover:underline text-sm"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Stats Footer */}
      {!searchTerm && (
        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-900">
                {Object.values(teamData).reduce((sum, dept) => sum + dept.length, 0)}
              </div>
              <div className="text-xs text-gray-500">Total Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Object.values(teamData).reduce((sum, dept) => sum + dept.filter(m => m.status === 'active').length, 0)}
              </div>
              <div className="text-xs text-gray-500">Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">
                {Object.values(teamData).reduce((sum, dept) => sum + dept.reduce((s, m) => s + m.tasks, 0), 0)}
              </div>
              <div className="text-xs text-gray-500">Total Tasks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Object.keys(teamData).length}
              </div>
              <div className="text-xs text-gray-500">Departments</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}