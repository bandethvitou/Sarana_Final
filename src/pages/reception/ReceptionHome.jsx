import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

// ============================================================
// TODAY'S DATA
// ============================================================

const todayKPIs = [
  { label: "Students Checked In Today", value: '1,200', change: 'Out of 1,250', icon: '✅', color: 'border-green-500' },
  { label: 'New Visitors Today', value: '8', change: '2 waiting in lobby', icon: '🚶', color: 'border-blue-900' },
  { label: 'Calls Today', value: '15', change: '3 pending callback', icon: '📞', color: 'border-purple-500' },
  { label: 'Pending Tasks Today', value: '5', change: '⚠️ Due today', icon: '⚠️', color: 'border-yellow-500' },
  { label: 'Late Arrivals', value: '23', change: '⚠️ Report to admin', icon: '🕒', color: 'border-red-500' },
];

const newCustomers = [
  { id: 1, name: 'Mr. Chen', phone: '012-111-111', level: 'Kids', status: 'pending' },
  { id: 2, name: 'Mrs. Srey', phone: '012-222-222', level: 'Junior', status: 'tour' },
  { id: 3, name: 'Mr. Lim', phone: '012-333-333', level: 'Senior', status: 'no-response' },
  { id: 4, name: 'Mrs. Keo', phone: '012-444-444', level: 'Baby', status: 'applied' },
  { id: 5, name: 'Mr. Tan', phone: '012-555-555', level: 'Kids', status: 'pending' },
];

const outstandingFees = [
  { id: 1, student: 'Sok Heng', class: 'Grade 10', amount: '$500', daysDue: 60, priority: 'critical' },
  { id: 2, student: 'Mey Lin', class: 'Grade 8', amount: '$350', daysDue: 45, priority: 'critical' },
  { id: 3, student: 'David', class: 'Grade 12', amount: '$200', daysDue: 30, priority: 'high' },
  { id: 4, student: 'Lina', class: 'Grade 7', amount: '$150', daysDue: 25, priority: 'high' },
  { id: 5, student: 'Channy', class: 'Grade 9', amount: '$100', daysDue: 15, priority: 'medium' },
];

