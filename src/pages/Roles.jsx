// src/pages/Roles.jsx
import { useState } from 'react';

// Expanded staff list with all details
const initialStaff = [
  { 
    id: 1, name: 'Mr. John', email: 'john@nis.edu', phone: '+855 12 345 678', 
    salary: '$1,800', shift: 'Morning (8:00 AM - 12:00 PM)', 
    currentPositions: ['Teacher', 'Dept Head'] 
  },
  { 
    id: 2, name: 'Ms. Anna', email: 'anna@nis.edu', phone: '+855 12 345 679', 
    salary: '$2,200', shift: 'Full Day (8:00 AM - 4:00 PM)', 
    currentPositions: ['Finance Admin', 'HR Admin', 'Teacher'] 
  },
  { 
    id: 3, name: 'Mr. Rudi', email: 'rudi@nis.edu', phone: '+855 12 345 680', 
    salary: '$2,500', shift: 'Morning (8:00 AM - 12:00 PM)', 
    currentPositions: ['Manager'] 
  },
  { 
    id: 4, name: 'Ms. Siti', email: 'siti@nis.edu', phone: '+855 12 345 681', 
    salary: '$1,200', shift: 'Afternoon (1:00 PM - 5:00 PM)', 
    currentPositions: ['Staff'] 
  },
  { 
    id: 5, name: 'Mr. Budi', email: 'budi@nis.edu', phone: '+855 12 345 682', 
    salary: '$1,200', shift: 'Evening (5:30 PM - 6:30 PM)', 
    currentPositions: ['Staff'] 
  },
  { 
    id: 6, name: 'Mrs. Linda', email: 'linda@nis.edu', phone: '+855 12 345 683', 
    salary: '$1,600', shift: 'Morning (8:00 AM - 12:00 PM)', 
    currentPositions: ['Teacher'] 
  },
];

const allPositions = ['Teacher', 'Dept Head', 'Manager', 'Finance Admin', 'HR Admin', 'Staff', 'Event Coordinator'];

