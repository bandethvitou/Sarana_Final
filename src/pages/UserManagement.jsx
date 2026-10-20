// src/pages/UserManagement.jsx
import { useState } from 'react';

const allRoles = ['Teacher', 'Dept Head', 'Manager', 'Finance Admin', 'HR Admin', 'Staff', 'Student', 'Parent'];

const initialUsers = [
  { id: 1, name: 'Mr. John', email: 'john@nis.edu', phone: '+855 12 345 678', salary: '$1,800', shift: 'Morning (8:00 AM - 12:00 PM)', roles: ['Teacher', 'Dept Head'], status: 'active' },
  { id: 2, name: 'Ms. Anna', email: 'anna@nis.edu', phone: '+855 12 345 679', salary: '$2,200', shift: 'Full Day (8:00 AM - 4:00 PM)', roles: ['Finance Admin', 'HR Admin', 'Teacher'], status: 'active' },
  { id: 3, name: 'Mr. Rudi', email: 'rudi@nis.edu', phone: '+855 12 345 680', salary: '$2,500', shift: 'Morning (8:00 AM - 12:00 PM)', roles: ['Manager'], status: 'inactive' },
  { id: 4, name: 'Sok', email: 'sok@nis.edu', phone: '+855 12 345 681', salary: '-', shift: 'N/A', roles: ['Student'], status: 'active' },
  { id: 5, name: 'Mrs. Mey', email: 'mey@nis.edu', phone: '+855 12 345 682', salary: '-', shift: 'N/A', roles: ['Parent'], status: 'active' },
];

const shiftOptions = [
  'Morning (8:00 AM - 12:00 PM)',
  'Afternoon (1:00 PM - 5:00 PM)',
  'Evening (5:30 PM - 6:30 PM)',
  'Full Day (8:00 AM - 4:00 PM)',
  'N/A',
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    salary: '',
    shift: 'Morning (8:00 AM - 12:00 PM)',
    roles: [],
    status: 'active'
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                          user.email.toLowerCase().includes(search.toLowerCase()) ||
                          user.phone.includes(search);
    const matchesRole = roleFilter === 'All' || user.roles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  const openAddModal = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', phone: '', salary: '', shift: 'Morning (8:00 AM - 12:00 PM)', roles: [], status: 'active' });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      salary: user.salary,
      shift: user.shift,
      roles: [...user.roles],
      status: user.status,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...form } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const deleteSelected = () => {
    if (selectedUsers.length === 0) return;
    if (window.confirm('Delete selected users?')) {
      setUsers(users.filter(u => !selectedUsers.includes(u.id)));
      setSelectedUsers([]);
    }
  };

  const toggleRoleInForm = (role) => {
    setForm(prev => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter(r => r !== role) : [...prev.roles, role],
    }));
  };

  const getBadgeClass = (role) => {
    if (role.includes('Teacher')) return 'bg-blue-100 text-blue-700';
    if (role.includes('Dept')) return 'bg-purple-100 text-purple-700';
    if (role === 'Manager') return 'bg-yellow-100 text-yellow-700';
    if (role.includes('Finance')) return 'bg-green-100 text-green-700';
    if (role.includes('HR')) return 'bg-pink-100 text-pink-700';
    if (role === 'Student') return 'bg-indigo-100 text-indigo-700';
    if (role === 'Parent') return 'bg-teal-100 text-teal-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">User Management</h1>
        <button onClick={openAddModal} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">+ Add User</button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input type="text" placeholder="Search by name, email or phone..." className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          {allRoles.map(role => <option key={role} value={role}>{role}</option>)}
        </select>
        {selectedUsers.length > 0 && (
          <button onClick={deleteSelected} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete Selected ({selectedUsers.length})</button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="px-4 py-3 text-left"><input type="checkbox" onChange={(e) => { if (e.target.checked) setSelectedUsers(filteredUsers.map(u => u.id)); else setSelectedUsers([]); }} checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} /></th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Salary</th>
              <th className="px-4 py-3 text-left">Working Shift</th>
              <th className="px-4 py-3 text-left">Roles</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3"><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => setSelectedUsers(prev => prev.includes(user.id) ? prev.filter(id => id !== user.id) : [...prev, user.id])} /></td>
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-gray-500">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3 font-mono">{user.salary}</td>
                <td className="px-4 py-3 text-xs">{user.shift}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map(role => <span key={role} className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(role)}`}>{role}</span>)}
                  </div>
                </td>
                <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status}</span></td>
                <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => openEditModal(user)} className="text-blue-900 hover:underline">Edit</button><button onClick={() => toggleStatus(user.id)} className="text-orange-500 hover:underline">{user.status === 'active' ? 'Deactivate' : 'Activate'}</button></div></td>
              </tr>
            ))}
            {filteredUsers.length === 0 && <tr><td colSpan={9} className="text-center py-6 text-gray-400">No users found.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">{editingUser ? 'Edit User' : 'Add User'}</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Salary</label><input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g., $1,800" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Working Shift</label><select className="w-full border border-gray-300 rounded-lg px-4 py-2" value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })}>{shiftOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Roles</label><div className="grid grid-cols-2 gap-2">{allRoles.map(role => (<label key={role} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.roles.includes(role)} onChange={() => toggleRoleInForm(role)} className="rounded text-blue-900 focus:ring-blue-900" />{role}</label>))}</div></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select className="w-full border border-gray-300 rounded-lg px-4 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
            </div>
            <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button><button onClick={handleSave} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">{editingUser ? 'Save Changes' : 'Add User'}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}