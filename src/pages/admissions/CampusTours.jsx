import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockTours = [
  { id: 1, parent: 'Mr. Heng', student: 'Sok Heng', date: '2025-06-22', time: '09:00 AM', level: 'Kids (Grade 5)', status: 'scheduled' },
  { id: 2, parent: 'Ms. Lin', student: 'Mey Lin', date: '2025-06-22', time: '02:00 PM', level: 'Junior (Grade 8)', status: 'scheduled' },
  { id: 3, parent: 'Mr. David', student: 'David', date: '2025-06-23', time: '10:00 AM', level: 'Senior (Grade 10)', status: 'completed' },
  { id: 4, parent: 'Mrs. Sreyneang', student: 'Sok Sreyneang', date: '2025-06-20', time: '11:00 AM', level: 'Kids (Grade 3)', status: 'cancelled' },
];

const levels = ['Baby (0-0.2)', 'Kids (1-6)', 'Junior (7-9)', 'Senior (10-12)'];
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

export default function CampusTours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState(mockTours);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    parentName: '',
    studentName: '',
    phone: '',
    email: '',
    date: '',
    time: '09:00 AM',
    level: 'Kids (1-6)',
    notes: '',
  });

  const handleSchedule = () => {
    if (!form.parentName || !form.studentName || !form.phone || !form.date) {
      alert('Please fill in all required fields.');
      return;
    }
    const newTour = {
      id: Date.now(),
      parent: form.parentName,
      student: form.studentName,
      date: form.date,
      time: form.time,
      level: form.level,
      status: 'scheduled',
    };
    setTours([newTour, ...tours]);
    setShowModal(false);
    setForm({ parentName: '', studentName: '', phone: '', email: '', date: '', time: '09:00 AM', level: 'Kids (1-6)', notes: '' });
    alert('✅ Tour scheduled successfully!');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">📅 Scheduled</span>;
      case 'completed': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Completed</span>;
      case 'cancelled': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">❌ Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🏫 Campus Tours</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-sm">+ Schedule Tour</button>
        <button className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50">📅 Calendar View</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Parent</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{tour.date}</td>
                <td className="px-4 py-3">{tour.time}</td>
                <td className="px-4 py-3 font-medium">{tour.parent}</td>
                <td className="px-4 py-3">{tour.student}</td>
                <td className="px-4 py-3">{tour.level}</td>
                <td className="px-4 py-3">{getStatusBadge(tour.status)}</td>
                <td className="px-4 py-3">
                  {tour.status === 'scheduled' && (
                    <>
                      <button className="text-green-600 hover:underline text-sm mr-2">Complete</button>
                      <button className="text-red-500 hover:underline text-sm mr-2">Cancel</button>
                      <button className="text-blue-900 hover:underline text-sm">Reschedule</button>
                    </>
                  )}
                  {tour.status !== 'scheduled' && <span className="text-gray-400 text-xs">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tours.length === 0 && <div className="text-center py-8 text-gray-400">No tours scheduled</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🏫 Schedule Campus Tour</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={form.parentName} onChange={(e) => setForm({...form, parentName: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={form.studentName} onChange={(e) => setForm({...form, studentName: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input type="date" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={form.time} onChange={(e) => setForm({...form, time: e.target.value})}>
                    {timeSlots.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level Interested</label>
                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={form.level} onChange={(e) => setForm({...form, level: e.target.value})}>
                  {levels.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea rows="2" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={handleSchedule} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Schedule Tour</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}