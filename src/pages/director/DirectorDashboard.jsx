// src/pages/director/DirectorDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { managementService, financeService, admissionsService } from '../../services';
import toast from 'react-hot-toast';

export default function DirectorDashboard() {
  const navigate = useNavigate();
  
  // Fetch data using the API
  const { data: goals, loading: goalsLoading } = useApi(
    () => managementService.getGoals(),
    { 
      onSuccess: (data) => console.log('Goals loaded:', data),
      onError: (error) => toast.error('Failed to load goals')
    }
  );

  const { data: feeSummary, loading: feeLoading } = useApi(
    () => financeService.getFeeSummary(),
    { onError: () => toast.error('Failed to load fee summary') }
  );

  const { data: enrollmentData, loading: enrollmentLoading } = useApi(
    () => admissionsService.getApplications(),
    { onError: () => toast.error('Failed to load enrollment data') }
  );

  // Manual fetch example
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [goalsRes, feeRes, enrollmentRes] = await Promise.all([
          managementService.getGoals(),
          financeService.getFeeSummary(),
          admissionsService.getApplications(),
        ]);
        
        // Process and set KPI data
        setKpis([
          { label: 'Total Students', value: enrollmentRes.data?.length || 0, trend: '↑ 35 new this month' },
          { label: 'Fee Collection', value: `${feeRes.data?.collectionRate || 0}%`, trend: '↑ 2% vs last month' },
          { label: 'Active Goals', value: goalsRes.data?.filter(g => g.status === 'in_progress').length || 0, trend: '🎯 In progress' },
        ]);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Director Dashboard</h1>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => navigate('/director/roles')} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-blue-900 font-medium hover:bg-gray-50">
          + Promote User
        </button>
        <button onClick={() => navigate('/director/meetings')} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-blue-900 font-medium hover:bg-gray-50">
          + Create Meeting
        </button>
        <button onClick={() => navigate('/director/goals')} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-blue-900 font-medium hover:bg-gray-50">
          + Add Goal
        </button>
      </div>

      {/* KPI Cards - Dynamic from API */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-900 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-500 mb-1">{kpi.label}</div>
            <div className="text-3xl font-bold text-blue-900">{kpi.value}</div>
            <div className="text-xs mt-2 text-green-500">{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Rest of your dashboard with real data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Goals Section */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">🎯 Active Goals</h2>
          {goalsLoading ? (
            <div className="text-center py-4 text-gray-400">Loading...</div>
          ) : goals?.length > 0 ? (
            goals.slice(0, 3).map((goal, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{goal.title}</span>
                  <span className="text-xs text-gray-400">{goal.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-900 h-2 rounded-full" style={{ width: `${goal.progress || 0}%` }}></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No active goals</p>
          )}
          <button onClick={() => navigate('/director/goals')} className="mt-4 text-sm text-blue-900 hover:underline">
            View All Goals →
          </button>
        </div>

        {/* Fee Collection */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">💰 Fee Collection</h2>
          {feeLoading ? (
            <div className="text-center py-4 text-gray-400">Loading...</div>
          ) : feeSummary ? (
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-blue-900">{feeSummary.collectionRate || 0}%</div>
              <p className="text-gray-500">Collection Rate</p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No fee data available</p>
          )}
        </div>
      </div>
    </div>
  );
}