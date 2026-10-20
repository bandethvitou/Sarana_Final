// src/pages/topmanager/Meetings.jsx
import { useState } from 'react';

const initialMeetings = [
  { id: 1, title: 'Academic Review', date: '2025-06-20', time: '10:00 AM', attendees: 'Mr. John, Ms. Anna', status: 'upcoming' },
  { id: 2, title: 'Budget Planning', date: '2025-06-22', time: '2:00 PM', attendees: 'Ms. Anna, Mr. Rudi', status: 'upcoming' },
  { id: 3, title: 'Staff Meeting', date: '2025-06-15', time: '9:00 AM', attendees: 'All Managers', status: 'past' },
];

export default function Meetings() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', time: '', attendees: '' });

  const handleCreate = () => {
    if (!form.title || !form.date || !form.time) return;
    const newMeeting = { id: Date.now(), ...form, status: 'upcoming' };
    setMeetings([newMeeting, ...meetings]);
    setShowModal(false);
    setForm({ title: '', date: '', time: '', attendees: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Meetings</h1>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">+ Create Meeting</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📅 Upcoming Meetings</h2>
          {meetings.filter(m => m.status === 'upcoming').length === 0 ? <p className="text-gray-400 text-sm">No upcoming meetings</p> :
            meetings.filter(m => m.status === 'upcoming').map(m => (
              <div key={m.id} className="border-b pb-3 mb-3"><h3 className="font-medium text-blue-900">{m.title}</h3><p className="text-sm text-gray-500">{m.date} at {m.time}</p><p className="text-xs text-gray-400">Attendees: {m.attendees}</p></div>
            ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📆 Past Meetings</h2>
          {meetings.filter(m => m.status === 'past').length === 0 ? <p className="text-gray-400 text-sm">No past meetings</p> :
            meetings.filter(m => m.status === 'past').map(m => (
              <div key={m.id} className="border-b pb-3 mb-3"><h3 className="font-medium text-gray-700">{m.title}</h3><p className="text-sm text-gray-500">{m.date} at {m.time}</p></div>
            ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create Meeting</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Meeting Title" className="w-full border rounded-lg px-4 py-2" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <input type="date" className="w-full border rounded-lg px-4 py-2" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
              <input type="time" className="w-full border rounded-lg px-4 py-2" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
              <input type="text" placeholder="Attendees (comma separated)" className="w-full border rounded-lg px-4 py-2" value={form.attendees} onChange={e => setForm({...form, attendees: e.target.value})} />
            </div>
            <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleCreate} className="px-4 py-2 bg-orange-500 text-white rounded-lg">Create</button></div>
          </div>
        </div>
      )}
    </div>
  );
}