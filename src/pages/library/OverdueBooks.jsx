import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockOverdue = [
  { id: 1, book: 'Chemistry Textbook', student: 'Pech Sopheak', class: 'Grade 10B', checkoutDate: '2025-05-15', dueDate: '2025-05-29', days: 35 },
  { id: 2, book: 'History Book', student: 'Chhay Srey', class: 'Grade 9A', checkoutDate: '2025-05-20', dueDate: '2025-06-03', days: 28 },
  { id: 3, book: 'Geography Atlas', student: 'Sok Mala', class: 'Grade 12A', checkoutDate: '2025-05-10', dueDate: '2025-05-24', days: 45 },
  { id: 4, book: 'English Textbook', student: 'Kim Chan', class: 'Grade 11A', checkoutDate: '2025-06-01', dueDate: '2025-06-15', days: 12 },
  { id: 5, book: 'Biology Textbook', student: 'Srey Mom', class: 'Grade 9A', checkoutDate: '2025-05-28', dueDate: '2025-06-11', days: 16 },
];

export default function OverdueBooks() {
  const navigate = useNavigate();
  const [overdue, setOverdue] = useState(mockOverdue);
  const [filter, setFilter] = useState('all');

  const filtered = overdue.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'critical') return item.days > 30;
    if (filter === 'medium') return item.days >= 15 && item.days <= 30;
    if (filter === 'low') return item.days < 15;
    return true;
  });

  const getDaysBadge = (days) => {
    if (days > 30) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 {days} days</span>;
    if (days >= 15) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 {days} days</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 {days} days</span>;
  };

  const handleSendReminder = (student, book) => {
    toast.success(`📧 Reminder sent to ${student} for "${book}"`);
  };

  const handleSendBulkReminders = () => {
    toast.success(`📧 Bulk reminders sent to all ${overdue.length} students!`);
  };

  const handleMarkReturned = (id) => {
    setOverdue(overdue.filter(item => item.id !== id));
    toast.success('✅ Book marked as returned!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">⚠️ Overdue Books</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Overdue</option>
          <option value="critical">🔴 Critical (&gt;30 days)</option>
          <option value="medium">🟠 Medium (15-30 days)</option>
          <option value="low">🟡 Low (&lt;15 days)</option>
        </select>
        <button onClick={handleSendBulkReminders} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium">
          📧 Send Bulk Reminders
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Book</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Checkout Date</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Days Overdue</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.book}</td>
                <td className="px-4 py-3">{item.student}</td>
                <td className="px-4 py-3">{item.class}</td>
                <td className="px-4 py-3">{item.checkoutDate}</td>
                <td className="px-4 py-3">{item.dueDate}</td>
                <td className="px-4 py-3">{getDaysBadge(item.days)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleSendReminder(item.student, item.book)} className="text-orange-500 hover:underline text-sm mr-2">📧 Remind</button>
                  <button onClick={() => handleMarkReturned(item.id)} className="text-green-600 hover:underline text-sm">✅ Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-8 text-gray-400">No overdue books found</div>}
      </div>
    </div>
  );
}