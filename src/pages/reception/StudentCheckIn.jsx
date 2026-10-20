import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockStudents = [
  { id: 1, name: 'KY SOKKUNVUTHI', class: 'Grade 10A', status: 'in', time: '7:45 AM' },
  { id: 2, name: 'Kim Menghong', class: 'Grade 10B', status: 'absent', time: '-' },
  { id: 3, name: 'Chan Sreyneng', class: 'Grade 10A', status: 'late', time: '8:15 AM' },
  { id: 4, name: 'Sok Mala', class: 'Grade 10A', status: 'in', time: '7:30 AM' },
  { id: 5, name: 'Pech Sopheak', class: 'Grade 9B', status: 'in', time: '7:50 AM' },
  { id: 6, name: 'Chhay Srey', class: 'Grade 9A', status: 'in', time: '7:40 AM' },
  { id: 7, name: 'Meas Linda', class: 'Grade 11A', status: 'absent', time: '-' },
  { id: 8, name: 'Vann Vann', class: 'Grade 12A', status: 'in', time: '7:35 AM' },
  { id: 9, name: 'Sok Sreyneang', class: 'Grade 3A', status: 'in', time: '7:55 AM' },
  { id: 10, name: 'Kim Chan', class: 'Grade 8A', status: 'in', time: '7:42 AM' },
];

const classes = ['All', 'Grade 3A', 'Grade 8A', 'Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 12A'];

export default function StudentCheckIn() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [checkinTime, setCheckinTime] = useState('7:45 AM');
  const [checkinStatus, setCheckinStatus] = useState('present');
  const [checkinNotes, setCheckinNotes] = useState('');

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === 'All' || s.class === classFilter;
    return matchSearch && matchClass;
  });

  const stats = {
    present: students.filter(s => s.status === 'in').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ In</span>;
      case 'absent': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">❌ Absent</span>;
      case 'late': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🕒 Late</span>;
      default: return null;
    }
  };

  const handleCheckIn = (student) => {
    setSelectedStudent(student);
    setCheckinTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    setCheckinStatus('present');
    setCheckinNotes('');
    setShowModal(true);
  };

  const handleCheckOut = (student) => {
    if (window.confirm(`Check out ${student.name}?`)) {
      toast.success(`✅ ${student.name} checked out successfully!`);
    }
  };

  const confirmCheckIn = () => {
    if (selectedStudent) {
      setStudents(students.map(s => 
        s.id === selectedStudent.id 
          ? { ...s, status: checkinStatus === 'present' ? 'in' : 'late', time: checkinTime }
          : s
      ));
      toast.success(`✅ ${selectedStudent.name} checked in successfully!`);
      setShowModal(false);
      setSelectedStudent(null);
    }
  };

  const markAllPresent = () => {
    if (window.confirm('Mark all students as present?')) {
      setStudents(students.map(s => 
        s.status === 'absent' ? { ...s, status: 'in', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) } : s
      ));
      toast.success('✅ All students marked as present!');
    }
  };

  const exportReport = () => {
    toast.success('📊 Report exported successfully!');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">✅ Student Check-In/Out</h1>
        <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search student..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          {classes.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap items-center gap-6 mb-6 bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-600">Summary:</span>
          <span className="text-sm"><span className="font-bold text-green-600">{stats.present}</span> Present</span>
          <span className="text-sm"><span className="font-bold text-red-600">{stats.absent}</span> Absent</span>
          <span className="text-sm"><span className="font-bold text-yellow-600">{stats.late}</span> Late</span>
        </div>
        <div className="flex gap-3 ml-auto">
          <button onClick={markAllPresent} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 text-sm font-medium">
            Mark All Present
          </button>
          <button onClick={exportReport} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
            📤 Export Report
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left w-12">#</th>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, idx) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3 font-medium">{student.name}</td>
                <td className="px-4 py-3">{student.class}</td>
                <td className="px-4 py-3">{getStatusBadge(student.status)}</td>
                <td className="px-4 py-3">{student.time}</td>
                <td className="px-4 py-3">
                  {student.status === 'absent' || student.status === 'late' ? (
                    <button onClick={() => handleCheckIn(student)} className="text-green-600 hover:underline text-sm font-medium">
                      Check In
                    </button>
                  ) : student.status === 'in' ? (
                    <button onClick={() => handleCheckOut(student)} className="text-blue-900 hover:underline text-sm font-medium">
                      Check Out
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400">No students found</div>
        )}
      </div>

      {/* Check-In Modal */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-blue-900">✅ Student Check-In</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Student</p>
                <p className="font-semibold text-lg">{selectedStudent.name} – {selectedStudent.class}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{currentDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={checkinTime}
                  onChange={(e) => setCheckinTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCheckinStatus('present')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${checkinStatus === 'present' ? 'bg-green-500 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    ✅ Present
                  </button>
                  <button
                    onClick={() => setCheckinStatus('late')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${checkinStatus === 'late' ? 'bg-yellow-500 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    🕒 Late
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="Any notes..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={checkinNotes}
                  onChange={(e) => setCheckinNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmCheckIn} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}