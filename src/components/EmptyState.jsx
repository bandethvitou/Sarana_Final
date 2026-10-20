// src/components/EmptyState.jsx
export function EmptyState({ 
  icon = '📭', 
  title = 'No data found', 
  message = 'There are no records to display.',
  action,
  actionText 
}) {
  return (
    <div className="bg-white rounded-xl p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{message}</p>
      {action && actionText && (
        <button
          onClick={action}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}
