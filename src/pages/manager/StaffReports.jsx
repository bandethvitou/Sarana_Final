// src/pages/manager/StaffReports.jsx
import { useState } from 'react';

// Mock data – staff reports
const initialReports = [
  { id: 1, staff: 'Mr. Budi', title: 'Monthly Inventory Report', type: 'Completion', priority: 'medium', date: '2025-06-05', status: 'pending', content: 'All inventory items have been counted and recorded. No discrepancies found.' },
  { id: 2, staff: 'Ms. Siti', title: 'Admission Progress Update', type: 'Progress', priority: 'high', date: '2025-06-08', status: 'pending', content: 'New admissions for June have reached 35 students. Target is 50.' },
  { id: 3, staff: 'Mr. John', title: 'Classroom Issue Report', type: 'Issue', priority: 'high', date: '2025-06-10', status: 'pending', content: 'Projector in Room 101 is not working. Requesting replacement.' },
  { id: 4, staff: 'Ms. Anna', title: 'Staff Attendance Summary', type: 'Completion', priority: 'low', date: '2025-06-12', status: 'approved', content: 'All staff attendance records have been submitted.' },
  { id: 5, staff: 'Mr. Rudi', title: 'Budget Update', type: 'Progress', priority: 'medium', date: '2025-06-09', status: 'revision_requested', content: 'Q2 budget variance report.' },
];

export default function StaffReports() {
  const [reports, setReports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [reviewModal, setReviewModal] = useState(null);
  const [reviewComment, setReviewComment] = useState('');

  const filteredReports = reports.filter(r => filterType === 'all' ? true : r.type === filterType);

  const handleApprove = (id) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setReviewModal(null);
    setReviewComment('');
  };

  const handleRequestRevision = (id) => {
    if (!reviewComment.trim()) {
      alert('Please enter a comment for revision.');
      return;
    }
    setReports(reports.map(r => r.id === id ? { ...r, status: 'revision_requested', reviewComment } : r));
    setReviewModal(null);
    setReviewComment('');
  };

  const handleEscalate = (id) => {
    if (!reviewComment.trim()) {
      alert('Please enter a reason for escalation.');
      return;
    }
    setReports(reports.map(r => r.id === id ? { ...r, status: 'escalated', reviewComment } : r));
    setReviewModal(null);
    setReviewComment('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>;
      case 'revision_requested': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Revision</span>;
      case 'escalated': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Escalated</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">High</span>;
      case 'medium': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Medium</span>;
      case 'low': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span>;
      default: return null;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Issue': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Issue</span>;
      case 'Progress': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Progress</span>;
      case 'Completion': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Completion</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{type}</span>;
    }
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Staff Reports</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-500">Pending Reports</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{reports.filter(r => r.status === 'approved').length}</div>
          <div className="text-sm text-gray-500">Approved</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{reports.filter(r => r.status === 'escalated' || r.status === 'revision_requested').length}</div>
          <div className="text-sm text-gray-500">Needs Action</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${filterType === 'all' ? 'bg-blue-900 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType('Progress')}
          className={`px-4 py-2 rounded-lg transition-colors ${filterType === 'Progress' ? 'bg-blue-900 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          Progress
        </button>
        <button
          onClick={() => setFilterType('Issue')}
          className={`px-4 py-2 rounded-lg transition-colors ${filterType === 'Issue' ? 'bg-blue-900 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          Issue
        </button>
        <button
          onClick={() => setFilterType('Completion')}
          className={`px-4 py-2 rounded-lg transition-colors ${filterType === 'Completion' ? 'bg-blue-900 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          Completion
        </button>
      </div>

      {/* Staff Reports Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Staff</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{r.staff}</td>
                <td className="px-4 py-3">{r.title}</td>
                <td className="px-4 py-3">{getTypeBadge(r.type)}</td>
                <td className="px-4 py-3">{getPriorityBadge(r.priority)}</td>
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{getStatusBadge(r.status)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedReport(r)}
                    className="text-orange-500 hover:underline text-sm font-medium"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-gray-400">No staff reports found</div>
        )}
      </div>

      {/* View Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Report Details</h2>
            <div className="space-y-2">
              <p><strong>Staff:</strong> {selectedReport.staff}</p>
              <p><strong>Title:</strong> {selectedReport.title}</p>
              <p><strong>Type:</strong> {selectedReport.type}</p>
              <p><strong>Priority:</strong> {selectedReport.priority}</p>
              <p><strong>Date:</strong> {selectedReport.date}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedReport.status)}</p>
              <p className="mt-2"><strong>Content:</strong></p>
              <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200 max-h-40 overflow-y-auto">
                {selectedReport.content}
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              {selectedReport.status === 'pending' && (
                <>
                  <button
                    onClick={() => setReviewModal({ ...selectedReport, action: 'approve' })}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setReviewModal({ ...selectedReport, action: 'revision' })}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Request Revision
                  </button>
                  <button
                    onClick={() => setReviewModal({ ...selectedReport, action: 'escalate' })}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Escalate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Action Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              {reviewModal.action === 'approve' ? 'Confirm Approval' : 
               reviewModal.action === 'revision' ? 'Request Revision' : 
               'Escalate to Top Manager'}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Report:</strong> {reviewModal.title}<br />
              <strong>Staff:</strong> {reviewModal.staff}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {reviewModal.action === 'approve' ? 'Approval Note (optional)' :
                 reviewModal.action === 'revision' ? 'Revision Request (required)' :
                 'Escalation Reason (required)'}
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                rows="3"
                placeholder={reviewModal.action === 'approve' ? 'Add a note...' : 
                           reviewModal.action === 'revision' ? 'What needs to be revised?' : 
                           'Why are you escalating this?'}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setReviewModal(null);
                  setReviewComment('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (reviewModal.action === 'approve') handleApprove(reviewModal.id);
                  else if (reviewModal.action === 'revision') handleRequestRevision(reviewModal.id);
                  else handleEscalate(reviewModal.id);
                }}
                className={`px-4 py-2 text-white rounded-lg ${
                  reviewModal.action === 'approve' ? 'bg-green-500 hover:bg-green-600' :
                  reviewModal.action === 'revision' ? 'bg-orange-500 hover:bg-orange-600' :
                  'bg-red-500 hover:bg-red-600'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}