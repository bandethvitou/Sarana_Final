// src/components/common/KPICard.jsx
export default function KPICard({ label, value, change, icon, color }) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border-t-4 ${color}`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-medium text-gray-500">{change}</span>
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold text-blue-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}