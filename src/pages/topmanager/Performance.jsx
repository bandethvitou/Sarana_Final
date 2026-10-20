// src/pages/topmanager/Performance.jsx
import { useState } from 'react';

const departments = ['Academic', 'Finance', 'Operations'];
const performanceData = {
  Academic: { classAvg: 82, staffAttendance: 94, reportRate: 88, taskCompletion: 75 },
  Finance: { classAvg: null, staffAttendance: 96, reportRate: 92, taskCompletion: 80 },
  Operations: { classAvg: null, staffAttendance: 90, reportRate: 85, taskCompletion: 70 },
};

export default function Performance() {
  const [selectedDept, setSelectedDept] = useState('Academic');
  const data = performanceData[selectedDept];

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Department Performance</h1>
      <div className="mb-4"><select className="border rounded-lg px-4 py-2" value={selectedDept} onChange={e => setSelectedDept(e.target.value)}>{departments.map(d => <option key={d}>{d}</option>)}</select></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.classAvg !== null && <div className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-blue-900">Class Average</h3><p className="text-3xl font-bold">{data.classAvg}%</p></div>}
        <div className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-blue-900">Staff Attendance</h3><p className="text-3xl font-bold">{data.staffAttendance}%</p></div>
        <div className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-blue-900">Report Submission Rate</h3><p className="text-3xl font-bold">{data.reportRate}%</p></div>
        <div className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-blue-900">Task Completion Rate</h3><p className="text-3xl font-bold">{data.taskCompletion}%</p></div>
      </div>
    </div>
  );
}