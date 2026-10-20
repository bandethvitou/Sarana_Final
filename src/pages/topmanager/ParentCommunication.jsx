// src/pages/topmanager/ParentCommunication.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ParentCommunication() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('messages');
  const [selectedClass, setSelectedClass] = useState('All');

  const messages = [
    { id: 1, parent: 'Mr. Sokha', student: 'Sok Chan', class: 'Grade 5A', subject: 'Academic Progress', message: 'My son is struggling with math homework...', status: 'unread', date: '2024-03-15' },
    { id: 2, parent: 'Mrs. Dara', student: 'Chea Sopheap', class: 'Grade 4A', subject: 'Attendance', message: 'Will be absent next week for family trip', status: 'read', date: '2024-03-14' },
    { id: 3, parent: 'Mr. Vannak', student: 'Long Vannak', class: 'Grade 6A', subject: 'Behavior', message: 'Concerned about recent behavior changes', status: 'unread', date: '2024-03-13' },
  ];

  const announcements = [
    { id: 1, title: 'Parent-Teacher Conference', date: 'March 25, 2024', audience: 'All Parents', status: 'Scheduled' },
    { id: 2, title: 'Mid-Term Exam Schedule', date: 'April 1-5, 2024', audience: 'Grade 4-6', status: 'Published' },
    { id: 3, title: 'School Holiday Notice', date: 'April 13-16, 2024', audience: 'All Parents', status: 'Published' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">💬 Parent Communication Portal</h1>
        <button
          onClick={() => navigate('/top-manager/announcements/new')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          + New Announcement
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          <button
            onClick={() => setSelectedTab('messages')}
            className={`pb-2 px-1 font-medium transition-colors ${
              selectedTab === 'messages' 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Messages ({messages.filter(m => m.status === 'unread').length})
          </button>
          <button
            onClick={() => setSelectedTab('announcements')}
            className={`pb-2 px-1 font-medium transition-colors ${
              selectedTab === 'announcements' 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Announcements
          </button>
          <button
            onClick={() => setSelectedTab('broadcast')}
            className={`pb-2 px-1 font-medium transition-colors ${
              selectedTab === 'broadcast' 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Broadcast
          </button>
        </div>
      </div>

      {selectedTab === 'messages' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b">
            <div className="flex gap-3">
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>All Classes</option>
                <option>Grade 4A</option>
                <option>Grade 5A</option>
                <option>Grade 6A</option>
              </select>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>All Messages</option>
                <option>Unread</option>
                <option>Read</option>
              </select>
            </div>
          </div>
          <div className="divide-y">
            {messages.map(msg => (
              <div key={msg.id} className={`p-4 hover:bg-gray-50 transition-colors ${msg.status === 'unread' ? 'bg-blue-50' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-blue-900">{msg.subject}</h3>
                    <p className="text-sm text-gray-500">
                      {msg.parent} • Student: {msg.student} • Class: {msg.class}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">{msg.date}</span>
                </div>
                <p className="text-gray-700 text-sm mb-3">{msg.message}</p>
                <div className="flex gap-2">
                  <button className="text-sm text-green-600 hover:text-green-700">Reply</button>
                  <button className="text-sm text-gray-500 hover:text-gray-700">Mark as Read</button>
                  <button className="text-sm text-red-500 hover:text-red-700">Archive</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'announcements' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y">
            {announcements.map(ann => (
              <div key={ann.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-blue-900">{ann.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    ann.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{ann.status}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Audience: {ann.audience} • Date: {ann.date}</p>
                <div className="flex gap-2">
                  <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                  <button className="text-sm text-green-600 hover:text-green-700">Send Reminder</button>
                  <button className="text-sm text-red-500 hover:text-red-700">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'broadcast' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Send Broadcast Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>All Parents</option>
                <option>Grade 4 Parents</option>
                <option>Grade 5 Parents</option>
                <option>Grade 6 Parents</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="Enter subject..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows="4" className="w-full border rounded-lg px-3 py-2" placeholder="Type your message here..."></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" className="px-4 py-2 border rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Send Broadcast
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}