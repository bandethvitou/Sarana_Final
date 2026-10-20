import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockMaintenance = [
  { id: 'M024', equipment: 'C002 - HP EliteBook 840', issue: 'Battery not charging', action: 'Replaced battery', date: '2025-06-19', technician: 'Mr. David', cost: 85, notes: 'Battery was swollen, replaced with new one' },
  { id: 'M023', equipment: 'P001 - Epson Projector', issue: 'No display', action: 'Bulb replacement', date: '2025-06-18', technician: 'External Vendor', cost: 120, notes: 'Projector bulb burnt out, replaced with new bulb' },
  { id: 'M022', equipment: 'S003 - Samsung SmartBoard', issue: 'Touch not responsive', action: 'Recalibrated', date: '2025-06-15', technician: 'Mr. David', cost: 0, notes: 'Touch screen recalibrated, working normally' },
  { id: 'M021', equipment: 'R002 - Cisco Router', issue: 'WiFi slow', action: 'Firmware update', date: '2025-06-10', technician: 'Mr. David', cost: 0, notes: 'Updated firmware to latest version, WiFi speed improved' },
];

const equipmentOptions = ['All', 'C002 - HP EliteBook 840', 'P001 - Epson Projector', 'S003 - Samsung SmartBoard', 'R002 - Cisco Router'];

export default function ITMaintenance() {
  const navigate = useNavigate();
  const [maintenance, setMaintenance] = useState(mockMaintenance);
  const [search, setSearch] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('All');
  const [showLogModal, setShowLogModal] = useState(false);
  const [form, setForm] = useState({
    equipment: '',
    issue: '',
    action: '',
    technician: 'Mr. David',
    date: new Date().toISOString().split('T')[0],
    cost: '',
    notes: '',
    statusAfter: 'ok',
  });

  const filteredMaintenance = maintenance.filter(m => {
    const matchSearch = m.equipment.toLowerCase().includes(search.toLowerCase()) || 
                        m.issue.toLowerCase().includes(search.toLowerCase()) ||
                        m.technician.toLowerCase().includes(search.toLowerCase());
    const matchEquipment = equipmentFilter === 'All' || m.equipment.includes(equipmentFilter);
    return matchSearch && matchEquipment;
  });

  const handleLogRepair = () => {
    if (!form.equipment || !form.issue || !form.action) return;
    const newMaintenance = {
      id: `M${String(maintenance.length + 1).padStart(3, '0')}`,
      ...form,
      cost: parseFloat(form.cost) || 0,
    };
    setMaintenance([newMaintenance, ...maintenance]);
    setShowLogModal(false);
    setForm({ equipment: '', issue: '', action: '', technician: 'Mr. David', date: new Date().toISOString().split('T')[0], cost: '', notes: '', statusAfter: 'ok' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🔧 Maintenance Log</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-900">
          <div className="text-2xl font-bold text-blue-900">{maintenance.length}</div>
          <div className="text-sm text-gray-500">Total Repairs</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">${maintenance.reduce((sum, m) => sum + m.cost, 0)}</div>
          <div className="text-sm text-gray-500">Total Cost</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div className="text-2xl font-bold text-orange-600">{maintenance.length}</div>
          <div className="text-sm text-gray-500">Repairs This Month</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Equipment</label>
            <select 
              className="border rounded-lg px-3 py-2 bg-white"
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
            >
              {equipmentOptions.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-gray-500 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search equipment or issue..."
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
          onClick={() => setShowLogModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Log New Repair
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Equipment</th>
              <th className="px-4 py-3 text-left">Issue</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Technician</th>
              <th className="px-4 py-3 text-left">Cost</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaintenance.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.id}</td>
                <td className="px-4 py-3">{item.equipment}</td>
                <td className="px-4 py-3">{item.issue}</td>
                <td className="px-4 py-3">{item.action}</td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">{item.technician}</td>
                <td className="px-4 py-3 font-medium">${item.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredMaintenance.length === 0 && (
          <div className="text-center py-8 text-gray-400">No maintenance records found</div>
        )}
      </div>

      {/* Log New Repair Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🔧 Log New Repair</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.equipment}
                  onChange={(e) => setForm({...form, equipment: e.target.value})}
                >
                  <option value="">Select Equipment</option>
                  <option value="C002 - HP EliteBook 840">C002 - HP EliteBook 840</option>
                  <option value="P001 - Epson Projector">P001 - Epson Projector</option>
                  <option value="S003 - Samsung SmartBoard">S003 - Samsung SmartBoard</option>
                  <option value="R002 - Cisco Router">R002 - Cisco Router</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Found</label>
                <input
                  type="text"
                  placeholder="e.g., Battery not charging"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.issue}
                  onChange={(e) => setForm({...form, issue: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action Taken</label>
                <input
                  type="text"
                  placeholder="e.g., Replaced battery"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.action}
                  onChange={(e) => setForm({...form, action: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technician</label>
                <input
                  type="text"
                  placeholder="e.g., Mr. David"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.technician}
                  onChange={(e) => setForm({...form, technician: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.date}
                  onChange={(e) => setForm({...form, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                <input
                  type="number"
                  placeholder="e.g., 85"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.cost}
                  onChange={(e) => setForm({...form, cost: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  rows="2"
                  placeholder="Additional notes..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.notes}
                  onChange={(e) => setForm({...form, notes: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">After Repair Status</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.statusAfter}
                  onChange={(e) => setForm({...form, statusAfter: e.target.value})}
                >
                  <option value="ok">✅ OK</option>
                  <option value="issue">🔧 Still Issue</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowLogModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogRepair}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Log Repair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}