// src/pages/topmanager/ScoreAnalytics.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function ScoreAnalytics() {
  const navigate = useNavigate();

  const analyticsData = {
    overallAverage: 78.5,
    totalStudents: 1250,
    completionRate: 85,
    
    classPerformance: [
      { class: 'Grade 4A', average: 82, teacher: 'Mrs. Linda', students: 18, topScore: 96 },
      { class: 'Grade 5A', average: 85, teacher: 'Mr. John', students: 22, topScore: 98 },
      { class: 'Grade 6A', average: 79, teacher: 'Mr. John', students: 20, topScore: 94 },
    ],
    
    scoreDistribution: [
      { range: '90-100', count: 45, percentage: 18 },
      { range: '80-89', count: 78, percentage: 32 },
      { range: '70-79', count: 62, percentage: 25 },
      { range: '60-69', count: 38, percentage: 16 },
      { range: 'Below 60', count: 22, percentage: 9 },
    ],
  };

  const exportReport = () => {
    const ws = XLSX.utils.json_to_sheet(analyticsData.classPerformance);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Analytics');
    XLSX.writeFile(wb, 'score_analytics.xlsx');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📊 Score Analytics</h1>
        <div className="flex gap-3">
          <button onClick={exportReport} className="px-4 py-2 bg-green-600 text-white rounded-lg">Export Report</button>
          <button onClick={() => navigate('/top-manager/score-management')} className="px-4 py-2 border rounded-lg">← Back</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-5 text-white">
          <div className="text-3xl mb-2">📈</div>
          <div className="text-2xl font-bold">{analyticsData.overallAverage}%</div>
          <div className="text-sm opacity-90">Overall Average Score</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-900">
          <div className="text-3xl mb-2">👨‍🎓</div>
          <div className="text-2xl font-bold">{analyticsData.totalStudents}</div>
          <div className="text-sm text-gray-500">Total Students</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-900">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold">{analyticsData.completionRate}%</div>
          <div className="text-sm text-gray-500">Completion Rate</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-blue-900 h-1.5 rounded-full" style={{ width: `${analyticsData.completionRate}%` }}></div></div>
        </div>
      </div>

      {/* Class Performance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="px-5 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-blue-900">🏫 Class Performance</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr><th className="px-4 py-3">Class</th><th>Teacher</th><th>Students</th><th>Average</th><th>Top Score</th></tr>
          </thead>
          <tbody>
            {analyticsData.classPerformance.map((c, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.class}</td><td>{c.teacher}</td><td>{c.students}</td>
                <td className={`font-bold ${c.average >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>{c.average}%</td><td>{c.topScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Score Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Score Distribution</h2>
        {analyticsData.scoreDistribution.map((item, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex justify-between text-sm mb-1"><span>{item.range}</span><span>{item.count} students ({item.percentage}%)</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-900 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div></div>
          </div>
        ))}
      </div>
    </div>
  );
}