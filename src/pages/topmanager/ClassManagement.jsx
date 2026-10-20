// src/pages/topmanager/ClassManagement.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClassManagement() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('All');

  const classesData = [
    { id: 1, name: 'Grade 4A', level: 'Kids', teacher: 'Mrs. Linda', students: 18, avgScore: 82, schedule: 'Mon/Wed 8:00-10:00', status: 'Active' },
    { id: 2, name: 'Grade 5A', level: 'Kids', teacher: 'Mr. John', students: 22, avgScore: 85, schedule: 'Tue/Thu 9:00-11:00', status: 'Active' },
    { id: 3, name: 'Grade 6A', level: 'Junior', teacher: 'Mr. John', students: 20, avgScore: 79, schedule: 'Mon/Wed 10:00-12:00', status: 'Active' },
    { id: 4, name: 'Grade 7A', level: 'Junior', teacher: 'Mr. Sophea', students: 19, avgScore: 76, schedule: 'Tue/Thu 13:00-15:00', status: 'Active' },
    { id: 5, name: 'Grade 8A', level: 'Senior', teacher: 'Ms. Dara', students: 21, avgScore: 74, schedule: 'Mon/Wed 14:00-16:00', status: 'Inactive' },
  ];

  const filteredClasses = classesData.filter(c => selectedLevel === 'All' || c.level === selectedLevel);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">🏫 Class Management</h1>
        <button
          onClick={() => navigate('/top-manager/class/new')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          + Add New Class
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Level</label>
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option>All</option>
              <option>Kids</option>
              <option>Junior</option>
              <option>Senior</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Status</label>
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Class Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-5 py-3 text-left">Class Name</th>
                <th className="px-5 py-3 text-left">Level</th>
                <th className="px-5 py-3 text-left">Teacher</th>
                <th className="px-5 py-3 text-center">Students</th>
                <th className="px-5 py-3 text-center">Avg Score</th>
                <th className="px-5 py-3 text-left">Schedule</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map(cls => (
                <tr key={cls.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-blue-900">{cls.name}</td>
                  <td className="px-5 py-3">{cls.level}</td>
                  <td className="px-5 py-3">{cls.teacher}</td>
                  <td className="px-5 py-3 text-center">{cls.students}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`font-semibold ${cls.avgScore >= 80 ? 'text-green-600' : cls.avgScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {cls.avgScore}%
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm">{cls.schedule}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      cls.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>{cls.status}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                      <button className="text-orange-600 hover:text-orange-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}