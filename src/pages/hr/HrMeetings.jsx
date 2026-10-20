import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialMeetings = [
  { id: 1, title: 'HR Staff Meeting', date: '2025-06-22', time: '10:00 AM', location: 'HR Office', attendees: ['Ms. Siti', 'Mr. Rudi', 'Ms. Anna'], description: 'Weekly HR team sync to discuss onboarding and leave policies' },
  { id: 2, title: 'Department Head Meeting', date: '2025-06-24', time: '02:00 PM', location: 'Conference Room', attendees: ['Ms. Siti', 'Mr. John', 'Mr. Rudi'], description: 'Monthly department heads meeting to discuss staffing needs' },
  { id: 3, title: 'Hiring Committee', date: '2025-06-26', time: '09:30 AM', location: 'Director\'s Office', attendees: ['Ms. Siti', 'Mr. B. Soth'], description: 'Review new hiring requests for Q3' },
];

export default function HrMeetings() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState(initialMeetings);
  const [viewMode, setViewMode] = useState('table');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    attendees: '',
    description: '',
  });

  const handleCreate = () => {
    if (!form.title || !form.date || !form.time) return;
    const newMeeting = {
      id: Date.now(),
      title: form.title,
      date: form.date,
      time: form.time,
      location: form.location || 'Conference Room',
      attendees: form.attendees ? form.attendees.split(',').map(s => s.trim()) : [],
      description: form.description || '',
    };
    setMeetings([...meetings, newMeeting]);
    setShowModal(false);
    setForm({ title: '', date: '', time: '', location: '', attendees: '', description: '' });
  };

  const handleCancel = (id) => {
    if (window.confirm('Cancel this meeting?')) {
      setMeetings(meetings.filter(m => m.id !== id));
    }
  };

  const getMonthDays = () => {
    const days = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentYear, currentMonth, i));
    return days;
  };

  const getDayMeetings = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return meetings.filter(m => m.date === dateStr);
  };

  const monthDays = getMonthDays();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📅 HR Meetings</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'calendar' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
          >
            Calendar
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            + Create Meeting
          </button>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Date / Time</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Attendees</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr key={meeting.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{meeting.title}</td>
                  <td className="px-4 py-3">
                    {meeting.date} <br />
                    <span className="text-xs text-gray-500">{meeting.time}</span>
                  </td>
                  <td className="px-4 py-3">{meeting.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {meeting.attendees.map((a, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMeeting(meeting)}
                        className="text-blue-900 hover:underline text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleCancel(meeting.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {meetings.length === 0 && (
            <div className="text-center py-8 text-gray-400">No meetings scheduled</div>
          )}
        </div>
      )}

      {/* CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-blue-900">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
              <div key={idx} className="text-center text-sm font-semibold text-gray-500 py-2">{day}</div>
            ))}
            {monthDays.map((date, idx) => {
              if (!date) return <div key={`empty-${idx}`} className="border rounded-lg p-2 min-h-[80px] bg-gray-50"></div>;
              const dayMeetings = getDayMeetings(date);
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div
                  key={idx}
                  className={`border rounded-lg p-2 min-h-[80px] hover:bg-gray-50 transition-colors cursor-pointer ${isToday ? 'ring-2 ring-orange-500' : ''}`}
                  onClick={() => {
                    const dateStr = date.toISOString().split('T')[0];
                    const meetingsOnDay = meetings.filter(m => m.date === dateStr);
                    if (meetingsOnDay.length > 0) setSelectedMeeting(meetingsOnDay[0]);
                  }}
                >
                  <div className={`text-sm font-medium ${isToday ? 'text-orange-500' : 'text-gray-700'}`}>
                    {date.getDate()}
                  </div>
                  {dayMeetings.map((m) => (
                    <div key={m.id} className="text-xs bg-blue-100 text-blue-700 rounded px-1 mt-1 truncate">
                      {m.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CREATE MEETING MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create HR Meeting</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                <input
                  type="text"
                  placeholder="e.g., HR Staff Meeting"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    value={form.time}
                    onChange={(e) => setForm({...form, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Conference Room"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.location}
                  onChange={(e) => setForm({...form, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                <input
                  type="text"
                  placeholder="Comma-separated names"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.attendees}
                  onChange={(e) => setForm({...form, attendees: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agenda / Description</label>
                <textarea
                  rows="3"
                  placeholder="Meeting agenda..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Create Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MEETING MODAL */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-blue-900">{selectedMeeting.title}</h2>
              <button
                onClick={() => setSelectedMeeting(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p><strong>📅 Date:</strong> {selectedMeeting.date}</p>
              <p><strong>⏰ Time:</strong> {selectedMeeting.time}</p>
              <p><strong>📍 Location:</strong> {selectedMeeting.location}</p>
              <div>
                <strong>👥 Attendees:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedMeeting.attendees.map((a, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              {selectedMeeting.description && (
                <p><strong>📝 Description:</strong> {selectedMeeting.description}</p>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedMeeting(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => { handleCancel(selectedMeeting.id); setSelectedMeeting(null); }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}