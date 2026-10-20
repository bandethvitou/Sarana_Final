import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialReviews = [
  { id: 1, manager: 'Mr. John', title: 'Q2 Progress Update', type: 'Progress', date: '2025-06-10', priority: 'High', status: 'pending' },
  { id: 2, manager: 'Ms. Anna', title: 'Budget Request', type: 'Proposal', date: '2025-06-08', priority: 'Medium', status: 'pending' },
  { id: 3, manager: 'Mr. Rudi', title: 'Staff Performance Review', type: 'Completion', date: '2025-06-12', priority: 'Low', status: 'pending' },
  { id: 4, manager: 'Mrs. Linda', title: 'Academic Year Plan', type: 'Proposal', date: '2025-06-14', priority: 'High', status: 'approved' },
];

export default function PendingReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState('pending');
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const navigate = useNavigate();

  const filteredReviews = reviews.filter(r => filter === 'all' ? true : r.status === filter);

  const handleApprove = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setSelectedReview(null);
    setReviewComment('');
  };

  const handleEscalate = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'escalated' } : r));
    setSelectedReview(null);
    setReviewComment('');
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">High</span>;
      case 'Medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>;
      case 'escalated': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Escalated</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📋 Pending Reviews</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-500">Pending Reviews</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{reviews.filter(r => r.status === 'approved').length}</div>
          <div className="text-sm text-gray-500">Approved</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{reviews.filter(r => r.status === 'escalated').length}</div>
          <div className="text-sm text-gray-500">Escalated</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>Pending</button>
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>All</button>
        <button onClick={() => setFilter('approved')} className={`px-4 py-2 rounded-lg ${filter === 'approved' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>Approved</button>
        <button onClick={() => setFilter('escalated')} className={`px-4 py-2 rounded-lg ${filter === 'escalated' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>Escalated</button>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Manager</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{r.manager}</td>
                <td className="px-4 py-3">{r.title}</td>
                <td className="px-4 py-3">{r.type}</td>
                <td className="px-4 py-3">{getPriorityBadge(r.priority)}</td>
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{getStatusBadge(r.status)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setSelectedReview(r)} className="text-orange-500 hover:underline text-sm font-medium">
                    {r.status === 'pending' ? 'Review' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReviews.length === 0 && (
          <div className="text-center py-8 text-gray-400">No reviews found</div>
        )}
      </div>

      {/* Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Review Details</h2>
            <div className="space-y-2">
              <p><strong>Manager:</strong> {selectedReview.manager}</p>
              <p><strong>Title:</strong> {selectedReview.title}</p>
              <p><strong>Type:</strong> {selectedReview.type}</p>
              <p><strong>Priority:</strong> {selectedReview.priority}</p>
              <p><strong>Date:</strong> {selectedReview.date}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedReview.status)}</p>
              {selectedReview.status === 'pending' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comment (optional)</label>
                  <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" rows="3" placeholder="Add your feedback..." value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} />
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setSelectedReview(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</button>
              {selectedReview.status === 'pending' && (
                <>
                  <button onClick={() => handleApprove(selectedReview.id)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Approve</button>
                  <button onClick={() => handleEscalate(selectedReview.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Escalate to Director</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}