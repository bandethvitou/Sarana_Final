import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockStaff = [
  { id: 1, name: 'Mr. John', email: 'john@nis.edu', phone: '012345678', department: 'Academic', positions: ['Teacher', 'Dept Head'], status: 'active' },
  { id: 2, name: 'Ms. Anna', email: 'anna@nis.edu', phone: '012345679', department: 'Finance', positions: ['Finance Admin'], status: 'active' },
  { id: 3, name: 'Mr. Rudi', email: 'rudi@nis.edu', phone: '012345680', department: 'Operations', positions: ['Manager'], status: 'active' },
  { id: 4, name: 'Mrs. Linda', email: 'linda@nis.edu', phone: '012345681', department: 'Academic', positions: ['Teacher'], status: 'inactive' },
  { id: 5, name: 'Ms. Siti', email: 'siti@nis.edu', phone: '012345682', department: 'HR', positions: ['HR Admin'], status: 'active' },
  { id: 6, name: 'Mr. Budi', email: 'budi@nis.edu', phone: '012345683', department: 'Admin', positions: ['Staff'], status: 'active' },
];

const departments = ['All', 'Academic', 'Admin', 'Finance', 'HR', 'Operations'];
const allPositions = ['Teacher', 'Dept Head', 'Manager', 'Finance Admin', 'HR Admin', 'Staff', 'Event Coordinator'];

export default function StaffManagement() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(mockStaff);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Academic',
    positions: [],
    status: 'active',
    password: '',
  });

  const filteredStaff = staff.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                        s.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = departmentFilter === 'All' || s.department === departmentFilter;
    return matchSearch && matchDept;
  });

  const getStatusBadge = (status) => {
    return status === 'active'
      ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
      : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Inactive</span>;
  };

  const getPositionBadge = (position) => {
    const colors = {
      'Teacher': 'bg-blue-100 text-blue-700',
      'Dept Head': 'bg-purple-100 text-purple-700',
      'Manager': 'bg-yellow-100 text-yellow-700',
      'Finance Admin': 'bg-green-100 text-green-700',
      'HR Admin': 'bg-pink-100 text-pink-700',
      'Staff': 'bg-gray-100 text-gray-700',
      'Event Coordinator': 'bg-orange-100 text-orange-700',
    };
    return colors[position] || 'bg-gray-100 text-gray-700';
  };

  const handleAddStaff = () => {
    if (!form.name || !form.email) return;
    const newStaff = {
      id: Date.now(),
      ...form,
      status: 'active',
    };
    setStaff([newStaff, ...staff]);
    setShowModal(false);
    setForm({ name: '', email: '', phone: '', department: 'Academic', positions: [], status: 'active', password: '' });
  };

  const handleEditStaff = (staffMember) => {
    setEditingStaff(staffMember);
    setForm({ ...staffMember });
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    setStaff(staff.map(s => s.id === editingStaff.id ? { ...s, ...form } : s));
    setShowModal(false);
    setEditingStaff(null);
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm('Delete this staff member?')) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s));
  };

  const togglePosition = (position) => {
    setForm(prev => ({
      ...prev,
      positions: prev.positions.includes(position) 
        ? prev.positions.filter(p => p !== position) 
        : [...prev.positions, position]
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">👥 Staff Management</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
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
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          + Add Staff
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Positions</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.department}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {s.positions.map((p, i) => (
                      <span key={i} className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPositionBadge(p)}`}>
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">{getStatusBadge(s.status)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleEditStaff(s)} className="text-blue-900 hover:underline text-sm mr-2">Edit</button>
                  <button onClick={() => toggleStatus(s.id)} className="text-orange-500 hover:underline text-sm mr-2">
                    {s.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => handleDeleteStaff(s.id)} className="text-red-500 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStaff.length === 0 && (
          <div className="text-center py-8 text-gray-400">No staff found</div>
        )}
      </div>

      {/* Add/Edit Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">{editingStaff ? 'Edit Staff' : 'Add Staff'}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.department}
                  onChange={(e) => setForm({...form, department: e.target.value})}
                >
                  {departments.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Positions</label>
                <div className="grid grid-cols-2 gap-1">
                  {allPositions.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form.positions.includes(p)}
                        onChange={() => togglePosition(p)}
                        className="rounded text-blue-900"
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
              {!editingStaff && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg px-4 py-2"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={editingStaff ? handleSaveEdit : handleAddStaff} className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                {editingStaff ? 'Save Changes' : 'Add Staff'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}