export default function Roles() {
  const [staff, setStaff] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('view');
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [promotePositions, setPromotePositions] = useState([]);
  const [tempEndDate, setTempEndDate] = useState('');
  const [demotePositions, setDemotePositions] = useState([]);
  const [history, setHistory] = useState([]);

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm)
  );

  const handleManageClick = (staffId) => {
    setSelectedStaffId(staffId);
    setPromotePositions([]);
    setDemotePositions([]);
    setTempEndDate('');
    setActiveTab('promote');
  };

  const handlePromote = () => {
    if (!selectedStaffId || promotePositions.length === 0) return;
    setStaff(prev => prev.map(s => {
      if (s.id === selectedStaffId) {
        const newPositions = [...new Set([...s.currentPositions, ...promotePositions])];
        return { ...s, currentPositions: newPositions };
      }
      return s;
    }));
    setHistory(prev => [...prev, {
      staffId: selectedStaffId,
      staffName: staff.find(s => s.id === selectedStaffId)?.name,
      action: 'promoted',
      positions: promotePositions,
      date: new Date().toLocaleString()
    }]);
    setPromotePositions([]);
    setTempEndDate('');
  };

  const handleDemote = () => {
    if (!selectedStaffId || demotePositions.length === 0) return;
    setStaff(prev => prev.map(s => {
      if (s.id === selectedStaffId) {
        return {
          ...s,
          currentPositions: s.currentPositions.filter(p => !demotePositions.includes(p))
        };
      }
      return s;
    }));
    setHistory(prev => [...prev, {
      staffId: selectedStaffId,
      staffName: staff.find(s => s.id === selectedStaffId)?.name,
      action: 'demoted',
      positions: demotePositions,
      date: new Date().toLocaleString()
    }]);
    setDemotePositions([]);
  };

  const selectedStaff = staff.find(s => s.id === selectedStaffId);

  const getBadgeClass = (role) => {
    if (role.includes('Teacher')) return 'bg-blue-100 text-blue-700';
    if (role.includes('Dept')) return 'bg-purple-100 text-purple-700';
    if (role.includes('Event')) return 'bg-orange-100 text-orange-700';
    if (role.includes('Finance')) return 'bg-green-100 text-green-700';
    if (role.includes('HR')) return 'bg-pink-100 text-pink-700';
    if (role === 'Manager') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Role Manager</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button className={`px-4 py-2 font-medium ${activeTab === 'view' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`} onClick={() => setActiveTab('view')}>👥 View All Staff</button>
        <button className={`px-4 py-2 font-medium ${activeTab === 'promote' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`} onClick={() => setActiveTab('promote')}>⬆️ Promote</button>
        <button className={`px-4 py-2 font-medium ${activeTab === 'demote' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`} onClick={() => setActiveTab('demote')}>⬇️ Demote</button>
        <button className={`px-4 py-2 font-medium ${activeTab === 'history' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`} onClick={() => setActiveTab('history')}>📜 History</button>
      </div>

      {/* Tab 1: View All Staff with all details */}
      {activeTab === 'view' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Salary</th>
                  <th className="px-4 py-3 text-left">Working Shift</th>
                  <th className="px-4 py-3 text-left">Positions</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{s.id}</td>
                    <td className="px-4 py-3 font-medium">{s.name}</td>
                    <td className="px-4 py-3 text-gray-500">{s.email}</td>
                    <td className="px-4 py-3">{s.phone}</td>
                    <td className="px-4 py-3 font-mono">{s.salary}</td>
                    <td className="px-4 py-3 text-xs">{s.shift}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.currentPositions.map(role => (
                          <span key={role} className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(role)}`}>
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleManageClick(s.id)} className="text-blue-900 text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Total Staff: {filteredStaff.length} &nbsp;|&nbsp; Multi-Role Staff: {filteredStaff.filter(s => s.currentPositions.length > 1).length}
          </div>
        </div>
      )}

      {/* Tab 2: Promote (unchanged but uses selectedStaffId) */}
      {activeTab === 'promote' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Staff</label>
              <select className="border rounded-lg px-4 py-2 w-64" value={selectedStaffId || ''} onChange={(e) => setSelectedStaffId(Number(e.target.value))}>
                <option value="">-- Choose staff --</option>
                {staff.map(s => <option key={s.id} value={s.id}>{s.name} ({s.currentPositions.join(', ')})</option>)}
              </select>
            </div>
            {selectedStaff && (
              <>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Add Positions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {allPositions.map(pos => (
                      <label key={pos} className="flex items-center gap-2">
                        <input type="checkbox" checked={promotePositions.includes(pos)} onChange={() => setPromotePositions(prev => prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos])} disabled={selectedStaff.currentPositions.includes(pos)} />
                        {pos} {selectedStaff.currentPositions.includes(pos) && <span className="text-xs text-gray-400">(already has)</span>}
                      </label>
                    ))}
                  </div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Temporary end date (optional)</label><input type="date" className="border rounded-lg px-4 py-2" value={tempEndDate} onChange={(e) => setTempEndDate(e.target.value)} /></div>
                <button onClick={handlePromote} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Promote</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Demote (unchanged) */}
      {activeTab === 'demote' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Select Staff</label>
              <select className="border rounded-lg px-4 py-2 w-64" value={selectedStaffId || ''} onChange={(e) => setSelectedStaffId(Number(e.target.value))}>
                <option value="">-- Choose staff --</option>
                {staff.map(s => <option key={s.id} value={s.id}>{s.name} ({s.currentPositions.join(', ')})</option>)}
              </select>
            </div>
            {selectedStaff && (
              <>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Current Positions (check to remove)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedStaff.currentPositions.map(pos => (
                      <label key={pos} className="flex items-center gap-2">
                        <input type="checkbox" checked={demotePositions.includes(pos)} onChange={() => setDemotePositions(prev => prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos])} />
                        {pos}
                      </label>
                    ))}
                  </div>
                </div>
                <button onClick={handleDemote} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Demote Selected</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: History (unchanged) */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Position Change History</h2>
          {history.length === 0 ? <p className="text-gray-400 text-sm">No changes recorded yet.</p> : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b"><tr><th className="px-4 py-2 text-left">Date</th><th className="px-4 py-2 text-left">Staff</th><th className="px-4 py-2 text-left">Action</th><th className="px-4 py-2 text-left">Positions</th></tr></thead>
              <tbody>
                {history.map((entry, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2">{entry.date}</td>
                    <td className="px-4 py-2 font-medium">{entry.staffName}</td>
                    <td className="px-4 py-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${entry.action === 'promoted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{entry.action}</span></td>
                    <td className="px-4 py-2">{entry.positions.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}