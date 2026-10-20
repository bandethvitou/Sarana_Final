// src/pages/topmanager/TeacherPerformance.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherPerformance() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const teacherPerformanceData = [
    { 
      id: 1, 
      name: 'Mr. John', 
      subject: 'Math', 
      classes: ['Grade 5A', 'Grade 6A'],
      avgScore: 82,
      completionRate: 95,
      studentsCount: 42,
      topStudent: 'KY SOKKUNVUTHI (96%)',
      trend: '+5%',
      status: 'Excellent',
      attendance: 98,
      feedback: 'Great teaching methodology'
    },
    { 
      id: 2, 
      name: 'Mrs. Linda', 
      subject: 'English', 
      classes: ['Grade 4A'],
      avgScore: 79,
      completionRate: 88,
      studentsCount: 18,
      topStudent: 'Chea Sopheap (92%)',
      trend: '+2%',
      status: 'Good',
      attendance: 95,
      feedback: 'Needs more interactive activities'
    },
    { 
      id: 3, 
      name: 'Mr. Sophea', 
      subject: 'Science', 
      classes: ['Grade 7A'],
      avgScore: 74,
      completionRate: 72,
      studentsCount: 19,
      topStudent: 'Long Vannak (85%)',
      trend: '-3%',
      status: 'Needs Improvement',
      attendance: 88,
      feedback: 'Students struggling with practical work'
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Excellent': return 'bg-green-100 text-green-700';
      case 'Good': return 'bg-blue-100 text-blue-700';
      case 'Needs Improvement': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">👩‍🏫 Teacher Performance Review</h1>
        <button
          onClick={() => navigate('/top-manager/reports')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Generate Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Subject</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option>All</option>
              <option>Math</option>
              <option>English</option>
              <option>Science</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Performance</label>
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Needs Improvement</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Teacher Cards */}
      <div className="space-y-4">
        {teacherPerformanceData.map(teacher => (
          <div key={teacher.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{teacher.subject} • {teacher.classes.join(', ')}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
                  {teacher.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500">Avg Score</div>
                  <div className="text-xl font-bold text-blue-900">{teacher.avgScore}%</div>
                  <div className="text-xs text-green-600">{teacher.trend}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Completion</div>
                  <div className="text-xl font-bold text-blue-900">{teacher.completionRate}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${teacher.completionRate}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Students</div>
                  <div className="text-xl font-bold text-blue-900">{teacher.studentsCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Attendance</div>
                  <div className="text-xl font-bold text-blue-900">{teacher.attendance}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Top Student</div>
                  <div className="text-sm font-medium truncate">{teacher.topStudent}</div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Details →</button>
                <button className="text-orange-600 hover:text-orange-800 text-sm">Schedule Review</button>
                <button className="text-green-600 hover:text-green-800 text-sm">Send Feedback</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}