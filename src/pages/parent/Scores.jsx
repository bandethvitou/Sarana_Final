import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const children = [
  { id: 1, name: 'Sok', grade: 'Grade 10A' },
  { id: 2, name: 'Mey', grade: 'Grade 8B' },
];

const scoresData = {
  'Sok': {
    subjects: [
      { name: 'Mathematics', score: 88, max: 100, grade: 'A', classAvg: 75 },
      { name: 'English', score: 78, max: 100, grade: 'B+', classAvg: 70 },
      { name: 'Science', score: 82, max: 100, grade: 'A-', classAvg: 72 },
      { name: 'Khmer', score: 90, max: 100, grade: 'A', classAvg: 80 },
      { name: 'History', score: 70, max: 100, grade: 'C+', classAvg: 68 },
    ]
  },
  'Mey': {
    subjects: [
      { name: 'Mathematics', score: 85, max: 100, grade: 'B+', classAvg: 75 },
      { name: 'English', score: 92, max: 100, grade: 'A', classAvg: 70 },
      { name: 'Science', score: 79, max: 100, grade: 'B', classAvg: 72 },
    ]
  }
};

export default function Scores() {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(children[0]);

  const childScores = scoresData[selectedChild.name] || { subjects: [] };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const exportPDF = () => {
    toast.success('📄 PDF exported!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📊 Scores</h1>

      {/* Child Selector */}
      <div className="flex gap-3 mb-6">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChild.id === child.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {child.name} – {child.grade}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-3 mb-4">
        <button onClick={exportPDF} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">📄 Export PDF</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-center">Score</th>
              <th className="px-4 py-3 text-center">Max</th>
              <th className="px-4 py-3 text-center">Grade</th>
              <th className="px-4 py-3 text-center">Class Avg</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {childScores.subjects.map((subject, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{subject.name}</td>
                <td className="px-4 py-3 text-center font-bold text-blue-900">{subject.score}</td>
                <td className="px-4 py-3 text-center">{subject.max}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
                    {subject.grade}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">{subject.classAvg}%</td>
                <td className="px-4 py-3 text-center">
                  {subject.score >= subject.classAvg ? (
                    <span className="text-green-600">✅ Above Avg</span>
                  ) : (
                    <span className="text-yellow-600">⚠️ Below Avg</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}