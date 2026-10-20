import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdmissionsSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    autoApprove: false,
    emailNotifications: true,
    tourReminders: true,
    defaultLevel: 'Kids (1-6)',
    applicationDeadline: 7,
    dateFormat: 'DD/MM/YYYY',
    itemsPerPage: 25,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast.success('✅ Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        autoApprove: false,
        emailNotifications: true,
        tourReminders: true,
        defaultLevel: 'Kids (1-6)',
        applicationDeadline: 7,
        dateFormat: 'DD/MM/YYYY',
        itemsPerPage: 25,
      });
      toast.success('✅ Settings reset to default!');
    }
  };

  const tabs = [
    { id: 'general', label: '⚙️ General', icon: '⚙️' },
    { id: 'preferences', label: '🎯 Preferences', icon: '🎯' },
    { id: 'notifications', label: '🔔 Notifications', icon: '🔔' },
  ];

  // Toggle Switch Component
  const ToggleSwitch = ({ label, description, value, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-medium text-gray-700">{label}</p>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`w-12 h-7 rounded-full p-1 transition-all duration-300 ${
          value ? 'bg-blue-900' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">⚙️ Admissions Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your admissions preferences and configurations</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
                activeTab === tab.id
                  ? 'bg-white text-blue-900 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl">
        
        {/* ===== GENERAL TAB ===== */}
        {activeTab === 'general' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-blue-900">⚙️ General Settings</h2>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Core</span>
            </div>
            
            <div className="space-y-4">
              {/* Default Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Level
                  <span className="text-gray-400 text-xs ml-2">(applied to new registrations)</span>
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  value={settings.defaultLevel}
                  onChange={(e) => setSettings({ ...settings, defaultLevel: e.target.value })}
                >
                  <option value="Baby (Pre-K)">Baby (Pre-K)</option>
                  <option value="Kids (1-6)">Kids (1-6)</option>
                  <option value="Junior (7-9)">Junior (7-9)</option>
                  <option value="Senior (10-12)">Senior (10-12)</option>
                </select>
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Deadline
                  <span className="text-gray-400 text-xs ml-2">(days to review)</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    className="w-32 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                    value={settings.applicationDeadline}
                    onChange={(e) => setSettings({ ...settings, applicationDeadline: parseInt(e.target.value) || 7 })}
                  />
                  <span className="text-sm text-gray-500">days</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PREFERENCES TAB ===== */}
        {activeTab === 'preferences' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-blue-900">🎯 Preferences</h2>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Display</span>
            </div>

            <div className="space-y-4">
              {/* Date Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Format
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  value={settings.dateFormat}
                  onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              {/* Items Per Page */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Items Per Page
                  <span className="text-gray-400 text-xs ml-2">(tables and lists)</span>
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                  value={settings.itemsPerPage}
                  onChange={(e) => setSettings({ ...settings, itemsPerPage: parseInt(e.target.value) })}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ===== NOTIFICATIONS TAB ===== */}
        {activeTab === 'notifications' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-blue-900">🔔 Notification Settings</h2>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Alerts</span>
            </div>

            <div className="space-y-1">
              {/* Auto-Approve */}
              <ToggleSwitch
                label="Auto-Approve Applications"
                description="Automatically approve applications that meet all criteria"
                value={settings.autoApprove}
                onChange={() => handleToggle('autoApprove')}
              />

              {/* Email Notifications */}
              <ToggleSwitch
                label="Email Notifications"
                description="Receive email alerts for new applications and updates"
                value={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />

              {/* Tour Reminders */}
              <ToggleSwitch
                label="Tour Reminders"
                description="Get reminders before scheduled campus tours"
                value={settings.tourReminders}
                onChange={() => handleToggle('tourReminders')}
              />
            </div>
          </div>
        )}

        {/* ===== ACTION BUTTONS ===== */}
        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium shadow-sm hover:shadow-md"
          >
            💾 Save Settings
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
          >
            🔄 Reset to Default
          </button>
          <button
            onClick={() => navigate('/admissions')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
          >
            ↩️ Back to Home
          </button>
        </div>

        {/* ===== STATUS INDICATOR ===== */}
        <div className="mt-4 text-xs text-gray-400 flex flex-wrap gap-4">
          <span>🟢 All settings are up to date</span>
          <span>📅 Last updated: {new Date().toLocaleDateString()}</span>
          <span>🔒 Changes are saved locally</span>
        </div>
      </div>
    </div>
  );
}