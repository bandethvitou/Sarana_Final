import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mostBorrowed = [
  { book: 'Mathematics Grade 10', count: 45 },
  { book: 'Khmer Literature', count: 38 },
  { book: 'Physics Textbook', count: 32 },
  { book: 'English Grammar', count: 28 },
  { book: 'Biology Textbook', count: 25 },
];

const categoryData = [
  { category: 'Textbook', count: 65 },
  { category: 'Story', count: 20 },
  { category: 'Reference', count: 10 },
  { category: 'Other', count: 5 },
];

const monthlyTrend = [
  { month: 'Jan', count: 45 },
  { month: 'Feb', count: 52 },
  { month: 'Mar', count: 60 },
  { month: 'Apr', count: 48 },
  { month: 'May', count: 55 },
  { month: 'Jun', count: 42 },
];

const topBorrowers = [
  { name: 'Sok Heng', class: 'Grade 10A', count: 12 },
  { name: 'Mey Lin', class: 'Grade 8B', count: 10 },
  { name: 'David', class: 'Grade 12A', count: 8 },
  { name: 'Srey Mom', class: 'Grade 9A', count: 7 },
  { name: 'Kim Chan', class: 'Grade 11A', count: 6 },
];

export default function LibraryStats() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');

  const maxBorrowed = Math.max(...mostBorrowed.map(b => b.count));
  const maxCategory = Math.max(...categoryData.map(c => c.count));
  const maxTrend = Math.max(...monthlyTrend.map(m => m.count));

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📊 Library Stats</h1>

      <div className="flex justify-end mb-6">
        <select className="border rounded-lg px-3 py-2 bg-white" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Borrowed Books */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Most Borrowed Books</h2>
          <div className="space-y-3">
            {mostBorrowed.map((item, idx) => {
              const height = (item.count / maxBorrowed) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm">
                    <span>{item.book}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-900 h-2 rounded-full" style={{ width: `${height}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Borrowing by Category */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 Borrowing by Category</h2>
          <div className="space-y-3">
            {categoryData.map((item, idx) => {
              const height = (item.count / maxCategory) * 100;
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span className="font-medium">{item.count}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className={`${colors[idx]} h-2 rounded-full`} style={{ width: `${height}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Checkout Trends */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📈 Monthly Checkout Trends</h2>
          <div className="flex items-end h-40 gap-3">
            {monthlyTrend.map((data, idx) => {
              const height = (data.count / maxTrend) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-orange-500 rounded-t relative group" style={{ height: `${height}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{data.count}</div>
                  </div>
                  <span className="text-xs mt-2">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Borrowers */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">🏆 Top Borrowers</h2>
          <div className="space-y-3">
            {topBorrowers.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-6">#{idx + 1}</span>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.class}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-blue-900">{item.count} books</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}