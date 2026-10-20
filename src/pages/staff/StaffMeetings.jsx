import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialMeetings = [
  { id: 1, title: 'Staff Meeting', date: '2025-06-16', time: '09:00 AM', location: 'Conference Room', description: 'Monthly staff meeting to discuss school updates' },
  { id: 2, title: 'Safety Training', date: '2025-06-20', time: '02:00 PM', location: 'Hall A', description: 'Mandatory safety training for all staff' },
  { id: 3, title: 'Sports Day Planning', date: '2025-06-25', time: '10:00 AM', location: 'Sports Office', description: 'Planning meeting for annual sports day' },
];

export default function StaffMeetings() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState(initialMeetings);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  const filteredMeetings = meetings.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.title || !form.date || !form.time) return;
    const newMeeting = { id: Date.now(), ...form };
    setMeetings([newMeeting, ...meetings]);
    setShowModal(false);
    setForm({ title: '', date: '', time: '', location: '', description: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      setMeetings(meetings.filter(m => m.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📅 Meetings</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          + Add Meeting
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search meetings..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">No meetings found</div>
        ) : (
          filteredMeetings.map((meeting) => (
            <div key={meeting.id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900">{meeting.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 {meeting.date}</span>
                    <span>⏰ {meeting.time}</span>
                    <span>📍 {meeting.location}</span>
                  </div>
                  {meeting.description && (
                    <p className="text-sm text-gray-600 mt-2">{meeting.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedMeeting(meeting)}
                    className="px-3 py-1 text-blue-900 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleDelete(meeting.id)}
                    className="px-3 py-1 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Meeting Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create Meeting</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Meeting Title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
              />
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.date}
                onChange={(e) => setForm({...form, date: e.target.value})}
              />
              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.time}
                onChange={(e) => setForm({...form, time: e.target.value})}
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.location}
                onChange={(e) => setForm({...form, location: e.target.value})}
              />
              <textarea
                placeholder="Description (optional)"
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
              />
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
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Meeting Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Meeting Details</h2>
            <div className="space-y-3">
              <p><strong>Title:</strong> {selectedMeeting.title}</p>
              <p><strong>Date:</strong> {selectedMeeting.date}</p>
              <p><strong>Time:</strong> {selectedMeeting.time}</p>
              <p><strong>Location:</strong> {selectedMeeting.location}</p>
              {selectedMeeting.description && (
                <p><strong>Description:</strong> {selectedMeeting.description}</p>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setSelectedMeeting(null)}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}