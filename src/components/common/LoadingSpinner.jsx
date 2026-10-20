// src/components/common/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
    </div>
  );
}