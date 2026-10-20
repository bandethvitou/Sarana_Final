import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialTickets = [
  { id: 24, issue: 'Projector not working – Room 12', category: 'Hardware', location: 'Room 12', reportedBy: 'Ms. Linda', date: '2025-06-20', priority: 'high', status: 'open', description: 'The projector in Room 12 is not turning on. Checked power cable, still no display.', assignedTo: 'Mr. David', notes: [] },
  { id: 23, issue: 'WiFi down in Building B', category: 'Network', location: 'Building B', reportedBy: 'Mr. Rudi', date: '2025-06-19', priority: 'high', status: 'in-progress', description: 'WiFi network is completely down in Building B. Students cannot access online resources.', assignedTo: 'Mr. David', notes: ['20 Jun 10:30 AM - Assigned to Mr. David', '20 Jun 11:00 AM - Investigating router issue'] },
  { id: 22, issue: 'Smart board calibration', category: 'Smart Board', location: 'Room 5', reportedBy: 'Mr. John', date: '2025-06-18', priority: 'medium', status: 'resolved', description: 'The smart board touch is not responding correctly. Needs recalibration.', assignedTo: 'Mr. David', notes: ['18 Jun 2:00 PM - Recalibrated successfully'] },
  { id: 21, issue: 'Printer jam – Office Room', category: 'Printer', location: 'Office Room', reportedBy: 'Ms. Siti', date: '2025-06-17', priority: 'low', status: 'resolved', description: 'The office printer has a paper jam. Already removed the paper but still shows error.', assignedTo: 'Mr. David', notes: ['17 Jun 3:00 PM - Reset printer, working normally'] },
  { id: 20, issue: 'Excel crashing on opening', category: 'Software', location: 'Office', reportedBy: 'Ms. Anna', date: '2025-06-16', priority: 'medium', status: 'open', description: 'Excel crashes every time I try to open a file.', assignedTo: 'Mr. David', notes: [] },
  { id: 19, issue: 'Router firmware update needed', category: 'Network', location: 'Server Room', reportedBy: 'Mr. David', date: '2025-06-15', priority: 'low', status: 'in-progress', description: 'Router firmware needs to be updated to latest version.', assignedTo: 'Mr. David', notes: ['15 Jun 4:00 PM - Scheduled for next week'] },
];

const categories = ['All', 'Hardware', 'Software', 'Network', 'Printer', 'Smart Board', 'Other'];
const priorities = ['All', 'high', 'medium', 'low'];
const statuses = ['All', 'open', 'in-progress', 'resolved', 'closed'];

