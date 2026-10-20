import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const conversations = [
  { id: 1, name: 'Mr. John', subject: 'Math', lastMessage: 'Sok is doing well in class.', time: '10:30 AM', unread: true },
  { id: 2, name: 'Ms. Anna', subject: 'English', lastMessage: 'Mey needs to submit her essay.', time: 'Yesterday', unread: false },
  { id: 3, name: 'Mr. David', subject: 'Science', lastMessage: 'Lab report graded.', time: '2 days ago', unread: false },
];

const teachers = ['Mr. John (Math)', 'Ms. Anna (English)', 'Mr. David (Science)'];

export default function Messages() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMessageForm, setNewMessageForm] = useState({
    teacher: '',
    subject: '',
    message: '',
  });

  const handleSend = () => {
    if (!message.trim()) return;
    toast.success('📤 Message sent!');
    setMessage('');
  };

  const handleNewMessage = () => {
    if (!newMessageForm.teacher || !newMessageForm.message) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('📤 Message sent!');
    setShowNewMessage(false);
    setNewMessageForm({ teacher: '', subject: '', message: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">💬 Messages</h1>

      <button
        onClick={() => setShowNewMessage(true)}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-6 font-medium"
      >
        + New Message
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversation List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-blue-900">Conversations</h3>
          </div>
          <div className="divide-y">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === conv.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{conv.name}</p>
                    <p className="text-sm text-gray-500">{conv.subject}</p>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xs text-gray-400">{conv.time}</span>
                    {conv.unread && <span className="w-2 h-2 bg-orange-500 rounded-full mt-1"></span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b bg-gray-50">
                <p className="font-medium text-blue-900">{selectedChat.name}</p>
                <p className="text-sm text-gray-500">Subject: {selectedChat.subject}</p>
              </div>
              <div className="flex-1 p-4 min-h-[300px]">
                <div className="text-center text-gray-400 text-sm py-8">
                  <p>💬 No messages yet</p>
                  <p className="text-xs">Start a conversation with {selectedChat.name}</p>
                </div>
              </div>
              <div className="p-4 border-t flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Send</button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center p-8">
                <div className="text-4xl mb-2">💬</div>
                <p>Select a conversation</p>
                <p className="text-sm">Choose a teacher to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">✏️ New Message</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={newMessageForm.teacher}
                  onChange={(e) => setNewMessageForm({ ...newMessageForm, teacher: e.target.value })}
                >
                  <option value="">Select teacher...</option>
                  {teachers.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={newMessageForm.subject}
                  onChange={(e) => setNewMessageForm({ ...newMessageForm, subject: e.target.value })}
                  placeholder="e.g., Homework question"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full border rounded-lg px-4 py-2"
                  value={newMessageForm.message}
                  onChange={(e) => setNewMessageForm({ ...newMessageForm, message: e.target.value })}
                  placeholder="Type your message..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowNewMessage(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleNewMessage} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}