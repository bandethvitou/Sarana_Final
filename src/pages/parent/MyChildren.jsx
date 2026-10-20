import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const childrenList = [
  { 
    id: 1, 
    name: 'Sok', 
    grade: 'Grade 10A', 
    teacher: 'Mr. John', 
    photo: '👦',
    scores: { math: 88, english: 78, science: 82 },
    attendance: 90,
  },
  { 
    id: 2, 
    name: 'Mey', 
    grade: 'Grade 8B', 
    teacher: 'Ms. Anna', 
    photo: '👧',
    scores: { math: 85, english: 92, science: 79 },
    attendance: 95,
  },
];

export default function MyChildren() {
  const navigate = useNavigate();
  const [activeChild, setActiveChild] = useState(childrenList[0]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">👶 My Children</h1>

      {/* Child Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {childrenList.map((child) => (
          <div
            key={child.id}
            onClick={() => setActiveChild(child)}
            className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all ${
              activeChild.id === child.id ? 'ring-2 ring-orange-500' : 'hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">{child.photo}</div>
              <div>
                <h3 className="text-xl font-bold text-blue-900">{child.name}</h3>
                <p className="text-sm text-gray-500">{child.grade}</p>
                <p className="text-sm text-gray-500">Teacher: {child.teacher}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Child Details */}
      {activeChild && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">{activeChild.name} – Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Math</p>
              <p className="text-2xl font-bold text-blue-900">{activeChild.scores.math}%</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">English</p>
              <p className="text-2xl font-bold text-blue-900">{activeChild.scores.english}%</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Science</p>
              <p className="text-2xl font-bold text-blue-900">{activeChild.scores.science}%</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Attendance</p>
              <p className="text-2xl font-bold text-blue-900">{activeChild.attendance}%</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={() => navigate('/parent/scores')} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">📊 View Scores</button>
            <button onClick={() => navigate('/parent/attendance')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">✅ View Attendance</button>
            <button onClick={() => navigate('/parent/messages')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">💬 Message Teacher</button>
          </div>
        </div>
      )}
    </div>
  );
}