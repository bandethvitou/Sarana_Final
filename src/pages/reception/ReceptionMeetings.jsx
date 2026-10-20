import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockMeetings = [
  { id: 1, time: '10:00 AM', title: 'Staff Meeting', location: 'Room 201', host: 'Mr. B. Soth', attendees: 'All Staff', visitors: [] },
  { id: 2, time: '11:30 AM', title: 'Admissions Review', location: 'Room 105', host: 'Mr. David', attendees: 'Admissions Team', visitors: ['Mr. Sok Heng'] },
  { id: 3, time: '2:00 PM', title: 'Finance Meeting', location: 'Room 301', host: 'Mr. Mike', attendees: 'Finance Team', visitors: [] },
  { id: 4, time: '3:30 PM', title: 'Parent-Teacher Meeting', location: 'Room 101', host: 'Mrs. Lisa', attendees: 'Teachers, Parents', visitors: ['Mrs. Sok', 'Mr. Kim'] },
];

export default function ReceptionMeetings() {
  const navigate = useNavigate();
  const [meetings] = useState(mockMeetings);
  const [search, setSearch] = useState('');

  const filtered = meetings.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.host.toLowerCase().includes(search.toLowerCase()) ||
    m.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleNotifyHost = (host) => {
    toast.success(`📢 ${host} notified of visitor arrival!`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📅 Today's Meetings</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search meetings..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-wrap justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">{meeting.time}</span>
                  <h3 className="text-lg font-semibold text-blue-900">{meeting.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  <p>📍 <span className="font-medium">{meeting.location}</span></p>
                  <p>👤 <span className="font-medium">{meeting.host}</span></p>
                  <p>👥 <span className="font-medium">{meeting.attendees}</span></p>
                </div>
                {meeting.visitors.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-500">🚶 Expected Visitors:</span>
                    {meeting.visitors.map((v, i) => (
                      <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium">{v}</span>
                    ))}
                    <button
                      onClick={() => handleNotifyHost(meeting.host)}
                      className="ml-2 px-3 py-1 bg-orange-500 text-white rounded-lg text-xs hover:bg-orange-600 transition-colors"
                    >
                      📢 Notify Host
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                  📍 Map
                </button>
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                  📋 Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-white rounded-xl shadow-sm">
          <div className="text-4xl mb-2">📅</div>
          <p>No meetings scheduled for today</p>
        </div>
      )}
    </div>
  );
}