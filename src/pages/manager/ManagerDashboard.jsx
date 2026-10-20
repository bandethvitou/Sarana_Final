// src/pages/topmanager/TopManagerScoreManagement.jsx
import { useState } from 'react';
import * as XLSX from 'xlsx';

// Mock data
const mockTeachers = [
{ id: 1, name: 'Mr. John', class: 'Grade 5A', subject: 'Math', status: 'done', progress: 100 },
{ id: 2, name: 'Mr. John', class: 'Grade 6A', subject: 'Math', status: 'in_progress', progress: 70 },
{ id: 3, name: 'Mrs.Linda', class: 'Grade 4A', subject: 'English', status: 'not_started', progress: 0 },
];

const mockStudents = [
{ id: 1, name_kh: 'គូសុខគុណរ៉ុខ្មែរ', name_en: 'KY SOKKUNVUTHI', sex: 'M', 
    homework: 8, group_work: 10, attendance: 10, activity: 9, 
    multiple_choice: 18, theory: 15, practice: 20, comment: 'Good progress' },
{ id: 2, name_kh: 'គីម ម៉េងហុង', name_en: 'Kim Menghong', sex: 'M', 
    homework: 7, group_work: 10, attendance: 8, activity: 8, 
    multiple_choice: 16, theory: 12, practice: 18, comment: 'Needs more homework' },
];

// Completion overview data
const completionData = [
{ level: 'Baby', percentage: '100%', status: '✅ Complete', details: '15/15 done' },
{ level: 'Kids', percentage: '80%', status: '⚠️ 12/15 done', details: 'In Progress' },
{ level: 'Junior', percentage: '75%', status: '9/12 done', details: 'In Progress' },
{ level: 'Senior', percentage: '75%', status: '9/12 done', details: 'In Progress' },
];

export default function TopManagerScoreManagement() {
const [teachers, setTeachers] = useState(mockTeachers);
const [selectedTeacher, setSelectedTeacher] = useState(null);
const [students, setStudents] = useState(mockStudents);
const [filters, setFilters] = useState({ level: 'Kids', subject: 'Math', teacher: 'All', term: 'Quarter 2', status: 'All' });

const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    // In real app, fetch students for that class/subject
};

const updateScore = (studentId, field, value) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, [field]: parseInt(value) || 0 } : s));
};

const exportToExcel = () => {
    const worksheetData = [
    ['No', 'Name KH', 'Name EN', 'Sex', 'Homework(10)', 'Group(10)', 'Attendance(10)', 'Activity(10)', 'Multiple Choice(20)', 'Theory(20)', 'Practice(20)', 'Comment'],
    ...students.map((s, idx) => [idx+1, s.name_kh, s.name_en, s.sex, s.homework, s.group_work, s.attendance, s.activity, s.multiple_choice, s.theory, s.practice, s.comment])
    ];
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ScoreSheet');
    XLSX.writeFile(wb, `score_${selectedTeacher?.name}_${selectedTeacher?.class}.xlsx`);
};

