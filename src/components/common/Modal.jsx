// src/components/common/Modal.jsx
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  actions 
}) {
  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={`bg-white rounded-xl shadow-2xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto ${sizes[size]}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
        </div>
        <div>{children}</div>
        {actions && (
          <div className="flex justify-end gap-3 mt-6">{actions}</div>
        )}
      </div>
    </div>
  )
}