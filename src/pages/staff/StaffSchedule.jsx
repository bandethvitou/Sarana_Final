import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfWeek, addDays, isToday, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay } from 'date-fns';
import { useAuth } from '../../context/AuthContext';

// ===== SCHEDULE DATA BY ROLE =====
const scheduleByRole = {
  maintenance: {
    shifts: [
      { day: 'Monday', start: '08:00', end: '12:00', type: 'Morning' },
      { day: 'Monday', start: '13:00', end: '17:00', type: 'Afternoon' },
      { day: 'Tuesday', start: '08:00', end: '12:00', type: 'Morning' },
      { day: 'Tuesday', start: '13:00', end: '17:00', type: 'Afternoon' },
      { day: 'Wednesday', start: '08:00', end: '12:00', type: 'Morning' },
      { day: 'Wednesday', start: '13:00', end: '17:00', type: 'Afternoon' },
      { day: 'Thursday', start: '08:00', end: '12:00', type: 'Morning' },
      { day: 'Thursday', start: '13:00', end: '17:00', type: 'Afternoon' },
      { day: 'Friday', start: '08:00', end: '12:00', type: 'Morning' },
      { day: 'Friday', start: '13:00', end: '17:00', type: 'Afternoon' },
      { day: 'Saturday', start: 'OFF', end: '', type: 'Day Off' },
      { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
    ],
    currentShift: '08:00 - 12:00',
    nextShift: '13:00 - 17:00',
  },
  security: {
    shifts: [
      { day: 'Monday', start: '06:00', end: '14:00', type: 'Morning Shift' },
      { day: 'Tuesday', start: '14:00', end: '22:00', type: 'Afternoon Shift' },
      { day: 'Wednesday', start: '22:00', end: '06:00', type: 'Night Shift' },
      { day: 'Thursday', start: '06:00', end: '14:00', type: 'Morning Shift' },
      { day: 'Friday', start: '14:00', end: '22:00', type: 'Afternoon Shift' },
      { day: 'Saturday', start: 'OFF', end: '', type: 'Day Off' },
      { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
    ],
    currentShift: '06:00 - 14:00',
    nextShift: '14:00 - 22:00',
  },
  driver: {
    shifts: [
      { day: 'Monday', start: '07:00', end: '09:00', type: 'Route A - Pick up' },
      { day: 'Monday', start: '09:00', end: '11:00', type: 'Vehicle Maintenance' },
      { day: 'Monday', start: '16:00', end: '18:00', type: 'Route A - Drop off' },
      { day: 'Tuesday', start: '07:00', end: '09:00', type: 'Route B - Pick up' },
      { day: 'Tuesday', start: '09:00', end: '11:00', type: 'Vehicle Maintenance' },
      { day: 'Tuesday', start: '16:00', end: '18:00', type: 'Route B - Drop off' },
      { day: 'Wednesday', start: '07:00', end: '09:00', type: 'Route A - Pick up' },
      { day: 'Wednesday', start: '09:00', end: '11:00', type: 'Vehicle Maintenance' },
      { day: 'Wednesday', start: '16:00', end: '18:00', type: 'Route A - Drop off' },
      { day: 'Thursday', start: '07:00', end: '09:00', type: 'Route B - Pick up' },
      { day: 'Thursday', start: '09:00', end: '11:00', type: 'Vehicle Maintenance' },
      { day: 'Thursday', start: '16:00', end: '18:00', type: 'Route B - Drop off' },
      { day: 'Friday', start: '07:00', end: '09:00', type: 'Route A - Pick up' },
      { day: 'Friday', start: '09:00', end: '11:00', type: 'Vehicle Maintenance' },
      { day: 'Friday', start: '16:00', end: '18:00', type: 'Route A - Drop off' },
      { day: 'Saturday', start: 'OFF', end: '', type: 'Day Off' },
      { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
    ],
    currentShift: 'Route A - Pick up (07:00 - 09:00)',
    nextShift: 'Vehicle Maintenance (09:00 - 11:00)',
  },
  canteen: {
    shifts: [
      { day: 'Monday', start: '06:00', end: '10:00', type: 'Breakfast Prep' },
      { day: 'Monday', start: '10:00', end: '14:00', type: 'Lunch Service' },
      { day: 'Tuesday', start: '06:00', end: '10:00', type: 'Breakfast Prep' },
      { day: 'Tuesday', start: '10:00', end: '14:00', type: 'Lunch Service' },
      { day: 'Wednesday', start: '06:00', end: '10:00', type: 'Breakfast Prep' },
      { day: 'Wednesday', start: '10:00', end: '14:00', type: 'Lunch Service' },
      { day: 'Thursday', start: '06:00', end: '10:00', type: 'Breakfast Prep' },
      { day: 'Thursday', start: '10:00', end: '14:00', type: 'Lunch Service' },
      { day: 'Friday', start: '06:00', end: '10:00', type: 'Breakfast Prep' },
      { day: 'Friday', start: '10:00', end: '14:00', type: 'Lunch Service' },
      { day: 'Saturday', start: 'OFF', end: '', type: 'Day Off' },
      { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
    ],
    currentShift: 'Breakfast Prep (06:00 - 10:00)',
    nextShift: 'Lunch Service (10:00 - 14:00)',
  },
  gardener: {
    shifts: [
      { day: 'Monday', start: '07:00', end: '11:00', type: 'Watering & Care' },
      { day: 'Monday', start: '13:00', end: '16:00', type: 'Planting & Trimming' },
      { day: 'Tuesday', start: '07:00', end: '11:00', type: 'Watering & Care' },
      { day: 'Tuesday', start: '13:00', end: '16:00', type: 'Planting & Trimming' },
      { day: 'Wednesday', start: '07:00', end: '11:00', type: 'Watering & Care' },
      { day: 'Wednesday', start: '13:00', end: '16:00', type: 'Planting & Trimming' },
      { day: 'Thursday', start: '07:00', end: '11:00', type: 'Watering & Care' },
      { day: 'Thursday', start: '13:00', end: '16:00', type: 'Planting & Trimming' },
      { day: 'Friday', start: '07:00', end: '11:00', type: 'Watering & Care' },
      { day: 'Friday', start: '13:00', end: '16:00', type: 'Planting & Trimming' },
      { day: 'Saturday', start: 'OFF', end: '', type: 'Day Off' },
      { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
    ],
    currentShift: 'Watering & Care (07:00 - 11:00)',
    nextShift: 'Planting & Trimming (13:00 - 16:00)',
  },
  'lab-assistant': {
    shifts: [
      { day: 'Monday', start: '08:00', end: '12:00', type: 'Prep & Setup' },
      { day: 'Monday', start: '13:00', end: '16:00', type: 'Clean & Organize' },
      { day: 'Tuesday', start: '08:00', end: '12:00', type: 'Prep & Setup' },
      { day: 'Tuesday', start: '13:00', end: '16:00', type: 'Clean & Organize' },
      { day: 'Wednesday', start: '08:00', end: '12:00', type: 'Prep & Setup' },
      { day: 'Wednesday', start: '13:00', end: '16:00', type: 'Clean & Organize' },
      { day: 'Thursday', start: '08:00', end: '12:00', type: 'Prep & Setup' },
      { day: 'Thursday', start: '13:00', end: '16:00', type: 'Clean & Organize' },
      { day: 'Friday', start: '08:00', end: '12:00', type: 'Prep & Setup' },
      { day: 'Friday', start: '13:00', end: '16:00', type: 'Clean & Organize' },
      { day: 'Saturday', start: 'OFF', end: '', type: 'Day Off' },
      { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
    ],
    currentShift: 'Prep & Setup (08:00 - 12:00)',
    nextShift: 'Clean & Organize (13:00 - 16:00)',
  },
  'sports-coach': {
    shifts: [
      { day: 'Monday', start: '07:00', end: '09:00', type: 'Morning Practice' },
      { day: 'Monday', start: '15:00', end: '17:00', type: 'Afternoon Training' },
      { day: 'Tuesday', start: '07:00', end: '09:00', type: 'Morning Practice' },
      { day: 'Tuesday', start: '15:00', end: '17:00', type: 'Afternoon Training' },
      { day: 'Wednesday', start: '07:00', end: '09:00', type: 'Morning Practice' },
      { day: 'Wednesday', start: '15:00', end: '17:00', type: 'Afternoon Training' },
      { day: 'Thursday', start: '07:00', end: '09:00', type: 'Morning Practice' },
      { day: 'Thursday', start: '15:00', end: '17:00', type: 'Afternoon Training' },
      { day: 'Friday', start: '07:00', end: '09:00', type: 'Morning Practice' },
      { day: 'Friday', start: '15:00', end: '17:00', type: 'Afternoon Training' },
      { day: 'Saturday', start: '08:00', end: '12:00', type: 'Match Day' },
      { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
    ],
    currentShift: 'Morning Practice (07:00 - 09:00)',
    nextShift: 'Afternoon Training (15:00 - 17:00)',
  },
  'store-keeper': {
    shifts: [
      { day: 'Monday', start: '08:00', end: '12:00', type: 'Inventory Check' },
      { day: 'Monday', start: '13:00', end: '17:00', type: 'Stock Management' },
      { day: 'Tuesday', start: '08:00', end: '12:00', type: 'Inventory Check' },
      { day: 'Tuesday', start: '13:00', end: '17:00', type: 'Stock Management' },
      { day: 'Wednesday', start: '08:00', end: '12:00', type: 'Inventory Check' },
      { day: 'Wednesday', start: '13:00', end: '17:00', type: 'Stock Management' },
      { day: 'Thursday', start: '08:00', end: '12:00', type: 'Inventory Check' },
      { day: 'Thursday', start: '13:00', end: '17:00', type: 'Stock Management' },
      { day: 'Friday', start: '08:00', end: '12:00', type: 'Inventory Check' },
      { day: 'Friday', start: '13:00', end: '17:00', type: 'Stock Management' },
      { day: 'Saturday', start: 'OFF', end: '', type: 'Day Off' },
      { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
    ],
    currentShift: 'Inventory Check (08:00 - 12:00)',
    nextShift: 'Stock Management (13:00 - 17:00)',
  },
  nurse: {
    shifts: [
      { day: 'Monday', start: '08:00', end: '12:00', type: 'Health Check' },
      { day: 'Monday', start: '13:00', end: '16:00', type: 'Records & Admin' },
      { day: 'Tuesday', start: '08:00', end: '12:00', type: 'Health Check' },
      { day: 'Tuesday', start: '13:00', end: '16:00', type: 'Records & Admin' },
      { day: 'Wednesday', start: '08:00', end: '12:00', type: 'Health Check' },
      { day: 'Wednesday', start: '13:00', end: '16:00', type: 'Records & Admin' },
      { day: 'Thursday', start: '08:00', end: '12:00', type: 'Health Check' },
      { day: 'Thursday', start: '13:00', end: '16:00', type: 'Records & Admin' },
      { day: 'Friday', start: '08:00', end: '12:00', type: 'Health Check' },
      { day: 'Friday', start: '13:00', end: '16:00', type: 'Records & Admin' },
      { day: 'Saturday', start: 'OFF', end: '', type: 'Day Off' },
      { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
    ],
    currentShift: 'Health Check (08:00 - 12:00)',
    nextShift: 'Records & Admin (13:00 - 16:00)',
  },
};

// Default schedule
const defaultSchedule = {
  shifts: [
    { day: 'Monday', start: '08:00', end: '12:00', type: 'Morning' },
    { day: 'Monday', start: '13:00', end: '17:00', type: 'Afternoon' },
    { day: 'Tuesday', start: '08:00', end: '12:00', type: 'Morning' },
    { day: 'Tuesday', start: '13:00', end: '17:00', type: 'Afternoon' },
    { day: 'Wednesday', start: '08:00', end: '12:00', type: 'Morning' },
    { day: 'Wednesday', start: '13:00', end: '17:00', type: 'Afternoon' },
    { day: 'Thursday', start: '08:00', end: '12:00', type: 'Morning' },
    { day: 'Thursday', start: '13:00', end: '17:00', type: 'Afternoon' },
    { day: 'Friday', start: '08:00', end: '12:00', type: 'Morning' },
    { day: 'Friday', start: '13:00', end: '17:00', type: 'Afternoon' },
    { day: 'Saturday', start: 'OFF', end: '', type: 'Day Off' },
    { day: 'Sunday', start: 'OFF', end: '', type: 'Day Off' },
  ],
  currentShift: '08:00 - 12:00',
  nextShift: '13:00 - 17:00',
};

// Meetings data
const mockMeetings = [
  { id: 1, title: 'Staff Meeting', date: '2025-06-16', time: '10:00', location: 'Conference Room' },
  { id: 2, title: 'Safety Training', date: '2025-06-20', time: '14:00', location: 'Hall A' },
];

const leaveDays = ['2025-06-03', '2025-06-04'];
const holidays = ['2025-06-02', '2025-06-25'];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Get day name from date
const getDayNameFromDate = (date) => {
  const dayIndex = date.getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[dayIndex];
};

export default function StaffSchedule() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [customActions, setCustomActions] = useState({});
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [actionForm, setActionForm] = useState({ action: '', type: 'work' });
  const [editingAction, setEditingAction] = useState(null);

  const userRole = user?.staffRole || 'maintenance';
  const scheduleData = scheduleByRole[userRole] || defaultSchedule;

  // Get week days starting from Monday
  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(addDays(start, i));
    }
    return week;
  };

  const weekDaysArray = getWeekDays();

  const getDaySchedule = (date) => {
    const dayName = getDayNameFromDate(date);
    const dateStr = format(date, 'yyyy-MM-dd');
    const shifts = scheduleData.shifts.filter(s => s.day === dayName);
    const meetings = mockMeetings.filter(m => m.date === dateStr);
    const userActions = customActions[dayName] || [];
    const isLeave = leaveDays.includes(dateStr);
    const isHoliday = holidays.includes(dateStr);
    const isDayOff = shifts.length === 0 && !isLeave && !isHoliday;
    return { shifts, meetings, userActions, isLeave, isHoliday, isDayOff, dayName };
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const handleAddAction = (day, time) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setEditingAction(null);
    setActionForm({ action: '', type: 'work' });
    setShowActionModal(true);
  };

  const handleEditAction = (day, action) => {
    setSelectedDay(day);
    setSelectedTime(action.time);
    setEditingAction(action);
    setActionForm({ action: action.action, type: action.type });
    setShowActionModal(true);
  };

  const handleSaveAction = () => {
    if (!actionForm.action.trim()) return;

    setCustomActions(prev => {
      const updated = { ...prev };
      if (!updated[selectedDay]) updated[selectedDay] = [];

      if (editingAction) {
        updated[selectedDay] = updated[selectedDay].map(a =>
          a.time === selectedTime ? { ...a, action: actionForm.action, type: actionForm.type } : a
        );
      } else {
        const existing = updated[selectedDay].find(a => a.time === selectedTime);
        if (existing) {
          updated[selectedDay] = updated[selectedDay].map(a =>
            a.time === selectedTime ? { ...a, action: actionForm.action, type: actionForm.type } : a
          );
        } else {
          updated[selectedDay].push({ time: selectedTime, action: actionForm.action, type: actionForm.type });
          updated[selectedDay].sort((a, b) => a.time.localeCompare(b.time));
        }
      }
      return updated;
    });

    setShowActionModal(false);
    setActionForm({ action: '', type: 'work' });
  };

  const handleDeleteAction = (day, time) => {
    if (window.confirm('Delete this action?')) {
      setCustomActions(prev => {
        const updated = { ...prev };
        updated[day] = updated[day].filter(a => a.time !== time);
        return updated;
      });
    }
  };

  const getActionTypeColor = (type) => {
    switch (type) {
      case 'work': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'break': return 'bg-green-100 text-green-700 border-green-200';
      case 'meeting': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'task': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'personal': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getActionTypeEmoji = (type) => {
    switch (type) {
      case 'work': return '💼';
      case 'break': return '☕';
      case 'meeting': return '📅';
      case 'task': return '✅';
      case 'personal': return '👤';
      default: return '📌';
    }
  };

  const getCurrentShiftInfo = () => {
    const today = new Date();
    const dayName = getDayNameFromDate(today);
    const todayShifts = scheduleData.shifts.filter(s => s.day === dayName);
    const now = today.getHours() * 60 + today.getMinutes();
    
    for (const shift of todayShifts) {
      if (shift.start === 'OFF') continue;
      const [startHour, startMin] = shift.start.split(':').map(Number);
      const [endHour, endMin] = shift.end.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      if (now >= startMinutes && now < endMinutes) {
        return { currentShift: `${shift.start} - ${shift.end} (${shift.type})`, nextShift: null };
      }
    }
    return { currentShift: 'Not on shift', nextShift: scheduleData.nextShift || 'Next shift' };
  };

  const shiftInfo = getCurrentShiftInfo();

  // Year view data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yearData = {
    'Jan': { workDays: 22, leaveDays: 2, holidays: 1 },
    'Feb': { workDays: 20, leaveDays: 1, holidays: 0 },
    'Mar': { workDays: 21, leaveDays: 0, holidays: 0 },
    'Apr': { workDays: 20, leaveDays: 3, holidays: 1 },
    'May': { workDays: 21, leaveDays: 1, holidays: 1 },
    'Jun': { workDays: 22, leaveDays: 0, holidays: 0 },
    'Jul': { workDays: 23, leaveDays: 2, holidays: 0 },
    'Aug': { workDays: 21, leaveDays: 1, holidays: 0 },
    'Sep': { workDays: 22, leaveDays: 1, holidays: 0 },
    'Oct': { workDays: 22, leaveDays: 0, holidays: 0 },
    'Nov': { workDays: 20, leaveDays: 2, holidays: 1 },
    'Dec': { workDays: 19, leaveDays: 4, holidays: 2 },
  };

  // Time slots for the week view
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  // ===== MONTH VIEW FUNCTIONS =====
  const [monthDate, setMonthDate] = useState(new Date());

  const getMonthDays = () => {
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start, end });
    
    // Get day of week for first day (0 = Sunday)
    const firstDayOfMonth = getDay(start);
    
    // Add empty slots for days before the first day of month
    const emptySlots = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const paddedDays = [];
    
    for (let i = 0; i < emptySlots; i++) {
      paddedDays.push(null);
    }
    
    paddedDays.push(...days);
    return paddedDays;
  };

  const getMonthDaySchedule = (date) => {
    if (!date) return { shifts: [], meetings: [], userActions: [], isLeave: false, isHoliday: false, isDayOff: false };
    const dayName = getDayNameFromDate(date);
    const dateStr = format(date, 'yyyy-MM-dd');
    const shifts = scheduleData.shifts.filter(s => s.day === dayName);
    const meetings = mockMeetings.filter(m => m.date === dateStr);
    const userActions = customActions[dayName] || [];
    const isLeave = leaveDays.includes(dateStr);
    const isHoliday = holidays.includes(dateStr);
    const isDayOff = shifts.length === 0 && !isLeave && !isHoliday;
    return { shifts, meetings, userActions, isLeave, isHoliday, isDayOff };
  };

  const goToPrevMonth = () => {
    setMonthDate(subMonths(monthDate, 1));
  };

  const goToNextMonth = () => {
    setMonthDate(addMonths(monthDate, 1));
  };

  const monthDays = getMonthDays();

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-900">📅 My Schedule</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'week' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
          >
            Week
          </button>
          <button 
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'month' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
          >
            Month
          </button>
          <button 
            onClick={() => setViewMode('year')}
            className={`px-4 py-2 rounded-lg ${viewMode === 'year' ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300'}`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Current Shift Status */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-sm text-blue-600 font-medium">Current Status</span>
            <p className="text-blue-900 font-semibold">{shiftInfo.currentShift}</p>
          </div>
          <div>
            <span className="text-sm text-blue-600 font-medium">Next Shift</span>
            <p className="text-blue-700">{scheduleData.nextShift || 'No upcoming shift'}</p>
          </div>
          <div>
            <span className="text-sm text-blue-600 font-medium">Role</span>
            <p className="text-blue-700 capitalize">{userRole.replace('-', ' ')}</p>
          </div>
        </div>
      </div>

      {/* ===== WEEK VIEW ===== */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <button 
              onClick={() => navigateWeek(-1)}
              className="text-blue-900 hover:bg-blue-50 px-3 py-1 rounded"
            >
              ← Previous
            </button>
            <span className="font-semibold">
              {format(weekDaysArray[0], 'MMM d')} - {format(weekDaysArray[6], 'MMM d, yyyy')}
            </span>
            <button 
              onClick={() => navigateWeek(1)}
              className="text-blue-900 hover:bg-blue-50 px-3 py-1 rounded"
            >
              Next →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-2 py-3 text-center text-sm font-semibold text-gray-600 min-w-[80px]">Time</th>
                  {weekDaysArray.map((day, idx) => {
                    const dayName = getDayNameFromDate(day);
                    return (
                      <th key={idx} className="px-2 py-3 text-center text-sm font-semibold text-gray-600 min-w-[120px]">
                        {format(day, 'EEE')}
                        <div className={`text-lg font-bold ${isToday(day) ? 'text-orange-500' : 'text-gray-800'}`}>
                          {format(day, 'd')}
                        </div>
                        <div className="text-xs text-gray-400">{dayName}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time} className="border-b hover:bg-gray-50">
                    <td className="px-2 py-2 text-sm font-medium text-gray-500 text-center">{time}</td>
                    {weekDaysArray.map((day, idx) => {
                      const { shifts, meetings, userActions, isLeave, isHoliday, isDayOff, dayName } = getDaySchedule(day);
                      
                      const shift = shifts.find(s => s.start === time);
                      const meeting = meetings.find(m => m.time === time);
                      const customAction = userActions.find(a => a.time === time);
                      
                      return (
                        <td key={idx} className="px-1 py-2 text-center min-h-[40px] relative border-r last:border-r-0">
                          {isHoliday && <div className="text-xs text-red-500">🎉</div>}
                          {isLeave && <div className="text-xs text-green-500">🌴</div>}
                          {isDayOff && !isHoliday && !isLeave && <div className="text-xs text-gray-400">Off</div>}
                          
                          {shift && (
                            <div className="bg-blue-100 text-blue-700 text-xs rounded px-1 py-0.5 mb-1">
                              {shift.type}
                            </div>
                          )}
                          
                          {meeting && (
                            <div className="bg-orange-100 text-orange-700 text-xs rounded px-1 py-0.5 mb-1">
                              📌 {meeting.title}
                            </div>
                          )}
                          
                          {customAction && (
                            <div 
                              className={`${getActionTypeColor(customAction.type)} text-xs rounded px-1 py-0.5 mb-1 cursor-pointer hover:opacity-80 transition-opacity group relative`}
                              onClick={() => handleEditAction(dayName, customAction)}
                            >
                              <span>{getActionTypeEmoji(customAction.type)} {customAction.action}</span>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAction(dayName, customAction.time);
                                }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                          
                          {!shift && !meeting && !customAction && !isHoliday && !isLeave && !isDayOff && (
                            <button 
                              onClick={() => handleAddAction(dayName, time)}
                              className="w-full h-6 text-gray-300 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors text-xs"
                            >
                              +
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t flex flex-wrap gap-3 text-xs text-gray-500">
            <span>💼 Work</span>
            <span>☕ Break</span>
            <span>📅 Meeting</span>
            <span>✅ Task</span>
            <span>👤 Personal</span>
            <span className="text-blue-500">Click + to add custom action</span>
          </div>
        </div>
      )}

      {/* ===== MONTH VIEW ===== */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={goToPrevMonth}
              className="text-blue-900 hover:bg-blue-50 px-3 py-1 rounded"
            >
              ← Previous
            </button>
            <span className="font-semibold text-lg">{format(monthDate, 'MMMM yyyy')}</span>
            <button 
              onClick={goToNextMonth}
              className="text-blue-900 hover:bg-blue-50 px-3 py-1 rounded"
            >
              Next →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={idx} className="text-center text-sm font-semibold text-gray-500 py-2">
                {day}
              </div>
            ))}
            {monthDays.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="border rounded-lg p-2 min-h-[70px] bg-gray-50"></div>;
              }
              const { isLeave, isHoliday, isDayOff } = getMonthDaySchedule(day);
              let bgColor = 'hover:bg-gray-50';
              if (isHoliday) bgColor = 'bg-red-50 hover:bg-red-100';
              else if (isLeave) bgColor = 'bg-green-50 hover:bg-green-100';
              else if (isDayOff) bgColor = 'bg-gray-50 hover:bg-gray-100';
              
              const isTodayDate = isToday(day);
              
              return (
                <div key={idx} className={`border rounded-lg p-2 min-h-[70px] ${bgColor} transition-colors cursor-pointer ${isTodayDate ? 'ring-2 ring-orange-500' : ''}`}>
                  <div className="text-sm font-medium">{format(day, 'd')}</div>
                  {isHoliday && <div className="text-xs text-red-600">🎉</div>}
                  {isLeave && <div className="text-xs text-green-600">🌴</div>}
                  {isDayOff && !isHoliday && !isLeave && <div className="text-xs text-gray-400">Off</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== YEAR VIEW ===== */}
      {viewMode === 'year' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">{format(currentDate, 'yyyy')} Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {months.map((month) => {
              const data = yearData[month];
              return (
                <div key={month} className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(months.indexOf(month));
                  setCurrentDate(newDate);
                  setViewMode('month');
                }}>
                  <div className="font-semibold text-blue-900 text-center mb-3">{month}</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Work Days</span>
                      <span className="font-medium">{data.workDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Leave</span>
                      <span className="font-medium text-green-600">{data.leaveDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Holidays</span>
                      <span className="font-medium text-red-600">{data.holidays}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add/Edit Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              {editingAction ? 'Edit Action' : 'Add Custom Action'}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                <input 
                  type="text" 
                  value={selectedDay} 
                  disabled 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input 
                  type="text" 
                  value={selectedTime} 
                  disabled 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <input 
                  type="text" 
                  placeholder="What are you doing?" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={actionForm.action}
                  onChange={(e) => setActionForm({...actionForm, action: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  value={actionForm.type}
                  onChange={(e) => setActionForm({...actionForm, type: e.target.value})}
                >
                  <option value="work">💼 Work</option>
                  <option value="break">☕ Break</option>
                  <option value="meeting">📅 Meeting</option>
                  <option value="task">✅ Task</option>
                  <option value="personal">👤 Personal</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowActionModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveAction}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                {editingAction ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}