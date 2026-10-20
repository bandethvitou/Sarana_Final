import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockSummary = {
  totalTickets: 24,
  resolved: 17,
  resolutionRate: 71,
  avgResponseTime: '2.5 hours',
  equipmentRepairs: 8,
  newEquipment: 3,
  scheduledMaintenance: 4,
};

const mockTicketsByCategory = [
  { category: 'Hardware', count: 8 },
  { category: 'Software', count: 6 },
  { category: 'Network', count: 4 },
  { category: 'Printer', count: 3 },
  { category: 'Smart Board', count: 2 },
  { category: 'Other', count: 1 },
];

const mockEquipmentSummary = {
  total: 235,
  functional: 230,
  underRepair: 5,
};

export default function ITReports() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('June 2025');

  const maxCount = Math.max(...mockTicketsByCategory.map(item => item.count));

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📄 IT Reports</h1>

      {/* Month Selector */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
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
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">📄 Export PDF</button>
          <button className="px-3 py-1 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">📎 Export Excel</button>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-lg text-blue-900 mb-4">📊 Monthly Summary – {selectedMonth}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-900">{mockSummary.totalTickets}</div>
            <div className="text-xs text-gray-500">Total Tickets</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{mockSummary.resolved}</div>
            <div className="text-xs text-gray-500">Resolved</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{mockSummary.resolutionRate}%</div>
            <div className="text-xs text-gray-500">Resolution Rate</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-900">{mockSummary.avgResponseTime}</div>
            <div className="text-xs text-gray-500">Avg Response Time</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{mockSummary.equipmentRepairs}</div>
            <div className="text-xs text-gray-500">Equipment Repairs</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{mockSummary.newEquipment}</div>
            <div className="text-xs text-gray-500">New Equipment</div>
          </div>
        </div>
      </div>

      {/* Tickets by Category */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-lg text-blue-900 mb-4">📊 Tickets by Category</h3>
        <div className="space-y-3">
          {mockTicketsByCategory.map((item) => {
            const width = (item.count / maxCount) * 100;
            const colors = {
              'Hardware': 'bg-blue-900',
              'Software': 'bg-green-500',
              'Network': 'bg-orange-500',
              'Printer': 'bg-purple-500',
              'Smart Board': 'bg-red-500',
              'Other': 'bg-gray-400',
            };
            return (
              <div key={item.category}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.category}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${colors[item.category] || 'bg-blue-900'}`} 
                    style={{ width: `${width}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Equipment Status Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-lg text-blue-900 mb-4">📊 Equipment Status Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-900">{mockEquipmentSummary.total}</div>
            <div className="text-xs text-gray-500">Total Equipment</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{mockEquipmentSummary.functional}</div>
            <div className="text-xs text-gray-500">Fully Functional</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{mockEquipmentSummary.underRepair}</div>
            <div className="text-xs text-gray-500">Under Repair</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Functional Rate</span>
            <span className="font-medium text-green-600">98%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: '98%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}