return (
    <div>
    <h1 className="text-2xl font-bold text-blue-900 mb-6">Score Management</h1>
    
    {/* Filters Section */}
    <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="flex flex-wrap gap-4">
        <div>
            <label className="block text-xs text-gray-500 mb-1">Level</label>
            <select 
            className="border rounded-lg px-3 py-2 text-sm bg-white"
            value={filters.level} 
            onChange={e => setFilters({...filters, level: e.target.value})}
            >
            <option>Baby</option>
            <option>Kids</option>
            <option>Junior</option>
            <option>Senior</option>
            </select>
        </div>
        <div>
            <label className="block text-xs text-gray-500 mb-1">Subject</label>
            <select 
            className="border rounded-lg px-3 py-2 text-sm bg-white"
            value={filters.subject} 
            onChange={e => setFilters({...filters, subject: e.target.value})}
            >
            <option>Math</option>
            <option>English</option>
            <option>Science</option>
            </select>
        </div>
        <div>
            <label className="block text-xs text-gray-500 mb-1">Teacher</label>
            <select 
            className="border rounded-lg px-3 py-2 text-sm bg-white"
            value={filters.teacher} 
            onChange={e => setFilters({...filters, teacher: e.target.value})}
            >
            <option>All</option>
            <option>Mr. John</option>
            <option>Mrs.Linda</option>
            </select>
        </div>
        <div>
            <label className="block text-xs text-gray-500 mb-1">Term</label>
            <select 
            className="border rounded-lg px-3 py-2 text-sm bg-white"
            value={filters.term} 
            onChange={e => setFilters({...filters, term: e.target.value})}
            >
            <option>Quarter 1</option>
            <option>Quarter 2</option>
            <option>Quarter 3</option>
            <option>Quarter 4</option>
            </select>
        </div>
        <div>
            <label className="block text-xs text-gray-500 mb-1">Status</label>
            <select 
            className="border rounded-lg px-3 py-2 text-sm bg-white"
            value={filters.status} 
            onChange={e => setFilters({...filters, status: e.target.value})}
            >
            <option>All</option>
            <option>Done</option>
            <option>In Progress</option>
            <option>Not Started</option>
            </select>
        </div>
        </div>
    </div>

    {/* Completion Overview Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {completionData.map((item, idx) => (
        <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-blue-900 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold text-blue-900">{item.level}</div>
            <div className="text-2xl font-bold text-blue-900">{item.percentage}</div>
            </div>
            <div className="text-sm text-gray-600 mb-1">{item.status}</div>
            <div className="text-xs text-gray-400">{item.details}</div>
        </div>
        ))}
    </div>

    {/* Teacher Score Sheets Table */}
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-blue-900">📊 Teacher Score Sheets</h2>
        <p className="text-sm text-gray-500 mt-1">Click Edit to enter or view scores</p>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
            <tr>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">Teacher</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">Class</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">Subject</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">Progress</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">Status</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">Actions</th>
            </tr>
            </thead>
            <tbody>
            {teachers.map(t => (
                <tr key={t.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium">{t.name}</td>
                <td className="px-5 py-3">{t.class}</td>
                <td className="px-5 py-3">{t.subject}</td>
                <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                        className="bg-blue-900 rounded-full h-2 transition-all"
                        style={{ width: `${t.progress}%` }}
                        ></div>
                    </div>
                    <span className="text-xs text-gray-500">{t.progress}%</span>
                    </div>
                </td>
                <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    t.status === 'done' ? 'bg-green-100 text-green-700' : 
                    t.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                    }`}>
                    {t.status === 'done' ? '✅ Done' : t.status === 'in_progress' ? '⚠️ In Progress' : '⏳ Not Started'}
                    </span>
                </td>
                <td className="px-5 py-3">
                    <button 
                    onClick={() => handleEdit(t)} 
                    className="text-orange-500 hover:text-orange-700 font-medium hover:underline transition-colors"
                    >
                    {t.status === 'done' ? 'View →' : 'Edit →'}
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>

    {/* Send Reminder Button */}
    <div className="flex justify-end">
        <button className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors shadow-sm">
        📧 Send Reminder to All
        </button>
    </div>

    {/* Score Entry Modal / Section */}
    {selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTeacher(null)}>
        <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">Score Entry</h2>
                <p className="text-sm text-blue-200">{selectedTeacher.name} – {selectedTeacher.class} – {selectedTeacher.subject}</p>
            </div>
            <div className="flex gap-2">
                <button 
                onClick={exportToExcel}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                >
                📎 Export Excel
                </button>
                <button 
                onClick={() => setSelectedTeacher(null)}
                className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                >
                ✕ Close
                </button>
            </div>
            </div>
            <div className="overflow-x-auto p-4 max-h-[calc(90vh-80px)]">
            <table className="w-full text-sm border rounded-lg">
                <thead className="bg-gray-50 sticky top-0">
                <tr>
                    <th className="p-2 border text-left">#</th>
                    <th className="p-2 border text-left">Name KH</th>
                    <th className="p-2 border text-left">Name EN</th>
                    <th className="p-2 border text-left">Sex</th>
                    <th className="p-2 border text-left">Home(10)</th>
                    <th className="p-2 border text-left">Group(10)</th>
                    <th className="p-2 border text-left">Attend(10)</th>
                    <th className="p-2 border text-left">Activity(10)</th>
                    <th className="p-2 border text-left">MC(20)</th>
                    <th className="p-2 border text-left">Theory(20)</th>
                    <th className="p-2 border text-left">Practice(20)</th>
                    <th className="p-2 border text-left">Comment</th>
                </tr>
                </thead>
                <tbody>
                {students.map((s, idx) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{idx+1}</td>
                    <td className="p-2 border">{s.name_kh}</td>
                    <td className="p-2 border">{s.name_en}</td>
                    <td className="p-2 border">{s.sex}</td>
                    <td className="p-2 border">
                        <input 
                        type="number" 
                        className="w-14 border rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={s.homework} 
                        onChange={e => updateScore(s.id, 'homework', e.target.value)} 
                        />
                    </td>
                    <td className="p-2 border">
                        <input 
                        type="number" 
                        className="w-14 border rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={s.group_work} 
                        onChange={e => updateScore(s.id, 'group_work', e.target.value)} 
                        />
                    </td>
                    <td className="p-2 border">
                        <input 
                        type="number" 
                        className="w-14 border rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={s.attendance} 
                        onChange={e => updateScore(s.id, 'attendance', e.target.value)} 
                        />
                    </td>
                    <td className="p-2 border">
                        <input 
                        type="number" 
                        className="w-14 border rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={s.activity} 
                        onChange={e => updateScore(s.id, 'activity', e.target.value)} 
                        />
                    </td>
                    <td className="p-2 border">
                        <input 
                        type="number" 
                        className="w-14 border rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={s.multiple_choice} 
                        onChange={e => updateScore(s.id, 'multiple_choice', e.target.value)} 
                        />
                    </td>
                    <td className="p-2 border">
                        <input 
                        type="number" 
                        className="w-14 border rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={s.theory} 
                        onChange={e => updateScore(s.id, 'theory', e.target.value)} 
                        />
                    </td>
                    <td className="p-2 border">
                        <input 
                        type="number" 
                        className="w-14 border rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={s.practice} 
                        onChange={e => updateScore(s.id, 'practice', e.target.value)} 
                        />
                    </td>
                    <td className="p-2 border">
                        <input 
                        type="text" 
                        className="w-32 border rounded p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={s.comment} 
                        onChange={e => updateScore(s.id, 'comment', e.target.value)} 
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-end gap-3">
                <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                💾 Save Changes
                </button>
                <button className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors">
                📤 Submit for Review
                </button>
            </div>
            </div>
        </div>
        </div>
    )}
    </div>
);
}