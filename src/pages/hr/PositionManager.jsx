import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialStaff = [
  { id: 1, name: 'Mr. John', positions: ['Teacher', 'Dept Head'] },
  { id: 2, name: 'Ms. Anna', positions: ['Finance Admin'] },
  { id: 3, name: 'Mr. Rudi', positions: ['Manager'] },
  { id: 4, name: 'Mrs. Linda', positions: ['Teacher'] },
  { id: 5, name: 'Ms. Siti', positions: ['HR Admin'] },
];

const allPositions = ['Teacher', 'Dept Head', 'Manager', 'Finance Admin', 'HR Admin', 'Staff', 'Event Coordinator'];

const historyLog = [
  { id: 1, date: '2025-06-18', staff: 'Mr. John', action: 'Promoted', positions: 'Dept Head', changedBy: 'HR Admin' },
  { id: 2, date: '2025-06-15', staff: 'Ms. Anna', action: 'Demoted', positions: 'Finance Admin', changedBy: 'HR Admin' },
];

export default function PositionManager() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(initialStaff);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [activeTab, setActiveTab] = useState('promote');
  const [promotePositions, setPromotePositions] = useState([]);
  const [demotePositions, setDemotePositions] = useState([]);
  const [tempEndDate, setTempEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState(historyLog);

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedStaff = staff.find(s => s.id === selectedStaffId);

  const handlePromote = () => {
    if (!selectedStaff || promotePositions.length === 0) return;
    setStaff(prev => prev.map(s => {
      if (s.id === selectedStaffId) {
        const newPositions = [...new Set([...s.positions, ...promotePositions])];
        return { ...s, positions: newPositions };
      }
      return s;
    }));
    setHistory(prev => [...prev, {
      id: Date.now(),
      date: new Date().toISOString().slice(0,10),
      staff: selectedStaff.name,
      action: 'Promoted',
      positions: promotePositions.join(', '),
      changedBy: 'HR Admin',
    }]);
    setPromotePositions([]);
    setTempEndDate('');
  };

  const handleDemote = () => {
    if (!selectedStaff || demotePositions.length === 0) return;
    setStaff(prev => prev.map(s => {
      if (s.id === selectedStaffId) {
        const newPositions = s.positions.filter(p => !demotePositions.includes(p));
        return { ...s, positions: newPositions };
      }
      return s;
    }));
    setHistory(prev => [...prev, {
      id: Date.now(),
      date: new Date().toISOString().slice(0,10),
      staff: selectedStaff.name,
      action: 'Demoted',
      positions: demotePositions.join(', '),
      changedBy: 'HR Admin',
    }]);
    setDemotePositions([]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🔄 Position Manager</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button className={`px-4 py-2 font-medium ${activeTab === 'promote' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`} onClick={() => setActiveTab('promote')}>⬆️ Promote</button>
        <button className={`px-4 py-2 font-medium ${activeTab === 'demote' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`} onClick={() => setActiveTab('demote')}>⬇️ Demote</button>
        <button className={`px-4 py-2 font-medium ${activeTab === 'history' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`} onClick={() => setActiveTab('history')}>📜 History</button>
      </div>

      {/* Search */}
      {activeTab !== 'history' && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search staff..."
            className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Promote Tab */}
      {activeTab === 'promote' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold mb-3">Select Staff</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStaff.map(s => (
                <div
                  key={s.id}
                  className={`p-2 border rounded cursor-pointer ${selectedStaffId === s.id ? 'bg-blue-900 text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedStaffId(s.id)}
                >
                  {s.name} - {s.positions.join(', ')}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold mb-3">Add Positions</h3>
            {selectedStaff ? (
              <>
                <p className="text-sm mb-2">Current: <strong>{selectedStaff.positions.join(', ') || 'None'}</strong></p>
                <div className="space-y-2 mb-4">
                  {allPositions.filter(p => !selectedStaff.positions.includes(p)).map(p => (
                    <label key={p} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={promotePositions.includes(p)}
                        onChange={() => setPromotePositions(prev =>
                          prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
                        )}
                      />
                      {p}
                    </label>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Temporary End Date</label>
                  <input
                    type="date"
                    className="border rounded-lg px-4 py-2 w-full"
                    value={tempEndDate}
                    onChange={(e) => setTempEndDate(e.target.value)}
                  />
                </div>
                <button onClick={handlePromote} disabled={promotePositions.length === 0} className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50">Promote</button>
              </>
            ) : <p className="text-gray-500">Select a staff member</p>}
          </div>
        </div>
      )}

      {/* Demote Tab */}
      {activeTab === 'demote' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold mb-3">Select Staff</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStaff.map(s => (
                <div
                  key={s.id}
                  className={`p-2 border rounded cursor-pointer ${selectedStaffId === s.id ? 'bg-blue-900 text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedStaffId(s.id)}
                >
                  {s.name} - {s.positions.join(', ')}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold mb-3">Remove Positions</h3>
            {selectedStaff ? (
              <>
                <div className="space-y-2 mb-4">
                  {selectedStaff.positions.map(p => (
                    <label key={p} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={demotePositions.includes(p)}
                        onChange={() => setDemotePositions(prev =>
                          prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
                        )}
                      />
                      {p}
                    </label>
                  ))}
                </div>
                <button onClick={handleDemote} disabled={demotePositions.length === 0} className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50">Demote</button>
              </>
            ) : <p className="text-gray-500">Select a staff member</p>}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Staff</th>
                  <th className="px-4 py-2 text-left">Action</th>
                  <th className="px-4 py-2 text-left">Positions</th>
                  <th className="px-4 py-2 text-left">Changed By</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2 font-medium">{item.staff}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.action === 'Promoted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.action}</span>
                    </td>
                    <td className="px-4 py-2">{item.positions}</td>
                    <td className="px-4 py-2">{item.changedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}