export default function ITTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(null);
  const [form, setForm] = useState({
    issue: '',
    category: 'Hardware',
    priority: 'medium',
    location: '',
    reportedBy: '',
    description: '',
  });
  const [updateForm, setUpdateForm] = useState({
    status: '',
    assignedTo: '',
    note: '',
  });

  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.issue.toLowerCase().includes(search.toLowerCase()) || 
                        t.reportedBy.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'All' || t.category === categoryFilter;
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchSearch && matchCategory && matchPriority && matchStatus;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 High</span>;
      case 'medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Medium</span>;
      case 'low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">🟢 Low</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 Open</span>;
      case 'in-progress': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 In Progress</span>;
      case 'resolved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">🟢 Resolved</span>;
      case 'closed': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">⚪ Closed</span>;
      default: return null;
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Hardware': '💻',
      'Software': '📱',
      'Network': '🌐',
      'Printer': '🖨️',
      'Smart Board': '📺',
      'Other': '📦',
    };
    return icons[category] || '📦';
  };

  const handleCreateTicket = () => {
    if (!form.issue || !form.location || !form.reportedBy) return;
    const newTicket = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString().split('T')[0],
      status: 'open',
      assignedTo: 'Mr. David',
      notes: [`${new Date().toLocaleString()} - Ticket Created by ${form.reportedBy}`],
    };
    setTickets([newTicket, ...tickets]);
    setShowCreateModal(false);
    setForm({ issue: '', category: 'Hardware', priority: 'medium', location: '', reportedBy: '', description: '' });
  };

  const handleUpdateTicket = () => {
    if (!showDetailModal) return;
    const updated = tickets.map(t => {
      if (t.id === showDetailModal.id) {
        const newNotes = [...t.notes];
        if (updateForm.note) {
          newNotes.push(`${new Date().toLocaleString()} - ${updateForm.note}`);
        }
        return {
          ...t,
          status: updateForm.status || t.status,
          assignedTo: updateForm.assignedTo || t.assignedTo,
          notes: newNotes,
        };
      }
      return t;
    });
    setTickets(updated);
    setShowDetailModal({ ...showDetailModal, status: updateForm.status || showDetailModal.status });
    setUpdateForm({ status: '', assignedTo: '', note: '' });
  };

  const handleOpenDetail = (ticket) => {
    setShowDetailModal(ticket);
    setUpdateForm({
      status: ticket.status,
      assignedTo: ticket.assignedTo,
      note: '',
    });
  };

  const getCategoryCount = (category) => {
    if (category === 'All') return tickets.length;
    return tickets.filter(t => t.category === category).length;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🎫 Support Tickets</h1>

      {/* ===== TICKET SECTIONS / CATEGORIES ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        <div 
          className={`rounded-xl p-3 text-center border-2 cursor-pointer transition-all ${
            categoryFilter === 'All' ? 'bg-blue-900 text-white border-blue-900' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
          }`}
          onClick={() => setCategoryFilter('All')}
        >
          <div className="text-2xl">📊</div>
          <div className="text-xs font-medium">All</div>
          <div className="text-lg font-bold">{getCategoryCount('All')}</div>
        </div>
        <div 
          className={`rounded-xl p-3 text-center border-2 cursor-pointer transition-all ${
            categoryFilter === 'Hardware' ? 'bg-blue-900 text-white border-blue-900' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
          }`}
          onClick={() => setCategoryFilter('Hardware')}
        >
          <div className="text-2xl">💻</div>
          <div className="text-xs font-medium">Hardware</div>
          <div className="text-lg font-bold">{getCategoryCount('Hardware')}</div>
        </div>
        <div 
          className={`rounded-xl p-3 text-center border-2 cursor-pointer transition-all ${
            categoryFilter === 'Software' ? 'bg-green-900 text-white border-green-900' : 'bg-green-50 border-green-200 hover:bg-green-100'
          }`}
          onClick={() => setCategoryFilter('Software')}
        >
          <div className="text-2xl">📱</div>
          <div className="text-xs font-medium">Software</div>
          <div className="text-lg font-bold">{getCategoryCount('Software')}</div>
        </div>
        <div 
          className={`rounded-xl p-3 text-center border-2 cursor-pointer transition-all ${
            categoryFilter === 'Network' ? 'bg-purple-900 text-white border-purple-900' : 'bg-purple-50 border-purple-200 hover:bg-purple-100'
          }`}
          onClick={() => setCategoryFilter('Network')}
        >
          <div className="text-2xl">🌐</div>
          <div className="text-xs font-medium">Network</div>
          <div className="text-lg font-bold">{getCategoryCount('Network')}</div>
        </div>
        <div 
          className={`rounded-xl p-3 text-center border-2 cursor-pointer transition-all ${
            categoryFilter === 'Printer' ? 'bg-orange-900 text-white border-orange-900' : 'bg-orange-50 border-orange-200 hover:bg-orange-100'
          }`}
          onClick={() => setCategoryFilter('Printer')}
        >
          <div className="text-2xl">🖨️</div>
          <div className="text-xs font-medium">Printer</div>
          <div className="text-lg font-bold">{getCategoryCount('Printer')}</div>
        </div>
        <div 
          className={`rounded-xl p-3 text-center border-2 cursor-pointer transition-all ${
            categoryFilter === 'Smart Board' ? 'bg-pink-900 text-white border-pink-900' : 'bg-pink-50 border-pink-200 hover:bg-pink-100'
          }`}
          onClick={() => setCategoryFilter('Smart Board')}
        >
          <div className="text-2xl">📺</div>
          <div className="text-xs font-medium">Smart Board</div>
          <div className="text-lg font-bold">{getCategoryCount('Smart Board')}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Priority</label>
            <select 
              className="border rounded-lg px-3 py-2 bg-white"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              {priorities.map(p => <option key={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Status</label>
            <select 
              className="border rounded-lg px-3 py-2 bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(s => <option key={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-gray-500 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search issue or reporter..."
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
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Create New Ticket
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Issue</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Reported By</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">#{ticket.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <span className="text-gray-800">{ticket.issue}</span>
                    <div className="text-xs text-gray-400">{ticket.location}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">{getCategoryIcon(ticket.category)} {ticket.category}</span>
                </td>
                <td className="px-4 py-3">{ticket.reportedBy}</td>
                <td className="px-4 py-3">{ticket.date}</td>
                <td className="px-4 py-3">{getPriorityBadge(ticket.priority)}</td>
                <td className="px-4 py-3">{getStatusBadge(ticket.status)}</td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => handleOpenDetail(ticket)}
                    className="text-orange-500 hover:underline text-sm font-medium"
                  >
                    {ticket.status === 'open' || ticket.status === 'in-progress' ? 'Update' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTickets.length === 0 && (
          <div className="text-center py-8 text-gray-400">No tickets found</div>
        )}
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🎫 Create New Ticket</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
                <input
                  type="text"
                  placeholder="e.g., Projector not working"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.issue}
                  onChange={(e) => setForm({...form, issue: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.category}
                  onChange={(e) => setForm({...form, category: e.target.value})}
                >
                  {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.priority}
                  onChange={(e) => setForm({...form, priority: e.target.value})}
                >
                  <option value="high">🔴 High (Critical)</option>
                  <option value="medium">🟡 Medium (Normal)</option>
                  <option value="low">🟢 Low (Minor)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Room 12"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.location}
                  onChange={(e) => setForm({...form, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                <input
                  type="text"
                  placeholder="e.g., Ms. Linda"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.reportedBy}
                  onChange={(e) => setForm({...form, reportedBy: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Detailed description of the issue..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateTicket}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              🎫 Ticket #{showDetailModal.id} – {showDetailModal.issue}
            </h2>
            
            <div className="space-y-2 text-sm bg-gray-50 rounded-lg p-4 mb-4">
              <p><strong>Status:</strong> {getStatusBadge(showDetailModal.status)}</p>
              <p><strong>Priority:</strong> {getPriorityBadge(showDetailModal.priority)}</p>
              <p><strong>Category:</strong> {getCategoryIcon(showDetailModal.category)} {showDetailModal.category}</p>
              <p><strong>Reported By:</strong> {showDetailModal.reportedBy} ({showDetailModal.date})</p>
              <p><strong>Location:</strong> {showDetailModal.location}</p>
              <p><strong>Description:</strong> {showDetailModal.description}</p>
            </div>

            {showDetailModal.notes && showDetailModal.notes.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-blue-900 text-sm mb-2">📋 Ticket History</h4>
                <div className="space-y-1 text-xs bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                  {showDetailModal.notes.map((note, idx) => (
                    <div key={idx} className="border-b last:border-0 py-1 text-gray-600">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-semibold text-blue-900 text-sm mb-3">Update Ticket</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                    value={updateForm.status || showDetailModal.status}
                    onChange={(e) => setUpdateForm({...updateForm, status: e.target.value})}
                  >
                    <option value="open">🔴 Open</option>
                    <option value="in-progress">🟡 In Progress</option>
                    <option value="resolved">🟢 Resolved</option>
                    <option value="closed">⚪ Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Add Note</label>
                  <textarea
                    rows="2"
                    placeholder="e.g., Checked projector – bulb needs replacement"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                    value={updateForm.note}
                    onChange={(e) => setUpdateForm({...updateForm, note: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowDetailModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateTicket}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Update Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}