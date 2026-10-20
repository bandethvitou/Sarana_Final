import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockDefaulters = [
  { id: 1, student: 'Sok Heng', class: 'Grade 10', amount: 500, days: 60, parentEmail: 'parent.sok@nis.edu', phone: '012345678' },
  { id: 2, student: 'Mey Lin', class: 'Grade 8', amount: 350, days: 45, parentEmail: 'parent.mey@nis.edu', phone: '012345679' },
  { id: 3, student: 'David', class: 'Grade 12', amount: 200, days: 30, parentEmail: 'parent.david@nis.edu', phone: '012345680' },
  { id: 4, student: 'Lina', class: 'Grade 7', amount: 150, days: 25, parentEmail: 'parent.lina@nis.edu', phone: '012345681' },
  { id: 5, student: 'Channy', class: 'Grade 9', amount: 100, days: 15, parentEmail: 'parent.channy@nis.edu', phone: '012345682' },
  { id: 6, student: 'Sreyneng', class: 'Grade 5', amount: 80, days: 10, parentEmail: 'parent.sreyneng@nis.edu', phone: '012345683' },
  { id: 7, student: 'Menghong', class: 'Grade 3', amount: 120, days: 7, parentEmail: 'parent.menghong@nis.edu', phone: '012345684' },
];

const levels = ['All', 'Grade 3', 'Grade 5', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const daysOptions = ['All', '0-15 days', '15-30 days', '30+ days'];

export default function FeeDefaulters() {
  const navigate = useNavigate();
  const [defaulters, setDefaulters] = useState(mockDefaulters);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [daysFilter, setDaysFilter] = useState('All');
  const [selectedDefaulter, setSelectedDefaulter] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');

  const filteredDefaulters = defaulters.filter(d => {
    const matchSearch = d.student.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'All' || d.class === levelFilter;
    let matchDays = true;
    if (daysFilter === '0-15 days') matchDays = d.days <= 15;
    else if (daysFilter === '15-30 days') matchDays = d.days > 15 && d.days <= 30;
    else if (daysFilter === '30+ days') matchDays = d.days > 30;
    return matchSearch && matchLevel && matchDays;
  });

  const totalOutstanding = filteredDefaulters.reduce((sum, d) => sum + d.amount, 0);
  const totalCount = filteredDefaulters.length;

  const getDaysBadge = (days) => {
    if (days > 30) {
      return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 {days} days</span>;
    } else if (days > 15) {
      return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 {days} days</span>;
    } else {
      return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 {days} days</span>;
    }
  };

  const handleSendReminder = (defaulter) => {
    setSelectedDefaulter(defaulter);
    setReminderMessage(
      `Dear Parent,\n\nThis is a reminder that the tuition fee of $${defaulter.amount} for ${defaulter.student} (${defaulter.class}) is now ${defaulter.days} days overdue.\n\nPlease make the payment as soon as possible.\n\nThank you.`
    );
    setShowReminderModal(true);
  };

  const handleSendAllReminders = () => {
    if (filteredDefaulters.length === 0) {
      alert('No defaulters to send reminders to.');
      return;
    }
    if (window.confirm(`Send reminders to ${filteredDefaulters.length} defaulters?`)) {
      alert(`✅ Reminders sent to ${filteredDefaulters.length} parents.`);
    }
  };

  const handleSendReminderEmail = () => {
    alert(`✅ Reminder sent to ${selectedDefaulter.student}'s parent.`);
    setShowReminderModal(false);
  };

  const handleExportList = () => {
    alert('📊 Exporting defaulter list...');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">⚠️ Fee Defaulters</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{totalCount}</div>
          <div className="text-sm text-gray-500">Total Defaulters</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div className="text-2xl font-bold text-orange-600">${totalOutstanding.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Outstanding</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">{defaulters.filter(d => d.days > 30).length}</div>
          <div className="text-sm text-gray-500">Over 30 Days (Critical)</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Level</label>
            <select 
              className="border rounded-lg px-3 py-2 bg-white"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              {levels.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Days Late</label>
            <select 
              className="border rounded-lg px-3 py-2 bg-white"
              value={daysFilter}
              onChange={(e) => setDaysFilter(e.target.value)}
            >
              {daysOptions.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-gray-500 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search student..."
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button 
          onClick={handleSendAllReminders}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          📧 Send Reminder to All
        </button>
        <button 
          onClick={handleExportList}
          className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors"
        >
          📊 Export List
        </button>
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Over 30 days (Critical)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500"></span> 15-30 days (Warning)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Under 15 days (Notice)</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-left">Days Late</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDefaulters.map((d, idx) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3 font-medium">{d.student}</td>
                <td className="px-4 py-3">{d.class}</td>
                <td className="px-4 py-3 text-right font-bold text-red-600">${d.amount}</td>
                <td className="px-4 py-3">{getDaysBadge(d.days)}</td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => handleSendReminder(d)}
                    className="px-3 py-1 bg-blue-900 text-white rounded-lg text-xs hover:bg-blue-800 transition-colors"
                  >
                    Send Reminder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredDefaulters.length === 0 && (
          <div className="text-center py-8 text-gray-400">No defaulters found</div>
        )}
      </div>

      {/* Send Reminder Modal */}
      {showReminderModal && selectedDefaulter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📧 Send Reminder</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <p><strong>Student:</strong> {selectedDefaulter.student} ({selectedDefaulter.class})</p>
                <p><strong>Amount:</strong> ${selectedDefaulter.amount}</p>
                <p><strong>Days Overdue:</strong> {selectedDefaulter.days} days</p>
                <p><strong>Email:</strong> {selectedDefaulter.parentEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={`Fee Payment Reminder – $${selectedDefaulter.amount}`}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows="6"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  value={reminderMessage}
                  onChange={(e) => setReminderMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowReminderModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendReminderEmail}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}