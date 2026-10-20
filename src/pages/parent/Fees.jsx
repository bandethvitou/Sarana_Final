import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const children = [
  { id: 1, name: 'Sok' },
  { id: 2, name: 'Mey' },
];

const feeData = {
  'Sok': {
    fees: [
      { category: 'Tuition', amount: 500, due: '2025-06-01', paid: true, receipt: 'RCP-001' },
      { category: 'Transport', amount: 100, due: '2025-06-01', paid: true, receipt: 'RCP-002' },
      { category: 'Library', amount: 50, due: '2025-06-25', paid: false, receipt: null },
      { category: 'Lab Fee', amount: 30, due: '2025-06-01', paid: true, receipt: 'RCP-003' },
    ]
  },
  'Mey': {
    fees: [
      { category: 'Tuition', amount: 500, due: '2025-06-01', paid: true, receipt: 'RCP-004' },
      { category: 'Transport', amount: 100, due: '2025-06-01', paid: false, receipt: null },
      { category: 'Library', amount: 50, due: '2025-06-25', paid: false, receipt: null },
    ]
  }
};

export default function Fees() {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(children[0]);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const data = feeData[selectedChild.name];
  const totalPaid = data.fees.filter(f => f.paid).reduce((sum, f) => sum + f.amount, 0);
  const totalOutstanding = data.fees.filter(f => !f.paid).reduce((sum, f) => sum + f.amount, 0);

  const handlePayNow = (fee) => {
    setSelectedFee(fee);
    setShowPayModal(true);
  };

  const handleConfirmPayment = () => {
    toast.success('💰 Payment confirmed!');
    setShowPayModal(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">💰 Fees</h1>

      {/* Child Selector */}
      <div className="flex gap-3 mb-6">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChild.id === child.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {child.name}
          </button>
        ))}
      </div>

      {/* Fee Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">💳 Fee Status – {selectedChild.name}</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-2xl font-bold text-green-600">${totalPaid}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500">Outstanding</p>
            <p className="text-2xl font-bold text-red-600">${totalOutstanding}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-blue-900">${totalPaid + totalOutstanding}</p>
          </div>
        </div>
      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-center">Amount</th>
              <th className="px-4 py-3 text-center">Due Date</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Receipt</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.fees.map((fee, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{fee.category}</td>
                <td className="px-4 py-3 text-center">${fee.amount}</td>
                <td className="px-4 py-3 text-center">{fee.due}</td>
                <td className="px-4 py-3 text-center">
                  {fee.paid ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Paid</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">⚠️ Pending</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {fee.receipt ? (
                    <button className="text-blue-900 hover:underline text-sm">View</button>
                  ) : '-'}
                </td>
                <td className="px-4 py-3 text-center">
                  {!fee.paid && (
                    <button onClick={() => handlePayNow(fee)} className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600">
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pay Now Modal */}
      {showPayModal && selectedFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">💰 Pay Now</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 bg-gray-50" value={selectedFee.category} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 bg-gray-50" value={`$${selectedFee.amount}`} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>Online</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Enter transaction ID" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowPayModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleConfirmPayment} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Confirm Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
