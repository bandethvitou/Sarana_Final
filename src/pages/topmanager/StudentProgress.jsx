// src/pages/topmanager/StudentProgress.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentProgress() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  const studentsData = [
    { 
      id: 1, 
      name: 'KY SOKKUNVUTHI', 
      class: 'Grade 5A', 
      teacher: 'Mr. John',
      scores: {
        q1: 88, q2: 92, q3: 96, q4: null
      },
      trend: 'improving',
      attendance: 95,
      behavior: 'Excellent',
      parentContact: '+855 12 345 678'
    },
    { 
      id: 2, 
      name: 'Kim Menghong', 
      class: 'Grade 5A', 
      teacher: 'Mr. John',
      scores: {
        q1: 72, q2: 75, q3: 78, q4: null
      },
      trend: 'stable',
      attendance: 88,
      behavior: 'Good',
      parentContact: '+855 12 345 679'
    },
    { 
      id: 3, 
      name: 'Chea Sopheap', 
      class: 'Grade 4A', 
      teacher: 'Mrs. Linda',
      scores: {
        q1: 85, q2: 88, q3: 92, q4: null
      },
      trend: 'improving',
      attendance: 92,
      behavior: 'Excellent',
      parentContact: '+855 12 345 680'
    },
  ];

  const filteredStudents = studentsData.filter(s => 
    (selectedClass === 'All' || s.class === selectedClass) &&
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📚 Student Progress Tracking</h1>
        <button
          onClick={() => navigate('/top-manager/score-analytics')}
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          View Analytics
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option>All Classes</option>
              <option>Grade 4A</option>
              <option>Grade 5A</option>
              <option>Grade 6A</option>
            </select>
          </div>
          <div>
            <select className="border rounded-lg px-3 py-2">
              <option>All Status</option>
              <option>Improving</option>
              <option>Stable</option>
              <option>Declining</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStudents.map(student => (
          <div key={student.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-3 text-white">
              <h3 className="font-semibold">{student.name}</h3>
              <p className="text-xs text-blue-200">{student.class} • {student.teacher}</p>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Quarterly Progress</div>
                <div className="flex justify-between gap-2">
                  {['Q1', 'Q2', 'Q3', 'Q4'].map((q, idx) => (
                    <div key={q} className="flex-1 text-center">
                      <div className="text-xs text-gray-400">{q}</div>
                      <div className={`font-bold ${student.scores[`q${idx+1}`] ? 
                        (student.scores[`q${idx+1}`] >= 80 ? 'text-green-600' : 
                         student.scores[`q${idx+1}`] >= 60 ? 'text-yellow-600' : 'text-red-600') 
                        : 'text-gray-400'}`}>
                        {student.scores[`q${idx+1}`] || '—'}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <span className="text-gray-500">Attendance:</span>
                  <span className="ml-1 font-medium">{student.attendance}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Behavior:</span>
                  <span className={`ml-1 font-medium ${
                    student.behavior === 'Excellent' ? 'text-green-600' : 'text-blue-600'
                  }`}>{student.behavior}</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2 border-t">
                <button className="flex-1 text-center text-sm bg-blue-50 text-blue-600 py-1.5 rounded-lg hover:bg-blue-100">
                  View Details
                </button>
                <button className="flex-1 text-center text-sm bg-orange-50 text-orange-600 py-1.5 rounded-lg hover:bg-orange-100">
                  Contact Parent
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}