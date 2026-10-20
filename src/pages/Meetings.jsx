import { useState } from 'react';

const initialMeetings = [
  { id: 1, title: 'Staff Meeting', dateTime: '2025-06-12 09:00', attendees: ['Mr. John', 'Ms. Anna'], responses: { accepted: 2, declined: 0, pending: 1 } },
  { id: 2, title: 'Parent-Teacher Conference', dateTime: '2025-06-15 13:00', attendees: ['Mr. Rudi'], responses: { accepted: 1, declined: 0, pending: 0 } },
];

export default function Meetings() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [viewMode, setViewMode] = useState('table');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', dateTime: '', duration: '', location: '', attendees: '', agenda: '' });

  const handleCreate = () => {
    const newMeeting = {
      id: Date.now(),
      title: form.title,
      dateTime: form.dateTime,
      attendees: form.attendees.split(',').map(s => s.trim()),
      responses: { accepted: 0, declined: 0, pending: 0 },
    };
    setMeetings([...meetings, newMeeting]);
    setShowModal(false);
    setForm({ title: '', dateTime: '', duration: '', location: '', attendees: '', agenda: '' });
  };

  const cancelMeeting = (id) => {
    setMeetings(meetings.filter(m => m.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Meetings</h1>
        <div className="flex gap-2">
          <button onClick={() => setViewMode('table')} className={`px-4 py-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>Table</button>
          <button onClick={() => setViewMode('calendar')} className={`px-4 py-2 rounded-lg ${viewMode === 'calendar' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>Calendar</button>
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">+ Create Meeting</button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Date / Time</th>
                <th className="px-4 py-3 text-left">Attendees</th>
                <th className="px-4 py-3 text-left">Responses</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map(m => (
                <tr key={m.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{m.title}</td>
                  <td className="px-4 py-3">{m.dateTime}</td>
                  <td className="px-4 py-3">{m.attendees.join(', ')}</td>
                  <td className="px-4 py-3">✅ {m.responses.accepted} ❌ {m.responses.declined} ❓ {m.responses.pending}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => cancelMeeting(m.id)} className="text-red-500 hover:underline text-xs">Cancel</button>
                    <span className="mx-1">|</span>
                    <button className="text-blue-900 hover:underline text-xs">Reschedule</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-500">Calendar view: Select a day to see meetings.</p>
          <div className="grid grid-cols-7 gap-1 mt-4">
            {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
              <div key={day} className="border rounded p-2 h-20 overflow-y-auto text-xs">
                <strong>{day}</strong>
                {meetings.filter(m => new Date(m.dateTime).getDate() === day).map(m => (
                  <div key={m.id} className="bg-blue-100 text-blue-900 rounded px-1 mt-1">{m.title}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create Meeting</h2>
            <div className="space-y-3">
              <input placeholder="Title" className="w-full border rounded-lg px-4 py-2" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <input type="datetime-local" className="w-full border rounded-lg px-4 py-2" value={form.dateTime} onChange={e => setForm({ ...form, dateTime: e.target.value })} />
              <input placeholder="Duration (e.g., 1 hour)" className="w-full border rounded-lg px-4 py-2" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
              <input placeholder="Location" className="w-full border rounded-lg px-4 py-2" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              <input placeholder="Attendees (comma-separated)" className="w-full border rounded-lg px-4 py-2" value={form.attendees} onChange={e => setForm({ ...form, attendees: e.target.value })} />
              <textarea placeholder="Agenda" className="w-full border rounded-lg px-4 py-2" value={form.agenda} onChange={e => setForm({ ...form, agenda: e.target.value })} />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}