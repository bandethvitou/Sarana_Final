// src/components/common/ErrorMessage.jsx
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <p className="text-red-600">❌ {message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}