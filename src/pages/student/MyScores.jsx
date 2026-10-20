import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const subjectScores = [
  { 
    subject: 'Mathematics', 
    total: 88,
    max: 100,
    activities: [
      { name: 'Homework', score: 8, max: 10 },
      { name: 'Group Work', score: 9, max: 10 },
      { name: 'Attendance', score: 10, max: 10 },
      { name: 'Activity', score: 8, max: 10 },
      { name: 'Multiple Choice', score: 18, max: 20 },
      { name: 'Theory/Coding', score: 16, max: 20 },
      { name: 'Practice', score: 19, max: 20 },
    ]
  },
  { 
    subject: 'English', 
    total: 78,
    max: 100,
    activities: [
      { name: 'Homework', score: 7, max: 10 },
      { name: 'Group Work', score: 8, max: 10 },
      { name: 'Attendance', score: 9, max: 10 },
      { name: 'Activity', score: 7, max: 10 },
      { name: 'Multiple Choice', score: 15, max: 20 },
      { name: 'Theory/Coding', score: 14, max: 20 },
      { name: 'Practice', score: 18, max: 20 },
    ]
  },
  { 
    subject: 'Science', 
    total: 82,
    max: 100,
    activities: [
      { name: 'Homework', score: 9, max: 10 },
      { name: 'Group Work', score: 8, max: 10 },
      { name: 'Attendance', score: 10, max: 10 },
      { name: 'Activity', score: 9, max: 10 },
      { name: 'Multiple Choice', score: 16, max: 20 },
      { name: 'Theory/Coding', score: 15, max: 20 },
      { name: 'Practice', score: 15, max: 20 },
    ]
  },
];

export default function MyScores() {
  const navigate = useNavigate();
  const [selectedTerm, setSelectedTerm] = useState('Term 1');

  const getGrade = (score) => {
    if (score >= 90) return { grade: 'A', color: 'bg-green-100 text-green-700' };
    if (score >= 80) return { grade: 'B', color: 'bg-blue-100 text-blue-700' };
    if (score >= 70) return { grade: 'C', color: 'bg-yellow-100 text-yellow-700' };
    if (score >= 60) return { grade: 'D', color: 'bg-orange-100 text-orange-700' };
    return { grade: 'F', color: 'bg-red-100 text-red-700' };
  };

  const getStatusBadge = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 70) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Pass</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⚠️ Below Avg</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📊 My Scores</h1>

      <div className="flex gap-4 mb-6">
        <select className="border rounded-lg px-4 py-2 bg-white" value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
          <option>Term 1</option>
          <option>Term 2</option>
          <option>Term 3</option>
        </select>
      </div>

      {/* Subject Cards */}
      <div className="space-y-6">
        {subjectScores.map((subject, idx) => {
          const gradeInfo = getGrade(subject.total);
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-blue-900">{subject.subject}</h2>
                  <p className="text-sm text-gray-500">{selectedTerm}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-900">{subject.total}%</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${gradeInfo.color}`}>{gradeInfo.grade}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-900 h-3 rounded-full" style={{ width: `${subject.total}%` }}></div>
                </div>
              </div>

              {/* Activities Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left">Activity</th>
                      <th className="px-3 py-2 text-center">My Score</th>
                      <th className="px-3 py-2 text-center">Max Score</th>
                      <th className="px-3 py-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subject.activities.map((act, actIdx) => (
                      <tr key={actIdx} className="border-t">
                        <td className="px-3 py-2 font-medium">{act.name}</td>
                        <td className="px-3 py-2 text-center">{act.score}</td>
                        <td className="px-3 py-2 text-center">{act.max}</td>
                        <td className="px-3 py-2 text-center">{getStatusBadge(act.score, act.max)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}