import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockVisitors = [
  { id: 1, pass: 'VIS-2025-0042', name: 'Mr. Sok Heng', purpose: 'Meeting', host: 'Mr. John', timeIn: '9:00 AM', timeOut: '10:30 AM', status: 'checked-out' },
  { id: 2, pass: 'VIS-2025-0043', name: 'Ms. Srey Mom', purpose: 'Delivery', host: 'Mrs. Lisa', timeIn: '10:15 AM', timeOut: '-', status: 'active' },
  { id: 3, pass: 'VIS-2025-0044', name: 'Mr. David', purpose: 'Campus Tour', host: 'Ms. Anna', timeIn: '11:00 AM', timeOut: '-', status: 'active' },
  { id: 4, pass: 'VIS-2025-0045', name: 'Mrs. Sok Sreyneang', purpose: 'Meeting', host: 'Mr. Rudi', timeIn: '11:30 AM', timeOut: '-', status: 'active' },
];

const purposes = ['Meeting', 'Delivery', 'Campus Tour', 'Event', 'Other'];
const hosts = ['Mr. John', 'Mrs. Lisa', 'Ms. Anna', 'Mr. Rudi', 'Mr. Mike', 'Mr. B. Soth'];

export default function VisitorLog() {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState(mockVisitors);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    purpose: 'Meeting',
    host: 'Mr. John',
    organization: '',
    vehicle: '',
  });

  const filtered = visitors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.pass.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    return status === 'active'
      ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Active</span>
      : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Checked Out</span>;
  };

  const generatePassNumber = () => {
    const lastPass = visitors.reduce((max, v) => {
      const num = parseInt(v.pass.split('-')[2]);
      return num > max ? num : max;
    }, 0);
    return `VIS-2025-${String(lastPass + 1).padStart(4, '0')}`;
  };

  const handleRegister = () => {
    if (!form.name || !form.phone || !form.host) {
      toast.error('Please fill in all required fields');
      return;
    }
    const newVisitor = {
      id: Date.now(),
      pass: generatePassNumber(),
      name: form.name,
      purpose: form.purpose,
      host: form.host,
      timeIn: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timeOut: '-',
      status: 'active',
    };
    setVisitors([newVisitor, ...visitors]);
    setShowModal(false);
    setForm({ name: '', phone: '', purpose: 'Meeting', host: 'Mr. John', organization: '', vehicle: '' });
    toast.success('✅ Visitor registered successfully!');
  };

  const handleCheckOut = (id) => {
    if (window.confirm('Check out this visitor?')) {
      setVisitors(visitors.map(v =>
        v.id === id
          ? { ...v, status: 'checked-out', timeOut: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
          : v
      ));
      toast.success('✅ Visitor checked out successfully!');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🚶 Visitor Log</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or pass..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
        >
          + Register Visitor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Pass #</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Purpose</th>
              <th className="px-4 py-3 text-left">Host</th>
              <th className="px-4 py-3 text-left">Time In</th>
              <th className="px-4 py-3 text-left">Time Out</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((visitor) => (
              <tr key={visitor.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs font-bold">{visitor.pass}</td>
                <td className="px-4 py-3 font-medium">{visitor.name}</td>
                <td className="px-4 py-3">{visitor.purpose}</td>
                <td className="px-4 py-3">{visitor.host}</td>
                <td className="px-4 py-3">{visitor.timeIn}</td>
                <td className="px-4 py-3">{visitor.timeOut}</td>
                <td className="px-4 py-3">{getStatusBadge(visitor.status)}</td>
                <td className="px-4 py-3">
                  {visitor.status === 'active' && (
                    <button onClick={() => handleCheckOut(visitor.id)} className="text-blue-900 hover:underline text-sm">
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-8 text-gray-400">No visitors found</div>}
      </div>

      {/* Register Visitor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🚶 Register Visitor</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Name *</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose *</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.purpose}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                >
                  {purposes.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Host Person *</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.host}
                  onChange={(e) => setForm({ ...form, host: e.target.value })}
                >
                  {hosts.map(h => <option key={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.vehicle}
                  onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                />
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500">Visitor Pass</p>
                <p className="font-mono font-bold text-blue-900">{generatePassNumber()}</p>
                <p className="text-xs text-gray-400">Issue Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleRegister} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Register & Print Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}