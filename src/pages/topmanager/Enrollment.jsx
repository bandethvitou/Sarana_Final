import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data
const enrollmentData = {
  levels: [
    { name: 'Baby', current: 85, new: 8, dropouts: 2, net: 6, completionRate: 100 },
    { name: 'Kids', current: 520, new: 45, dropouts: 18, net: 27, completionRate: 80 },
    { name: 'Junior', current: 310, new: 28, dropouts: 12, net: 16, completionRate: 80 },
    { name: 'Senior', current: 335, new: 24, dropouts: 8, net: 16, completionRate: 75 },
  ],
  monthlyTrend: [
    { month: 'Jan', new: 12, dropouts: 3 },
    { month: 'Feb', new: 15, dropouts: 4 },
    { month: 'Mar', new: 20, dropouts: 5 },
    { month: 'Apr', new: 18, dropouts: 6 },
    { month: 'May', new: 25, dropouts: 8 },
    { month: 'Jun', new: 35, dropouts: 10 },
  ],
  classDetails: [
    { class: 'Baby 0', students: 28, new: 2, dropouts: 0, net: 2 },
    { class: 'Kids 1A', students: 32, new: 3, dropouts: 1, net: 2 },
    { class: 'Kids 2A', students: 30, new: 2, dropouts: 2, net: 0 },
    { class: 'Kids 3A', students: 28, new: 4, dropouts: 1, net: 3 },
    { class: 'Kids 4A', students: 25, new: 1, dropouts: 0, net: 1 },
    { class: 'Kids 5A', students: 27, new: 3, dropouts: 2, net: 1 },
    { class: 'Kids 6A', students: 24, new: 2, dropouts: 1, net: 1 },
    { class: 'Junior 7A', students: 22, new: 3, dropouts: 1, net: 2 },
    { class: 'Junior 8A', students: 20, new: 2, dropouts: 1, net: 1 },
    { class: 'Junior 9A', students: 18, new: 1, dropouts: 0, net: 1 },
    { class: 'Senior 10A', students: 25, new: 5, dropouts: 2, net: 3 },
    { class: 'Senior 11A', students: 23, new: 3, dropouts: 1, net: 2 },
    { class: 'Senior 12A', students: 22, new: 2, dropouts: 1, net: 1 },
  ],
};

export default function Enrollment() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showAllClasses, setShowAllClasses] = useState(false);

  const levels = ['All', ...new Set(enrollmentData.classDetails.map(c => c.class.split(' ')[0]))];

  const filteredClasses = enrollmentData.classDetails.filter(c => {
    if (selectedLevel === 'All') return true;
    return c.class.startsWith(selectedLevel);
  });

  const displayedClasses = showAllClasses ? filteredClasses : filteredClasses.slice(0, 6);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📈 Enrollment Management</h1>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-900">
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="text-3xl font-bold text-blue-900">1,250</div>
          <div className="text-xs text-green-600 mt-1">↑ 35 new this month</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-500">
          <div className="text-sm text-gray-500">New Students (MTD)</div>
          <div className="text-3xl font-bold text-green-600">+105</div>
          <div className="text-xs text-gray-400 mt-1">↑ 12% vs last month</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-red-500">
          <div className="text-sm text-gray-500">Dropouts (MTD)</div>
          <div className="text-3xl font-bold text-red-600">-40</div>
          <div className="text-xs text-gray-400 mt-1">↓ 8% improvement</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-orange-500">
          <div className="text-sm text-gray-500">Net Growth</div>
          <div className="text-3xl font-bold text-orange-600">+65</div>
          <div className="text-xs text-gray-400 mt-1">Target: +50</div>
        </div>
      </div>

      {/* Enrollment by Level */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Enrollment by Level</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Level</th>
                <th className="px-4 py-3 text-right">Current</th>
                <th className="px-4 py-3 text-right">New</th>
                <th className="px-4 py-3 text-right">Dropouts</th>
                <th className="px-4 py-3 text-right">Net</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {enrollmentData.levels.map((level, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{level.name}</td>
                  <td className="px-4 py-3 text-right">{level.current}</td>
                  <td className="px-4 py-3 text-right text-green-600">+{level.new}</td>
                  <td className="px-4 py-3 text-right text-red-600">-{level.dropouts}</td>
                  <td className="px-4 py-3 text-right font-medium">+{level.net}</td>
                  <td className="px-4 py-3">
                    {level.dropouts > 15 ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">⚠️ Alert</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✓ Stable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Trend Chart (CSS-based) */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📈 Monthly Trend</h2>
        <div className="flex items-end h-48 gap-4">
          {enrollmentData.monthlyTrend.map((item, idx) => {
            const maxVal = Math.max(...enrollmentData.monthlyTrend.map(m => Math.max(m.new, m.dropouts)));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="flex gap-1 w-full justify-center items-end h-40">
                  <div 
                    className="w-6 bg-green-500 rounded-t"
                    style={{ height: `${(item.new / maxVal) * 100}%` }}
                  ></div>
                  <div 
                    className="w-6 bg-red-500 rounded-t"
                    style={{ height: `${(item.dropouts / maxVal) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs mt-2 font-medium">{item.month}</span>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-green-600">+{item.new}</span>
                  <span className="text-xs text-red-600">-{item.dropouts}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded"></span> New</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded"></span> Dropouts</span>
        </div>
      </div>

      {/* Class Details */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">📋 Class Details</h2>
          <div className="flex gap-2">
            <select 
              className="border rounded-lg px-3 py-1 text-sm"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => <option key={level}>{level}</option>)}
            </select>
            <button 
              className="px-3 py-1 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800"
            >
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Class</th>
                <th className="px-4 py-2 text-right">Students</th>
                <th className="px-4 py-2 text-right">New</th>
                <th className="px-4 py-2 text-right">Dropouts</th>
                <th className="px-4 py-2 text-right">Net</th>
              </tr>
            </thead>
            <tbody>
              {displayedClasses.map((cls, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{cls.class}</td>
                  <td className="px-4 py-2 text-right">{cls.students}</td>
                  <td className="px-4 py-2 text-right text-green-600">+{cls.new}</td>
                  <td className="px-4 py-2 text-right text-red-600">-{cls.dropouts}</td>
                  <td className="px-4 py-2 text-right font-medium">+{cls.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredClasses.length > 6 && (
          <button 
            onClick={() => setShowAllClasses(!showAllClasses)}
            className="mt-4 text-sm text-blue-900 hover:underline"
          >
            {showAllClasses ? 'Show less' : `Show all (${filteredClasses.length} classes)`}
          </button>
        )}
      </div>
    </div>
  );
}