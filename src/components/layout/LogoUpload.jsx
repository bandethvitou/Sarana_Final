// src/components/layout/LogoUpload.jsx
import { useRef } from 'react';

export function LogoUpload({ logo, onUpload }) {
  const fileInputRef = useRef(null);

  return (
    <div className="relative cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
      <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white text-xl font-bold overflow-hidden border-2 border-orange-500 transition-transform group-hover:scale-105">
        {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover" /> : <span>🏫</span>}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onUpload} />
    </div>
  );
}

export default LogoUpload;