const todoList = [
  { id: 1, task: 'Call back Mr. Chen – Kids level inquiry', done: false },
  { id: 2, task: 'Call back Mrs. Keo – Baby level application status', done: false },
  { id: 3, task: 'Prepare visitor passes for campus tour (2:00 PM)', done: false },
  { id: 4, task: 'Remind Sok Heng\'s parent about overdue fees', done: false },
  { id: 5, task: 'Submit daily check-in report to Manager', done: false },
  { id: 6, task: 'Update contact directory – New IT staff', done: true },
  { id: 7, task: 'Confirm meeting room booking for Director', done: true },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ReceptionHome() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(newCustomers);
  const [fees] = useState(outstandingFees);
  const [tasks, setTasks] = useState(todoList);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importPreview, setImportPreview] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    toast.success('📞 Welcome to Reception!');
  }, []);

  // ============================================================
  // STATUS BADGES
  // ============================================================

  const getCustomerStatusBadge = (status) => {
    const variants = {
      applied: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      'no-response': 'bg-red-100 text-red-700',
      tour: 'bg-purple-100 text-purple-700',
      enrolled: 'bg-blue-100 text-blue-700',
    };
    const labels = {
      applied: '🟢 Applied',
      pending: '🟡 Pending',
      'no-response': '🔴 No Response',
      tour: '🟣 Tour Scheduled',
      enrolled: '🔵 Enrolled',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${variants[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      critical: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${variants[priority] || 'bg-gray-100'}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    toast.success('✅ Task updated!');
  };

  const handleAddTask = () => {
    const task = prompt('Enter new task:');
    if (task) {
      setTasks([...tasks, { id: Date.now(), task, done: false }]);
      toast.success('✅ Task added!');
    }
  };

  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        setImportPreview(json);
        setImportFile(file);
        toast.success(`📥 Loaded ${json.length} records from Excel`);
      } catch (error) {
        toast.error('Error reading Excel file');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const confirmImport = () => {
    if (importPreview.length === 0) {
      toast.error('No data to import');
      return;
    }
    const newCustomers = importPreview.map((row, idx) => ({
      id: Date.now() + idx,
      name: row.Name || row.name || 'Unknown',
      phone: row.Phone || row.phone || 'N/A',
      level: row.Level || row.level || 'Unknown',
      status: 'pending',
    }));
    setCustomers([...customers, ...newCustomers]);
    toast.success(`✅ Imported ${newCustomers.length} customers!`);
    setShowImportModal(false);
    setImportFile(null);
    setImportPreview([]);
  };

  const downloadTemplate = () => {
    const template = [
      ['Name', 'Phone', 'Level', 'Notes'],
      ['Mr. Chen', '012-111-111', 'Kids', 'Interested'],
      ['Mrs. Srey', '012-222-222', 'Junior', 'Call back'],
    ];
    const ws = XLSX.utils.aoa_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
    XLSX.writeFile(wb, 'customer_template.xlsx');
    toast.success('📥 Template downloaded!');
  };

  // ============================================================
  // RENDER
  // ============================================================

  const completedCount = tasks.filter(t => t.done).length;
  const totalOutstanding = fees.reduce((sum, f) => sum + parseInt(f.amount.replace('$', '')), 0);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📞 Reception Home</h1>
        <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">TODAY'S DATA</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {todayKPIs.map((kpi, idx) => (
          <div key={idx} className={`bg-white rounded-xl p-5 shadow-sm border-t-4 ${kpi.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{kpi.change}</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-900">{kpi.value}</div>
              <div className="text-sm text-gray-500">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={() => navigate('/reception/checkin')} className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>✅</span> Check-In Student
        </button>
        <button onClick={() => navigate('/reception/visitors')} className="px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>🚶</span> Register Visitor
        </button>
        <button onClick={() => { toast.success('📞 Opening call log...'); navigate('/reception/contacts'); }} className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📞</span> Log Phone Call
        </button>
        <button onClick={() => navigate('/reception/report')} className="px-5 py-2.5 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-all flex items-center gap-2 font-medium">
          <span>📄</span> End of Day Report
        </button>
      </div>

      {/* Section 1: New Customers */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">📋 New Customers – Prospective Parents</h2>
          <div className="flex gap-2">
            <button onClick={() => setShowImportModal(true)} className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800 transition-colors">
              📥 Import from Excel
            </button>
            <button onClick={() => toast.success('📝 Opening new inquiry form...')} className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors">
              + Add New Inquiry
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Level</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, idx) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-medium">{c.name}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">{c.level}</td>
                  <td className="px-4 py-2">{getCustomerStatusBadge(c.status)}</td>
                  <td className="px-4 py-2">
                    <button className="text-orange-500 hover:underline text-sm mr-2">📞 Call</button>
                    <button className="text-blue-900 hover:underline text-sm">Follow</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-gray-400 flex flex-wrap gap-3">
          <span>🟢 Applied</span>
          <span>🟡 Pending</span>
          <span>🔴 No Response</span>
          <span>🟣 Tour Scheduled</span>
          <span>🔵 Enrolled</span>
        </div>
      </div>

      {/* Section 2: Outstanding Fees */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-600">💰 Students with Outstanding Fees</h2>
          <span className="text-sm font-medium text-gray-600">Total Outstanding: <span className="text-red-600 font-bold">${totalOutstanding}</span> from {fees.length} students</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Student</th>
                <th className="px-4 py-2 text-left">Class</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Days Due</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f, idx) => (
                <tr key={f.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-medium">{f.student}</td>
                  <td className="px-4 py-2">{f.class}</td>
                  <td className="px-4 py-2 font-bold text-red-600">{f.amount}</td>
                  <td className="px-4 py-2">{f.daysDue} days</td>
                  <td className="px-4 py-2">{getPriorityBadge(f.priority)}</td>
                  <td className="px-4 py-2">
                    <button className="text-orange-500 hover:underline text-sm">💬 Remind</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Monthly Estimate */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📊 New Students Estimate – June 2025</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-900">40</div>
            <div className="text-sm text-gray-500">Target</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">35</div>
            <div className="text-sm text-gray-500">Enrolled</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-gray-500">Tours</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-600">25</div>
            <div className="text-sm text-gray-500">Inquiries</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress: 87.5%</span>
            <span>Remaining: 5 more needed</span>
            <span>Days Left: 10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: '87.5%' }}></div>
          </div>
          <div className="mt-2 text-sm text-green-600 font-medium">🟢 On Track to meet target</div>
        </div>
      </div>

      {/* Section 4: To-Do List */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">✅ Today's To-Do List</h2>
          <span className="text-sm text-gray-500">Completed: {completedCount}/{tasks.length}</span>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 py-2 border-b last:border-0">
              <button
                onClick={() => handleToggleTask(task.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${task.done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-blue-900'}`}
              >
                {task.done && '✓'}
              </button>
              <span className={`flex-1 ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.task}</span>
              {task.done && <span className="text-xs text-green-500">✓ Done</span>}
            </div>
          ))}
        </div>
        <button onClick={handleAddTask} className="mt-4 text-sm text-orange-500 hover:underline font-medium">
          + Add Task
        </button>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-blue-900">📥 Import New Customers from Excel</h2>
              <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <button onClick={downloadTemplate} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                  📥 Download Template
                </button>
                <label className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  📤 Choose File
                  <input type="file" accept=".xlsx,.xls" className="hidden" onChange={handleImportExcel} />
                </label>
              </div>
              {importFile && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-700">✅ {importFile.name}</p>
                  <p className="text-xs text-gray-500">{importPreview.length} records found</p>
                </div>
              )}
              {importPreview.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          {Object.keys(importPreview[0]).map((key) => (
                            <th key={key} className="px-3 py-2 text-left">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {importPreview.slice(0, 5).map((row, idx) => (
                          <tr key={idx} className="border-t">
                            {Object.values(row).map((val, i) => (
                              <td key={i} className="px-3 py-2">{String(val)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {importPreview.length > 5 && (
                      <p className="text-xs text-gray-400 p-2">... and {importPreview.length - 5} more</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowImportModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmImport} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Import Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}