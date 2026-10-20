import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const children = [
  { id: 1, name: 'Sok' },
  { id: 2, name: 'Mey' },
];

const homeworkData = {
  'Sok': [
    { id: 1, subject: 'Mathematics', title: 'Fractions Worksheet', teacher: 'Mr. John', due: '2025-06-23', status: 'pending', topic: 'Algebraic Equations' },
    { id: 2, subject: 'Science', title: 'Lab Report', teacher: 'Mr. David', due: '2025-06-25', status: 'pending', topic: 'Photosynthesis' },
    { id: 3, subject: 'English', title: 'Essay', teacher: 'Ms. Anna', due: '2025-06-20', status: 'submitted', topic: 'Summer Vacation' },
  ],
  'Mey': [
    { id: 4, subject: 'Mathematics', title: 'Geometry Quiz', teacher: 'Ms. Srey', due: '2025-06-22', status: 'pending', topic: 'Shapes' },
    { id: 5, subject: 'English', title: 'Reading Report', teacher: 'Ms. Anna', due: '2025-06-24', status: 'submitted', topic: 'Book Review' },
  ]
};

export default function Homework() {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(children[0]);
  const [filter, setFilter] = useState('all');

  const homework = homeworkData[selectedChild.name] || [];

  const filtered = homework.filter(h => {
    if (filter === 'all') return true;
    return h.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⚠️ Pending</span>;
      case 'submitted': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">📤 Submitted</span>;
      case 'overdue': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 Overdue</span>;
      default: return null;
    }
  };

  const handleMarkReviewed = (id) => {
    toast.success('✅ Marked as reviewed by parent!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📚 Homework</h1>

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
            {child.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {['all', 'pending', 'submitted', 'overdue'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((hw) => (
          <div key={hw.id} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-900">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-blue-900">{hw.subject}</h3>
                <p className="text-lg font-medium">{hw.title}</p>
                <p className="text-sm text-gray-500">Teacher: {hw.teacher}</p>
              </div>
              {getStatusBadge(hw.status)}
            </div>
            <div className="mt-3">
              <p className="text-sm"><span className="font-medium">Topic:</span> {hw.topic}</p>
              <p className="text-sm text-red-500 mt-2">⚠️ Due: {hw.due}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800">📖 View</button>
              {hw.status === 'pending' && (
                <button onClick={() => handleMarkReviewed(hw.id)} className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
                  ✅ Mark as Reviewed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}