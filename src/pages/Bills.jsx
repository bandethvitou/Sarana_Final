import { useState } from 'react';

const initialBills = [
  { id: 1, type: 'Electricity', amount: 450, dueDate: '2025-06-10', financeManager: 'Ms. Anna', status: 'Pending', attachment: '#' },
  { id: 2, type: 'Water', amount: 120, dueDate: '2025-06-08', financeManager: 'Ms. Anna', status: 'Pending', attachment: '#' },
  { id: 3, type: 'Maintenance', amount: 300, dueDate: '2025-06-05', financeManager: 'Mr. Rudi', status: 'Approved', attachment: '#' },
];

export default function Bills() {
  const [bills, setBills] = useState(initialBills);
  const [rejectReason, setRejectReason] = useState('');
  const [activeBillId, setActiveBillId] = useState(null);

  const handleApprove = (id) => {
    setBills(bills.map(b => b.id === id ? { ...b, status: 'Approved' } : b));
  };

  const handleReject = () => {
    if (!activeBillId || !rejectReason.trim()) return;
    setBills(bills.map(b => b.id === activeBillId ? { ...b, status: 'Rejected', reason: rejectReason } : b));
    setActiveBillId(null);
    setRejectReason('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Bill Approvals</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Finance Manager</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill.id} className="border-b">
                <td className="px-4 py-3">{bill.id}</td>
                <td className="px-4 py-3">{bill.type}</td>
                <td className="px-4 py-3">${bill.amount}</td>
                <td className="px-4 py-3">{bill.dueDate}</td>
                <td className="px-4 py-3">{bill.financeManager}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    bill.status === 'Approved' ? 'bg-green-100 text-green-700' : bill.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{bill.status}</span>
                </td>
                <td className="px-4 py-3">
                  {bill.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(bill.id)} className="text-green-600 hover:underline">Approve</button>
                      <button onClick={() => setActiveBillId(bill.id)} className="text-red-500 hover:underline">Reject</button>
                    </div>
                  )}
                  {bill.status !== 'Pending' && <span className="text-gray-400 text-xs">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeBillId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <h3 className="font-bold text-blue-900 mb-3">Reject Bill #{activeBillId}</h3>
            <textarea className="w-full border rounded-lg px-4 py-2" rows="3" placeholder="Reason for rejection..." value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setActiveBillId(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={handleReject} className="px-4 py-2 bg-red-500 text-white rounded-lg">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}