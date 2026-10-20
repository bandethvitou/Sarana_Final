import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data
const mockLevels = [
  { name: 'Baby', avgScore: 85, highest: 98, lowest: 62, passRate: 92 },
  { name: 'Kids', avgScore: 78, highest: 95, lowest: 45, passRate: 85 },
  { name: 'Junior', avgScore: 72, highest: 92, lowest: 38, passRate: 78 },
  { name: 'Senior', avgScore: 76, highest: 94, lowest: 42, passRate: 80 },
];

const mockSubjects = [
  { name: 'Mathematics', avgScore: 80, topTeacher: 'Mr. John', students: 45 },
  { name: 'English', avgScore: 75, topTeacher: 'Mrs. Linda', students: 42 },
  { name: 'Science', avgScore: 78, topTeacher: 'Mr. Rudi', students: 38 },
  { name: 'Khmer', avgScore: 82, topTeacher: 'Ms. Siti', students: 40 },
  { name: 'Physics', avgScore: 73, topTeacher: 'Mr. John', students: 30 },
  { name: 'Chemistry', avgScore: 70, topTeacher: 'Mr. Rudi', students: 28 },
];

const mockTeachers = [
  { name: 'Mr. John', subject: 'Mathematics', avgScore: 85, class: 'Grade 5A', trend: 'up' },
  { name: 'Mrs. Linda', subject: 'English', avgScore: 78, class: 'Grade 4A', trend: 'down' },
  { name: 'Mr. Rudi', subject: 'Science', avgScore: 82, class: 'Grade 6A', trend: 'up' },
  { name: 'Ms. Siti', subject: 'Khmer', avgScore: 88, class: 'Grade 3A', trend: 'up' },
  { name: 'Mr. John', subject: 'Physics', avgScore: 72, class: 'Grade 9A', trend: 'down' },
  { name: 'Mrs. Linda', subject: 'Chemistry', avgScore: 68, class: 'Grade 10A', trend: 'down' },
];

const atRiskClasses = [
  { class: 'Grade 7B', subject: 'Mathematics', passRate: 62, teacher: 'Mr. John' },
  { class: 'Grade 8A', subject: 'English', passRate: 58, teacher: 'Mrs. Linda' },
  { class: 'Grade 10B', subject: 'Physics', passRate: 55, teacher: 'Mr. John' },
];

export default function Academic() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const levels = ['All', ...mockLevels.map(l => l.name)];
  const subjects = ['All', ...mockSubjects.map(s => s.name)];

  const filteredTeachers = mockTeachers.filter(t => {
    if (selectedLevel !== 'All' && !t.class.includes(selectedLevel)) return false;
    if (selectedSubject !== 'All' && t.subject !== selectedSubject) return false;
    return true;
  });

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? '📈' : '📉';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📚 Academic Overview</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Level</label>
          <select 
            className="border rounded-lg px-3 py-2 bg-white"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {levels.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Subject</label>
          <select 
            className="border rounded-lg px-3 py-2 bg-white"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Term</label>
          <select className="border rounded-lg px-3 py-2 bg-white">
            <option>Quarter 2</option>
            <option>Quarter 1</option>
            <option>Quarter 3</option>
            <option>Quarter 4</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
          Apply Filters
        </button>
      </div>

      {/* Level Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {mockLevels.map((level, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-900">
            <div className="text-sm text-gray-500">{level.name} Level</div>
            <div className="text-2xl font-bold text-blue-900 mt-1">{level.avgScore}%</div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-500">
              <div>Highest: <span className="text-green-600 font-medium">{level.highest}%</span></div>
              <div>Lowest: <span className="text-red-600 font-medium">{level.lowest}%</span></div>
              <div>Pass Rate: <span className="text-blue-900 font-medium">{level.passRate}%</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Subject Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Subject Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-right">Avg Score</th>
                <th className="px-4 py-3 text-left">Top Teacher</th>
                <th className="px-4 py-3 text-right">Students</th>
              </tr>
            </thead>
            <tbody>
              {mockSubjects.map((subj, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{subj.name}</td>
                  <td className={`px-4 py-3 text-right font-bold ${getScoreColor(subj.avgScore)}`}>{subj.avgScore}%</td>
                  <td className="px-4 py-3">{subj.topTeacher}</td>
                  <td className="px-4 py-3 text-right">{subj.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Performance */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">🏆 Teacher Performance</h2>
          <button 
            className="text-sm text-orange-500 hover:underline"
          >
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Teacher</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Class</th>
                <th className="px-4 py-2 text-right">Avg Score</th>
                <th className="px-4 py-2 text-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{teacher.name}</td>
                  <td className="px-4 py-2">{teacher.subject}</td>
                  <td className="px-4 py-2">{teacher.class}</td>
                  <td className={`px-4 py-2 text-right font-bold ${getScoreColor(teacher.avgScore)}`}>{teacher.avgScore}%</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`${getTrendColor(teacher.trend)}`}>
                      {getTrendIcon(teacher.trend)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* At-Risk Classes */}
      <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-600">⚠️ At-Risk Classes</h2>
          <button className="text-sm text-red-500 hover:underline">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Class</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Teacher</th>
                <th className="px-4 py-2 text-right">Pass Rate</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {atRiskClasses.map((cls, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{cls.class}</td>
                  <td className="px-4 py-2">{cls.subject}</td>
                  <td className="px-4 py-2">{cls.teacher}</td>
                  <td className="px-4 py-2 text-right font-bold text-red-600">{cls.passRate}%</td>
                  <td className="px-4 py-2 text-center">
                    <button className="px-3 py-1 bg-orange-500 text-white rounded-lg text-xs hover:bg-orange-600">
                      Investigate
                    </button>
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