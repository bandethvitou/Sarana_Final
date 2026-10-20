import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockIncomeOutcome = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  income: [38000, 40000, 42000, 45000, 43000, 45000],
  outcome: [28000, 30000, 32000, 33000, 31000, 32000],
};

const mockBudget = [
  { category: 'Salaries', budget: 200000, actual: 185000, variance: 15000 },
  { category: 'Utilities', budget: 30000, actual: 28500, variance: 1500 },
  { category: 'Maintenance', budget: 20000, actual: 22000, variance: -2000 },
  { category: 'Supplies', budget: 35000, actual: 33500, variance: 1500 },
  { category: 'Events', budget: 15000, actual: 12000, variance: 3000 },
  { category: 'Transport', budget: 10000, actual: 9500, variance: 500 },
];

const mockFeeCollection = [
  { level: '👶 Baby', expected: 12000, collected: 11500, rate: 96, status: 'good' },
  { level: '🧒 Kids', expected: 96000, collected: 89000, rate: 93, status: 'good' },
  { level: '👦 Junior', expected: 70000, collected: 62000, rate: 89, status: 'warning' },
  { level: '🧑 Senior', expected: 60000, collected: 52000, rate: 87, status: 'warning' },
];

const mockAuditLog = [
  { id: 1, date: '2025-06-20', user: 'Ms. Anna', action: 'Record Payment', amount: 500, details: 'Sok – Tuition' },
  { id: 2, date: '2025-06-19', user: 'Ms. Anna', action: 'Approve Bill', amount: 120, details: 'Bill #2 – Water' },
  { id: 3, date: '2025-06-18', user: 'Mr. Rudi', action: 'Create Expense', amount: 300, details: 'Maintenance' },
  { id: 4, date: '2025-06-17', user: 'Ms. Anna', action: 'Record Payment', amount: 500, details: 'Lina – Tuition' },
  { id: 5, date: '2025-06-16', user: 'Mr. Budi', action: 'Request Bill', amount: 450, details: 'Electricity Bill' },
];

