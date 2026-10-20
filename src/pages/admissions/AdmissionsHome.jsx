// src/pages/admissions/AdmissionsHome.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { admissionsService } from '../../services/admissions';

export default function AdmissionsHome() {
  const navigate = useNavigate();
  const [kpis, setKpis] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Set current date
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));

    // Fetch data
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Parallel fetching for speed
        const [
          kpiRes,
          regRes,
          pendRes
        ] = await Promise.all([
          admissionsService.getAdmissionsKPIs(),
          admissionsService.getRecentRegistrations(),
          admissionsService.getPendingApplications()
        ]);

        // Handle the responses - they might be wrapped in { data: ... }
        setKpis({
          newStudents: kpiRes?.data?.newStudents || kpiRes?.newStudents || 0,
          pendingApplications: kpiRes?.data?.pendingApplications || kpiRes?.pendingApplications || 0,
          todayEnrollments: kpiRes?.data?.todayEnrollments || kpiRes?.todayEnrollments || 0,
          toursScheduled: kpiRes?.data?.toursScheduled || kpiRes?.toursScheduled || 0,
          todayDropouts: kpiRes?.data?.todayDropouts || kpiRes?.todayDropouts || 0,
        });
        setRegistrations(regRes?.data || regRes || []);
        setPending(pendRes?.data || pendRes || []);
        toast.success('📊 Data loaded!');
      } catch (err) {
        console.error('Failed to fetch admissions data:', err);
        setError('Could not load admissions data. Please try again.');
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600">❌ {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // --- Render using kpis, registrations, pending ---
  const kpiArray = [
    { label: 'New Students Today', value: kpis?.newStudents || 0, change: '↑ New today', icon: '🆕', color: 'border-blue-900' },
    { label: 'Pending Applications', value: kpis?.pendingApplications || 0, change: 'Under review', icon: '📋', color: 'border-yellow-500' },
    { label: "Today's Enrollment", value: kpis?.todayEnrollments || 0, change: 'Enrolled today', icon: '👥', color: 'border-green-500' },
    { label: 'Tours Scheduled Today', value: kpis?.toursScheduled || 0, change: 'Today', icon: '🏫', color: 'border-purple-500' },
    { label: "Today's Dropouts", value: kpis?.todayDropouts || 0, change: 'Dropped today', icon: '📊', color: 'border-red-500' },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">🏠 Admissions Home</h1>
          <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">TODAY'S DATA</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {kpiArray.map((kpi, idx) => (
          <div key={idx} className={`bg-white rounded-xl p-5 shadow-sm border-t-4 ${kpi.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{kpi.change}</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-900">{kpi.value}</div>
              <div className="text-sm text-gray-500">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={() => navigate('/admissions/register')} className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>🆕</span> New Registration
        </button>
        <button onClick={() => navigate('/admissions/applications')} className="px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>📋</span> View Applications
        </button>
        <button onClick={() => navigate('/admissions/tours')} className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
          <span>🏫</span> Schedule Tour
        </button>
        <button onClick={() => navigate('/admissions/enrollment')} className="px-5 py-2.5 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-all flex items-center gap-2 font-medium">
          <span>👥</span> Enrollment List
        </button>
      </div>

      {/* Recent Registrations Table */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">📋 Recent Registrations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Level</th>
                <th className="px-4 py-2 text-left">Parent</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4 text-gray-400">No recent registrations</td></tr>
              ) : (
                registrations.map((reg, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{reg.name || reg.studentName || 'N/A'}</td>
                    <td className="px-4 py-2">{reg.level || reg.class || 'N/A'}</td>
                    <td className="px-4 py-2">{reg.parent || reg.parentName || 'N/A'}</td>
                    <td className="px-4 py-2">{reg.date || reg.registeredDate || 'N/A'}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        reg.status === 'approved' ? 'bg-green-100 text-green-700' :
                        reg.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {reg.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Applications */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">⏳ Pending Applications</h2>
        <div className="space-y-3">
          {pending.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No pending applications</p>
          ) : (
            pending.map((app, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{app.name || app.studentName || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{app.level || app.class || 'N/A'} • {app.parent || app.parentName || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>
                  <button className="text-blue-900 hover:underline text-sm">Review</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}