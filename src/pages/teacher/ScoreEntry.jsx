import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const scoreStructure = [
  { section: 'Assignment', activity: 'Homework', maxScore: 10, weight: 10 },
  { section: 'Assignment', activity: 'Group Work', maxScore: 10, weight: 10 },
  { section: 'Class Participation', activity: 'Attendance', maxScore: 10, weight: 10 },
  { section: 'Class Participation', activity: 'Activity', maxScore: 10, weight: 10 },
  { section: 'Test Section', activity: 'Multiple Choice', maxScore: 20, weight: 20 },
  { section: 'Test Section', activity: 'Theory/Coding', maxScore: 20, weight: 20 },
  { section: 'Test Section', activity: 'Practice', maxScore: 20, weight: 20 },
];

const students = [
  { id: 1, name: 'Sok Heng', scores: [8, 7, 9, 8, 15, 16, 14] },
  { id: 2, name: 'Srey Mom', scores: [9, 8, 10, 9, 18, 17, 15] },
  { id: 3, name: 'David', scores: [5, 4, 6, 5, 10, 12, 8] },
  { id: 4, name: 'Kim Chan', scores: [7, 6, 8, 7, 14, 13, 11] },
];

export default function ScoreEntry() {
  const navigate = useNavigate();
  const [scores, setScores] = useState(students);

  const getScoreColor = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 70) return 'bg-green-100 text-green-700';
    if (percentage >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const calculateTotal = (student) => {
    return student.scores.reduce((sum, s) => sum + s, 0);
  };

  const handleScoreChange = (studentId, activityIndex, value) => {
    const numValue = parseFloat(value) || 0;
    const maxScore = scoreStructure[activityIndex].maxScore;
    const validValue = Math.min(numValue, maxScore);
    setScores(scores.map(s =>
      s.id === studentId ? {
        ...s,
        scores: s.scores.map((score, idx) => idx === activityIndex ? validValue : score)
      } : s
    ));
  };

  const handleSave = () => {
    toast.success('✅ Scores saved successfully!');
  };

  const handleSubmit = () => {
    toast.success('📤 Scores submitted to Manager!');
  };

  const exportToExcel = () => {
    const data = scores.map(s => ({
      Student: s.name,
      ...scoreStructure.reduce((acc, act, idx) => ({ ...acc, [act.activity]: s.scores[idx] }), {}),
      Total: calculateTotal(s),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Scores');
    XLSX.writeFile(wb, 'Scores.xlsx');
    toast.success('📊 Excel exported!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📊 Score Entry</h1>

      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select className="border rounded-lg px-4 py-2 bg-white">
              <option>Grade 5B</option>
              <option>Grade 6A</option>
              <option>Grade 5A</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select className="border rounded-lg px-4 py-2 bg-white">
              <option>Math</option>
              <option>Science</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
            <select className="border rounded-lg px-4 py-2 bg-white">
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Term 3</option>
            </select>
          </div>
          <div className="flex gap-2 ml-auto">
            <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">📤 Export Excel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">📤 Submit</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-3 py-3 text-left sticky left-0 bg-gray-50">Student</th>
              {scoreStructure.map((act, idx) => (
                <th key={idx} className="px-3 py-3 text-center min-w-[80px]">
                  <div className="text-xs font-medium text-gray-500">{act.section}</div>
                  <div className="text-sm font-bold text-blue-900">{act.activity}</div>
                  <div className="text-xs text-gray-400">/{act.maxScore}</div>
                </th>
              ))}
              <th className="px-3 py-3 text-center font-bold text-blue-900">Total</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((student) => {
              const total = calculateTotal(student);
              return (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-3 font-medium sticky left-0 bg-white">{student.name}</td>
                  {student.scores.map((score, idx) => (
                    <td key={idx} className="px-3 py-2 text-center">
                      <input
                        type="number"
                        value={score}
                        onChange={(e) => handleScoreChange(student.id, idx, e.target.value)}
                        className={`w-16 text-center border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-900 outline-none ${getScoreColor(score, scoreStructure[idx].maxScore)}`}
                        min="0"
                        max={scoreStructure[idx].maxScore}
                      />
                    </td>
                  ))}
                  <td className="px-3 py-2 text-center font-bold text-blue-900">{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button onClick={handleSave} className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">💾 Save Scores</button>
      </div>
    </div>
  );
}