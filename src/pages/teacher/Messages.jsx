import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const conversations = [
  { id: 1, parent: 'Mrs. Mey', student: 'Sok', lastMessage: 'My son is struggling with math homework.', time: '10:30 AM', unread: true },
  { id: 2, parent: 'Mr. Chan', student: 'Srey', lastMessage: 'When is the next parent-teacher meeting?', time: 'Yesterday', unread: false },
  { id: 3, parent: 'Ms. Srey', student: 'David', lastMessage: 'Thank you for the extra help!', time: '2 days ago', unread: false },
];

export default function Messages() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    toast.success('📤 Message sent!');
    setMessage('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">💬 Messages</h1>

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
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedChat?.id === conv.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{conv.parent}</p>
                    <p className="text-sm text-gray-500">{conv.student}</p>
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
                <p className="font-medium text-blue-900">{selectedChat.parent}</p>
                <p className="text-sm text-gray-500">Student: {selectedChat.student}</p>
              </div>
              <div className="flex-1 p-4 min-h-[300px]">
                <div className="text-center text-gray-400 text-sm py-8">
                  <p>💬 No messages yet</p>
                  <p className="text-xs">Start a conversation with {selectedChat.parent}</p>
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
                <p className="text-sm">Choose a parent to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}