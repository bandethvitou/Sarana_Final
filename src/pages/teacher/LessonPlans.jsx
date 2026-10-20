import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const dailyPlans = [
  { id: 1, time: '8:00 AM', class: 'Grade 5B', subject: 'Math', topic: 'Fractions', status: 'submitted' },
  { id: 2, time: '9:30 AM', class: 'Grade 6A', subject: 'Science', topic: 'Photosynthesis', status: 'draft' },
  { id: 3, time: '11:00 AM', class: 'Grade 5A', subject: 'Math', topic: 'Decimals', status: 'approved' },
  { id: 4, time: '1:00 PM', class: 'Grade 6B', subject: 'Science', topic: 'Ecosystems', status: 'revision' },
];

const weeklyData = [
  { day: 'Mon', periods: [{ time: '8:00', class: '5B', subject: 'Math', status: 'submitted' }, { time: '9:30', class: '6A', subject: 'Science', status: 'draft' }] },
  { day: 'Tue', periods: [{ time: '8:00', class: '5A', subject: 'Math', status: 'approved' }, { time: '9:30', class: '6B', subject: 'Science', status: 'revision' }] },
  { day: 'Wed', periods: [{ time: '8:00', class: '5B', subject: 'Math', status: 'draft' }, { time: '9:30', class: '6A', subject: 'Science', status: 'submitted' }] },
  { day: 'Thu', periods: [{ time: '8:00', class: '5A', subject: 'Math', status: 'approved' }, { time: '9:30', class: '6B', subject: 'Science', status: 'draft' }] },
  { day: 'Fri', periods: [{ time: '8:00', class: '5B', subject: 'Math', status: 'submitted' }, { time: '9:30', class: '6A', subject: 'Science', status: 'approved' }] },
];

const monthlyWeeks = [
  { week: 'Week 1', topics: ['Fractions Introduction', 'Adding Fractions', 'Subtracting Fractions', 'Mixed Numbers'], status: 'submitted' },
  { week: 'Week 2', topics: ['Multiplying Fractions', 'Dividing Fractions', 'Fraction Review', 'Quiz'], status: 'approved' },
  { week: 'Week 3', topics: ['Decimals Introduction', 'Adding Decimals', 'Subtracting Decimals', 'Decimal Review'], status: 'draft' },
  { week: 'Week 4', topics: ['Multiplying Decimals', 'Dividing Decimals', 'Decimal Quiz', 'Review'], status: 'submitted' },
];

export default function LessonPlans() {
  const navigate = useNavigate();
  const [view, setView] = useState('daily');
  const [showModal, setShowModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">⚪ Draft</span>;
      case 'submitted': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Submitted</span>;
      case 'approved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">🟢 Approved</span>;
      case 'revision': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 Revision</span>;
      default: return null;
    }
  };

  const handleCreatePlan = () => {
    setShowModal(true);
  };

  const handleSubmitPlan = (id) => {
    toast.success('📤 Plan submitted to Manager!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📝 Lesson Plans</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {['daily', 'weekly', 'monthly'].map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`px-6 py-2.5 font-medium transition-all capitalize ${
              view === tab ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
          >
            {tab === 'daily' ? '📅 Daily' : tab === 'weekly' ? '📆 Weekly' : '📊 Monthly'}
          </button>
        ))}
      </div>

      {/* Daily View */}
      {view === 'daily' && (
        <div>
          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={handleCreatePlan} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">+ Create Plan</button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">📅 Today</button>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Class</th>
                  <th className="px-4 py-3 text-left">Subject</th>
                  <th className="px-4 py-3 text-left">Topic</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dailyPlans.map((plan) => (
                  <tr key={plan.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{plan.time}</td>
                    <td className="px-4 py-3">{plan.class}</td>
                    <td className="px-4 py-3">{plan.subject}</td>
                    <td className="px-4 py-3">{plan.topic}</td>
                    <td className="px-4 py-3">{getStatusBadge(plan.status)}</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-900 hover:underline text-sm mr-2">View</button>
                      {plan.status === 'draft' && (
                        <>
                          <button className="text-orange-500 hover:underline text-sm mr-2">Edit</button>
                          <button onClick={() => handleSubmitPlan(plan.id)} className="text-green-600 hover:underline text-sm mr-2">Submit</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Weekly View */}
      {view === 'weekly' && (
        <div>
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">← Previous Week</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next Week →</button>
            </div>
            <span className="font-medium text-blue-900">Week of June 16 – 20, 2025</span>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="font-bold text-blue-900 text-center mb-3">{day.day}</h3>
                <div className="space-y-2">
                  {day.periods.map((period, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs font-medium">{period.time}</p>
                      <p className="text-sm font-bold">{period.class}</p>
                      <p className="text-xs text-gray-500">{period.subject}</p>
                      <div className="mt-1">{getStatusBadge(period.status)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly View */}
      {view === 'monthly' && (
        <div>
          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={handleCreatePlan} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">+ Create Week Plan</button>
            <button onClick={() => setShowCopyModal(true)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">📤 Copy from Previous Month</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {monthlyWeeks.map((week) => (
              <div key={week.week} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-blue-900">{week.week}</h3>
                  {getStatusBadge(week.status)}
                </div>
                <ul className="space-y-1">
                  {week.topics.map((topic, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-900 rounded-full"></span>
                      {topic}
                    </li>
                  ))}
                </ul>
                <button className="mt-3 text-sm text-orange-500 hover:underline w-full text-center">View Week →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Plan Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📝 Create Lesson Plan</h2>
            <div className="space-y-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" className="w-full border rounded-lg px-4 py-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Morning (6:00 AM – 12:00 PM)</option>
                  <option>Afternoon (12:00 PM – 5:00 PM)</option>
                  <option>Evening (5:30 PM – 6:30 PM)</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Grade 5B</option>
                  <option>Grade 6A</option>
                  <option>Grade 5A</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Topic</label><input type="text" className="w-full border rounded-lg px-4 py-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Objective</label><textarea rows="2" className="w-full border rounded-lg px-4 py-2"></textarea></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Activities</label>
                <div className="flex gap-2"><input type="text" className="flex-1 border rounded-lg px-4 py-2" placeholder="Add activity" /><button className="px-3 py-2 bg-blue-900 text-white rounded-lg">+</button></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Homework Assigned</label>
                <div className="flex gap-3"><button className="px-4 py-2 border rounded-lg text-sm">Yes</button><button className="px-4 py-2 border rounded-lg text-sm">No</button></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Save as Draft</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Submit to Manager</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Copy Modal */}
      {showCopyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">📤 Copy from Previous Month</h2>
            <div className="space-y-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Copy from</label><select className="w-full border rounded-lg px-4 py-2"><option>May 2025</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Copy to</label><select className="w-full border rounded-lg px-4 py-2"><option>June 2025</option></select></div>
              <div className="space-y-1"><label className="block text-sm font-medium text-gray-700">Options</label>
                <div className="space-y-1"><label className="flex items-center gap-2"><input type="checkbox" /> Copy weeks</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> Copy topics</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> Copy activities</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> Copy materials</label></div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center"><p className="text-sm text-gray-500">Preview: 4 weeks, 20 daily plans</p></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowCopyModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Copy Plans</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}