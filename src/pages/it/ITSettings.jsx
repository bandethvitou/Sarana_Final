import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ITSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    ticketAutoAssign: true,
    emailNotifications: true,
    maintenanceReminders: true,
    defaultPriority: 'medium',
    responseTimeGoal: 2,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">⚙️ IT Settings</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {['general', 'preferences', 'notifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab
                ? 'text-blue-900 border-b-2 border-orange-500'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Assign Tickets</label>
              <button
                onClick={() => setSettings({...settings, ticketAutoAssign: !settings.ticketAutoAssign})}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.ticketAutoAssign ? 'bg-blue-900' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${settings.ticketAutoAssign ? 'translate-x-6' : ''}`}></div>
              </button>
              <p className="text-xs text-gray-400 mt-1">Automatically assign new tickets to available staff</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Priority</label>
              <select
                className="border rounded-lg px-4 py-2 w-full"
                value={settings.defaultPriority}
                onChange={(e) => setSettings({...settings, defaultPriority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Response Time Goal (hours)</label>
              <input
                type="number"
                className="border rounded-lg px-4 py-2 w-full"
                value={settings.responseTimeGoal}
                onChange={(e) => setSettings({...settings, responseTimeGoal: parseInt(e.target.value)})}
              />
            </div>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Save Changes</button>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tickets Per Page</label>
              <select className="border rounded-lg px-4 py-2 w-full">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
              <select className="border rounded-lg px-4 py-2 w-full">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
              <button
                onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.emailNotifications ? 'bg-blue-900' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${settings.emailNotifications ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Reminders</label>
              <button
                onClick={() => setSettings({...settings, maintenanceReminders: !settings.maintenanceReminders})}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.maintenanceReminders ? 'bg-blue-900' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${settings.maintenanceReminders ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}