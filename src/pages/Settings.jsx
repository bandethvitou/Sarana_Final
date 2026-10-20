import { useState } from 'react';

export default function Settings() {
  const [tab, setTab] = useState('general');
  const [schoolName, setSchoolName] = useState('NIS School ERP');
  const [academicYear, setAcademicYear] = useState('2025-2026');
  const [semester, setSemester] = useState('Semester 1');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [eventNotifications, setEventNotifications] = useState(true);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Settings</h1>
      <div className="flex border-b mb-6">
        {['general', 'notifications', 'preferences', 'data'].map(t => (
          <button key={t} className={`px-4 py-2 font-medium capitalize ${tab === t ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        {tab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">School Name</label>
              <input className="border rounded-lg px-4 py-2 w-full" value={schoolName} onChange={e => setSchoolName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo</label>
              <input type="file" className="block text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Academic Year</label>
              <input className="border rounded-lg px-4 py-2 w-full" value={academicYear} onChange={e => setAcademicYear(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Semester</label>
              <select className="border rounded-lg px-4 py-2 w-full" value={semester} onChange={e => setSemester(e.target.value)}>
                <option>Semester 1</option>
                <option>Semester 2</option>
              </select>
            </div>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg">Save Changes</button>
          </div>
        )}

        {tab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <button onClick={() => setEmailNotifications(!emailNotifications)} className={`w-10 h-6 rounded-full p-1 transition-colors ${emailNotifications ? 'bg-blue-900' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${emailNotifications ? 'translate-x-4' : ''}`}></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span>Event Reminders</span>
              <button onClick={() => setEventNotifications(!eventNotifications)} className={`w-10 h-6 rounded-full p-1 transition-colors ${eventNotifications ? 'bg-blue-900' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${eventNotifications ? 'translate-x-4' : ''}`}></div>
              </button>
            </div>
          </div>
        )}

        {tab === 'preferences' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Format</label>
              <select className="border rounded-lg px-4 py-2 w-full">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Items Per Page</label>
              <select className="border rounded-lg px-4 py-2 w-full">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>
        )}

        {tab === 'data' && (
          <div className="space-y-4">
            <button className="px-6 py-2 bg-blue-900 text-white rounded-lg block">Export All Data (Backup)</button>
            <button className="px-6 py-2 border border-red-500 text-red-500 rounded-lg block">Request System Restore</button>
            <p className="text-sm text-gray-500 mt-2">Restore point will be created manually by administrator.</p>
          </div>
        )}
      </div>
    </div>
  );
}