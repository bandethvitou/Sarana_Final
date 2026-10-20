import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockContacts = [
  { id: 1, name: 'Mr. B. Soth', department: 'Management', position: 'Director', phone: '1001', email: 'bsoth@nis.edu', room: '201' },
  { id: 2, name: 'Mr. John', department: 'Admissions', position: 'Admissions Officer', phone: '1002', email: 'john@nis.edu', room: '105' },
  { id: 3, name: 'Mrs. Lisa', department: 'HR', position: 'HR Admin', phone: '1003', email: 'lisa@nis.edu', room: '305' },
  { id: 4, name: 'Mr. Mike', department: 'Finance', position: 'Finance Admin', phone: '1004', email: 'mike@nis.edu', room: '310' },
  { id: 5, name: 'Ms. Anna', department: 'Management', position: 'Top Manager', phone: '1005', email: 'anna@nis.edu', room: '202' },
  { id: 6, name: 'Mr. Rudi', department: 'Management', position: 'Manager', phone: '1006', email: 'rudi@nis.edu', room: '203' },
  { id: 7, name: 'Ms. Siti', department: 'Reception', position: 'Receptionist', phone: '1007', email: 'siti@nis.edu', room: '101' },
  { id: 8, name: 'Mr. David', department: 'Admissions', position: 'Admissions Officer', phone: '1008', email: 'david@nis.edu', room: '106' },
];

const departments = ['All', 'Management', 'Admissions', 'HR', 'Finance', 'Reception', 'IT'];

export default function ContactDirectory() {
  const navigate = useNavigate();
  const [contacts] = useState(mockContacts);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [callForm, setCallForm] = useState({
    callerName: '',
    callerPhone: '',
    for: 'Mr. John',
    purpose: '',
    notes: '',
    status: 'resolved',
  });

  const filtered = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = departmentFilter === 'All' || c.department === departmentFilter;
    return matchSearch && matchDept;
  });

  const handleLogCall = () => {
    if (!callForm.callerName || !callForm.purpose) {
      toast.error('Please fill in caller name and purpose');
      return;
    }
    toast.success('📞 Call logged successfully!');
    setShowModal(false);
    setCallForm({ callerName: '', callerPhone: '', for: 'Mr. John', purpose: '', notes: '', status: 'resolved' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📞 Contact Directory</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, extension, or email..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
        >
          📞 Log Phone Call
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Room</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{contact.name}</td>
                <td className="px-4 py-3">{contact.department}</td>
                <td className="px-4 py-3">{contact.position}</td>
                <td className="px-4 py-3 font-mono font-bold text-blue-900">{contact.phone}</td>
                <td className="px-4 py-3 text-gray-600">{contact.email}</td>
                <td className="px-4 py-3">{contact.room}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setCallForm({ ...callForm, for: contact.name, callerName: '' });
                      setShowModal(true);
                    }}
                    className="text-orange-500 hover:underline text-sm"
                  >
                    📞 Call
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-8 text-gray-400">No contacts found</div>}
      </div>

      {/* Log Call Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📞 Log Phone Call</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caller Name *</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={callForm.callerName}
                  onChange={(e) => setCallForm({ ...callForm, callerName: e.target.value })}
                  placeholder="Mrs. Sok"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caller Phone</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={callForm.callerPhone}
                  onChange={(e) => setCallForm({ ...callForm, callerPhone: e.target.value })}
                  placeholder="012-345-678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">For *</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={callForm.for}
                  onChange={(e) => setCallForm({ ...callForm, for: e.target.value })}
                >
                  {contacts.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose *</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={callForm.purpose}
                  onChange={(e) => setCallForm({ ...callForm, purpose: e.target.value })}
                  placeholder="Inquiry about enrollment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={callForm.notes}
                  onChange={(e) => setCallForm({ ...callForm, notes: e.target.value })}
                  placeholder="Any additional notes..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCallForm({ ...callForm, status: 'resolved' })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${callForm.status === 'resolved' ? 'bg-green-500 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    ✅ Resolved
                  </button>
                  <button
                    onClick={() => setCallForm({ ...callForm, status: 'callback' })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${callForm.status === 'callback' ? 'bg-yellow-500 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    📞 Call Back
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleLogCall} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Log Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}