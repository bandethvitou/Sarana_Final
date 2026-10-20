// src/components/forms/Input.jsx
export function Input({ 
  label, 
  error, 
  required, 
  className = '', 
  ...props 
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input 
        className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
