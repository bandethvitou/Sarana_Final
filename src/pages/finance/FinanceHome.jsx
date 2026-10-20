import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODAY'S MOCK DATA (Real-time)
const todayKPIs = {
  todayIncome: 2500,
  currentOutstanding: 3200,
  newDefaultersToday: 2,
  billsDueToday: 3,
  todayExpenses: 450,
};

const todayPayments = [
  { id: 1, student: 'Sok Heng', amount: 500, type: 'Tuition', time: '10:30 AM', status: 'verified' },
  { id: 2, student: 'Mey Lin', amount: 350, type: 'Tuition', time: '09:15 AM', status: 'verified' },
  { id: 3, student: 'David', amount: 200, type: 'Transport', time: '08:45 AM', status: 'pending' },
  { id: 4, student: 'Lina', amount: 150, type: 'Library', time: '08:00 AM', status: 'verified' },
  { id: 5, student: 'Channy', amount: 100, type: 'Activity', time: '07:30 AM', status: 'verified' },
];

const billsDueToday = [
  { id: 1, type: 'Electricity', amount: 450, requestedBy: 'Mr. Rudi', status: 'pending' },
  { id: 2, type: 'Water', amount: 120, requestedBy: 'Ms. Siti', status: 'pending' },
  { id: 3, type: 'Maintenance', amount: 300, requestedBy: 'Mr. Budi', status: 'pending' },
];

const topDefaulters = [
  { id: 1, name: 'Sok Heng', class: 'Grade 10', amount: 500, days: 60 },
  { id: 2, name: 'Mey Lin', class: 'Grade 8', amount: 350, days: 45 },
  { id: 3, name: 'David', class: 'Grade 12', amount: 200, days: 30 },
  { id: 4, name: 'Lina', class: 'Grade 7', amount: 150, days: 25 },
  { id: 5, name: 'Channy', class: 'Grade 9', amount: 100, days: 15 },
];

export default function FinanceHome() {
  const navigate = useNavigate();
  const [kpis] = useState(todayKPIs);
  const [payments] = useState(todayPayments);
  const [bills] = useState(billsDueToday);
  const [defaulters] = useState(topDefaulters);

  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalBills = bills.reduce((sum, b) => sum + b.amount, 0);

  const getDaysBadge = (days) => {
    if (days > 30) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 {days} days</span>;
    if (days > 15) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">🟠 {days} days</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 {days} days</span>;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">🏠 Finance Home</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Ms. Anna! • {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">TODAY'S DATA</span>
      </div>

      {/* KPI Cards – TODAY'S DATA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <span className="text-2xl">💰</span>
            <span className="text-xs text-green-600">↑ 5 paid today</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-blue-900">${kpis.todayIncome}</div>
            <div className="text-sm text-gray-500">Today's Income</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <span className="text-2xl">⚠️</span>
            <span className="text-xs text-yellow-600">12 total</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-blue-900">${kpis.currentOutstanding}</div>
            <div className="text-sm text-gray-500">Current Outstanding</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-red-500">
          <div className="flex items-center justify-between">
            <span className="text-2xl">👤</span>
            <span className="text-xs text-red-600">New today</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-blue-900">{kpis.newDefaultersToday}</div>
            <div className="text-sm text-gray-500">New Defaulters Today</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-orange-500">
          <div className="flex items-center justify-between">
            <span className="text-2xl">🧾</span>
            <span className="text-xs text-orange-600">Due today</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-blue-900">{kpis.billsDueToday}</div>
            <div className="text-sm text-gray-500">Bills Due Today</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <span className="text-2xl">💸</span>
            <span className="text-xs text-purple-600">Today</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-blue-900">${kpis.todayExpenses}</div>
            <div className="text-sm text-gray-500">Today's Expenses</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm">+ Record Payment</button>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm">+ Create Invoice</button>
        <button className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors">+ Add Expense</button>
        <button className="px-4 py-2 border border-gray-300 text-blue-900 rounded-lg hover:bg-gray-50 transition-colors">📧 Send Reminder</button>
      </div>

      {/* Today's Summary */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📋 Today's Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{payments.length}</div>
            <div className="text-sm text-gray-500">Payments Today</div>
            <div className="text-xs text-gray-400">${totalPayments} total</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-500">Invoices Created</div>
            <div className="text-xs text-gray-400">Today</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{bills.length}</div>
            <div className="text-sm text-gray-500">Bills Due Today</div>
            <div className="text-xs text-gray-400">${totalBills} total</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{kpis.newDefaultersToday}</div>
            <div className="text-sm text-gray-500">New Defaulters</div>
            <div className="text-xs text-gray-400">Added today</div>
          </div>
        </div>
      </div>

      {/* Today's Payments */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">💳 Today's Payments</h2>
          <button className="text-sm text-orange-500 hover:underline">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Student</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-right">Amount</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{p.student}</td>
                  <td className="px-4 py-2">{p.type}</td>
                  <td className="px-4 py-2 text-right font-bold">${p.amount}</td>
                  <td className="px-4 py-2">{p.time}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{p.status === 'verified' ? '✅ Verified' : '⏳ Pending'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bills Due Today */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-red-600">🧾 Bills Due Today</h2>
            <button className="text-sm text-orange-500 hover:underline">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                  <th className="px-3 py-2 text-left">Requested By</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{bill.type}</td>
                    <td className="px-3 py-2 text-right font-bold text-red-600">${bill.amount}</td>
                    <td className="px-3 py-2">{bill.requestedBy}</td>
                    <td className="px-3 py-2 text-center">
                      <button className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top 5 Defaulters */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-red-600">⚠️ Top 5 Defaulters</h2>
            <button className="text-sm text-orange-500 hover:underline">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Student</th>
                  <th className="px-3 py-2 text-left">Class</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                  <th className="px-3 py-2 text-left">Days</th>
                </tr>
              </thead>
              <tbody>
                {defaulters.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">{d.name}</td>
                    <td className="px-3 py-2">{d.class}</td>
                    <td className="px-3 py-2 text-right font-bold text-red-600">${d.amount}</td>
                    <td className="px-3 py-2">{getDaysBadge(d.days)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}