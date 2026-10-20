import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const homeworkList = [
  { 
    id: 1, 
    subject: 'Mathematics', 
    title: 'Fractions Worksheet', 
    teacher: 'Mr. John', 
    due: '2025-06-23', 
    topic: 'Algebraic Equations',
    description: 'Pages 45-47, Exercises 1-10',
    status: 'pending'
  },
  { 
    id: 2, 
    subject: 'Science', 
    title: 'Lab Report', 
    teacher: 'Mr. David', 
    due: '2025-06-25', 
    topic: 'Photosynthesis',
    description: 'Write a complete lab report with observations',
    status: 'pending'
  },
  { 
    id: 3, 
    subject: 'English', 
    title: 'Essay', 
    teacher: 'Ms. Anna', 
    due: '2025-06-20', 
    topic: 'My Summer Vacation',
    description: '500 words about your summer plans',
    status: 'submitted'
  },
];

export default function Homework() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [homework, setHomework] = useState(homeworkList);

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

  const handleMarkDone = (id) => {
    setHomework(homework.map(h => h.id === id ? { ...h, status: 'submitted' } : h));
    toast.success('✅ Homework marked as done!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📚 Homework</h1>

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
              <p className="text-sm text-gray-600">{hw.description}</p>
              <p className="text-sm text-red-500 mt-2">⚠️ Due: {hw.due}</p>
            </div>
            <div className="mt-4">
              {hw.status === 'pending' && (
                <button onClick={() => handleMarkDone(hw.id)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium">
                  ✅ Mark as Done
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}