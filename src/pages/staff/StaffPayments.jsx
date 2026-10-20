import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockPayments = [
  { id: 1, month: 'June 2025', amount: 1200, status: 'paid', date: '2025-06-01', description: 'Monthly salary' },
  { id: 2, month: 'May 2025', amount: 1200, status: 'paid', date: '2025-05-01', description: 'Monthly salary' },
  { id: 3, month: 'April 2025', amount: 1200, status: 'paid', date: '2025-04-01', description: 'Monthly salary' },
  { id: 4, month: 'March 2025', amount: 1200, status: 'paid', date: '2025-03-01', description: 'Monthly salary' },
  { id: 5, month: 'February 2025', amount: 1200, status: 'paid', date: '2025-02-01', description: 'Monthly salary' },
  { id: 6, month: 'January 2025', amount: 1200, status: 'paid', date: '2025-01-01', description: 'Monthly salary' },
];

const mockUpcomingPayment = {
  month: 'July 2025',
  amount: 1200,
  expectedDate: '2025-07-01',
};

export default function StaffPayments() {
  const navigate = useNavigate();
  const [payments] = useState(mockPayments);
  const [filterYear, setFilterYear] = useState('2025');

  const filteredPayments = payments.filter(p => p.month.includes(filterYear));

  const totalEarned = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">💰 Payments</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-900">
          <div className="text-sm text-gray-500">Total Earned</div>
          <div className="text-3xl font-bold text-blue-900">${totalEarned.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-1">January - June 2025</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-500">
          <div className="text-sm text-gray-500">Next Payment</div>
          <div className="text-3xl font-bold text-green-600">${mockUpcomingPayment.amount}</div>
          <div className="text-xs text-gray-400 mt-1">{mockUpcomingPayment.month} · {mockUpcomingPayment.expectedDate}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-orange-500">
          <div className="text-sm text-gray-500">Status</div>
          <div className="text-2xl font-bold text-green-600">✅ Paid</div>
          <div className="text-xs text-gray-400 mt-1">Last payment: 1 June 2025</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-6">
        <select 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{payment.month}</td>
                <td className="px-4 py-3 font-bold text-blue-900">${payment.amount}</td>
                <td className="px-4 py-3">{payment.date}</td>
                <td className="px-4 py-3">{payment.description}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    ✅ Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPayments.length === 0 && (
          <div className="text-center py-8 text-gray-400">No payment records found</div>
        )}
      </div>
    </div>
  );
}