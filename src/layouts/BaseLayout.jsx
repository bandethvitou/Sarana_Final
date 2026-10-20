// src/layouts/BaseLayout.jsx
import { useState } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { LogoUpload } from '../components/layout/LogoUpload'
import { NotificationBell } from '../components/layout/NotificationBell'
import { ProfileDropdown } from '../components/layout/ProfileDropdown'
import { useAuth } from '../context/AuthContext'

export function BaseLayout({ 
  children, 
  navItems, 
  canEditSchoolName = true,
  role = 'director'
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [logoImage, setLogoImage] = useState(null)
  const [schoolName, setSchoolName] = useState('NIS School ERP')
  const { user } = useAuth()

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setLogoImage(event.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800 overflow-hidden">
      <Sidebar 
        navItems={navItems}
        schoolName={schoolName}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white shadow-sm sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-2xl text-blue-900" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
              <LogoUpload logo={logoImage} onUpload={handleLogoUpload} />
              <span className="text-xl font-semibold text-blue-900">{schoolName}</span>
            </div>

            <div className="flex items-center gap-6">
              <NotificationBell />
              <ProfileDropdown user={user} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}