export default function FinanceReports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('income');
  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [selectedYear, setSelectedYear] = useState('2025');

  // Income/Outcome calculations
  const totalIncome = mockIncomeOutcome.income.reduce((a, b) => a + b, 0);
  const totalOutcome = mockIncomeOutcome.outcome.reduce((a, b) => a + b, 0);
  const netSurplus = totalIncome - totalOutcome;

  // Budget calculations
  const totalBudget = mockBudget.reduce((sum, item) => sum + item.budget, 0);
  const totalActual = mockBudget.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalBudget - totalActual;

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📊 Finance Reports</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {[
          { id: 'income', label: 'Income/Outcome' },
          { id: 'budget', label: 'Budget vs Actual' },
          { id: 'fees', label: 'Fee Collection Rate' },
          { id: 'audit', label: 'Audit Log' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-900 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-blue-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== TAB 1: INCOME/OUTCOME ===== */}
      {activeTab === 'income' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex gap-3">
              <select 
                className="border rounded-lg px-3 py-2 bg-white"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option>June 2025</option>
                <option>May 2025</option>
                <option>April 2025</option>
                <option>March 2025</option>
              </select>
              <select 
                className="border rounded-lg px-3 py-2 bg-white"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option>2025</option>
                <option>2024</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">📎 Export Excel</button>
              <button className="px-3 py-1 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">📄 Export PDF</button>
            </div>
          </div>

          {/* Chart */}
          <div className="flex items-end h-60 gap-4 mb-6">
            {mockIncomeOutcome.months.map((month, idx) => {
              const income = mockIncomeOutcome.income[idx];
              const outcome = mockIncomeOutcome.outcome[idx];
              const max = Math.max(...mockIncomeOutcome.income, ...mockIncomeOutcome.outcome) * 1.1;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="flex gap-1 w-full justify-center items-end h-48">
                    <div 
                      className="w-8 bg-blue-900 rounded-t transition-all duration-500 hover:opacity-80"
                      style={{ height: `${(income / max) * 100}%` }}
                    >
                      <div className="text-center text-[10px] text-blue-900 font-medium mt-1 opacity-0 hover:opacity-100 transition-opacity">
                        ${income}
                      </div>
                    </div>
                    <div 
                      className="w-8 bg-orange-500 rounded-t transition-all duration-500 hover:opacity-80"
                      style={{ height: `${(outcome / max) * 100}%` }}
                    >
                      <div className="text-center text-[10px] text-orange-600 font-medium mt-1 opacity-0 hover:opacity-100 transition-opacity">
                        ${outcome}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs mt-2 font-medium">{month}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 text-sm mb-6">
            <span className="flex items-center gap-2"><span className="w-4 h-4 bg-blue-900 rounded"></span> Income</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 bg-orange-500 rounded"></span> Outcome</span>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 rounded-xl p-5">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Income (YTD)</div>
              <div className="text-2xl font-bold text-blue-900">${totalIncome.toLocaleString()}</div>
              <div className="text-xs text-green-600">↑ 5% vs last year</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Outcome (YTD)</div>
              <div className="text-2xl font-bold text-orange-500">${totalOutcome.toLocaleString()}</div>
              <div className="text-xs text-green-600">↑ 3% vs last year</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Net Surplus</div>
              <div className={`text-2xl font-bold ${netSurplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${netSurplus.toLocaleString()}
              </div>
              <div className={`text-xs ${netSurplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netSurplus >= 0 ? '↑' : '↓'} 8% vs last year
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Income Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>Tuition</span><span className="font-bold">$38,000</span></div>
                <div className="flex justify-between text-sm"><span>Transport</span><span className="font-bold">$4,000</span></div>
                <div className="flex justify-between text-sm"><span>Library</span><span className="font-bold">$1,500</span></div>
                <div className="flex justify-between text-sm"><span>Other</span><span className="font-bold">$1,500</span></div>
              </div>
            </div>
            <div className="border rounded-xl p-4">
              <h3 className="font-semibold text-orange-500 mb-3">Outcome Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>Salary</span><span className="font-bold">$18,000</span></div>
                <div className="flex justify-between text-sm"><span>Utilities</span><span className="font-bold">$2,500</span></div>
                <div className="flex justify-between text-sm"><span>Maintenance</span><span className="font-bold">$1,800</span></div>
                <div className="flex justify-between text-sm"><span>Supplies</span><span className="font-bold">$3,200</span></div>
                <div className="flex justify-between text-sm"><span>Other</span><span className="font-bold">$6,500</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB 2: BUDGET VS ACTUAL ===== */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg text-blue-900">Year: {selectedYear}</h3>
            <button className="px-3 py-1 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">📎 Export</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-right">Budget</th>
                  <th className="px-4 py-3 text-right">Actual</th>
                  <th className="px-4 py-3 text-right">Variance</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockBudget.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.category}</td>
                    <td className="px-4 py-3 text-right">${item.budget.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">${item.actual.toLocaleString()}</td>
                    <td className={`px-4 py-3 text-right font-bold ${
                      item.variance >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.variance >= 0 ? '+' : ''}{item.variance.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.variance >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.variance >= 0 ? '✅ Under' : '⚠️ Over'}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-300 font-bold">
                  <td className="px-4 py-3">TOTAL</td>
                  <td className="px-4 py-3 text-right">${totalBudget.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">${totalActual.toLocaleString()}</td>
                  <td className={`px-4 py-3 text-right ${totalVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalVariance >= 0 ? '+' : ''}{totalVariance.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      totalVariance >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {totalVariance >= 0 ? '✅ Under' : '⚠️ Over'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== TAB 3: FEE COLLECTION RATE ===== */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex gap-3">
              <select className="border rounded-lg px-3 py-2 bg-white">
                <option>All Levels</option>
                <option>Baby</option>
                <option>Kids</option>
                <option>Junior</option>
                <option>Senior</option>
              </select>
              <select className="border rounded-lg px-3 py-2 bg-white">
                <option>Quarter 2</option>
                <option>Quarter 1</option>
                <option>Quarter 3</option>
                <option>Quarter 4</option>
              </select>
            </div>
            <button className="px-3 py-1 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">📎 Export</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Level</th>
                  <th className="px-4 py-3 text-right">Expected</th>
                  <th className="px-4 py-3 text-right">Collected</th>
                  <th className="px-4 py-3 text-right">Rate</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockFeeCollection.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.level}</td>
                    <td className="px-4 py-3 text-right">${item.expected.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">${item.collected.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-bold">{item.rate}%</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status === 'good' ? '✅ Good' : '⚠️ Watch'}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-300 font-bold">
                  <td className="px-4 py-3">TOTAL</td>
                  <td className="px-4 py-3 text-right">${mockFeeCollection.reduce((sum, i) => sum + i.expected, 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">${mockFeeCollection.reduce((sum, i) => sum + i.collected, 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">90%</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Good</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== TAB 4: AUDIT LOG ===== */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex flex-wrap gap-3">
              <input type="date" className="border rounded-lg px-3 py-2 bg-white" />
              <span className="flex items-center text-gray-500">to</span>
              <input type="date" className="border rounded-lg px-3 py-2 bg-white" />
              <select className="border rounded-lg px-3 py-2 bg-white">
                <option>All Users</option>
                <option>Ms. Anna</option>
                <option>Mr. Rudi</option>
                <option>Mr. Budi</option>
              </select>
              <select className="border rounded-lg px-3 py-2 bg-white">
                <option>All Actions</option>
                <option>Record Payment</option>
                <option>Approve Bill</option>
                <option>Create Expense</option>
                <option>Request Bill</option>
              </select>
            </div>
            <button className="px-3 py-1 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">📎 Export</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Action</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {mockAuditLog.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{log.date}</td>
                    <td className="px-4 py-3 font-medium">{log.user}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        log.action === 'Record Payment' ? 'bg-green-100 text-green-700' :
                        log.action === 'Approve Bill' ? 'bg-blue-100 text-blue-700' :
                        log.action === 'Create Expense' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{log.action}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold">${log.amount}</td>
                    <td className="px-4 py-3">{log.details}</td>
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