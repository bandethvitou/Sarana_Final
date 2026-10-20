// src/pages/topmanager/CreateScoreSheet.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateScoreSheet() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    level: 'Kids',
    program: 'Full Time',
    academicYear: '2025-2026',
    term: 'Quarter 2',
    subject: 'Math',
    teacherId: '',
    classId: '',
    dueDate: '',
    maxScores: {
      homework: 10,
      groupWork: 10,
      attendance: 10,
      activity: 10,
      multipleChoice: 20,
      theory: 20,
      practice: 20
    }
  });

  const [errors, setErrors] = useState({});

  // Mock data
  const teachers = [
    { id: 1, name: 'Mr. John', department: 'Mathematics' },
    { id: 2, name: 'Mrs. Linda', department: 'English' },
    { id: 3, name: 'Mr. Sophea', department: 'Science' },
    { id: 4, name: 'Ms. Dara', department: 'Khmer Literature' },
  ];

  const classes = [
    { id: 1, name: 'Grade 4A', level: 'Kids', teacher: 'Mrs. Linda' },
    { id: 2, name: 'Grade 5A', level: 'Kids', teacher: 'Mr. John' },
    { id: 3, name: 'Grade 6A', level: 'Junior', teacher: 'Mr. John' },
    { id: 4, name: 'Grade 7A', level: 'Junior', teacher: 'Mr. Sophea' },
    { id: 5, name: 'Grade 8A', level: 'Senior', teacher: 'Ms. Dara' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMaxScoreChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      maxScores: { ...prev.maxScores, [field]: parseInt(value) || 0 }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teacherId) newErrors.teacherId = 'Please select a teacher';
    if (!formData.classId) newErrors.classId = 'Please select a class';
    if (!formData.dueDate) newErrors.dueDate = 'Please select a due date';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In real app, submit to API
      console.log('Score sheet created:', formData);
      alert('Score sheet created successfully!');
      navigate('/top-manager/score-management');
    }
  };

  const filteredClasses = classes.filter(c => 
    !formData.level || c.level === formData.level
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Create New Score Sheet</h1>
        <button
          onClick={() => navigate('/top-manager/score-management')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back to Score Management
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-4 border-b pb-2">📋 Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Baby">Baby (3-4 years)</option>
                    <option value="Kids">Kids (5-6 years)</option>
                    <option value="Junior">Junior (7-9 years)</option>
                    <option value="Senior">Senior (10-12 years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Weekend">Weekend</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                  <select
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Quarter 1">Quarter 1 (Oct-Dec)</option>
                    <option value="Quarter 2">Quarter 2 (Jan-Mar)</option>
                    <option value="Quarter 3">Quarter 3 (Apr-Jun)</option>
                    <option value="Quarter 4">Quarter 4 (Jul-Sep)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Math">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Science">Science</option>
                    <option value="Khmer">Khmer Literature</option>
                    <option value="Social">Social Studies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dueDate ? 'border-red-500' : ''}`}
                  />
                  {errors.dueDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-4 border-b pb-2">👥 Assignment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.teacherId ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.department}
                      </option>
                    ))}
                  </select>
                  {errors.teacherId && (
                    <p className="text-red-500 text-xs mt-1">{errors.teacherId}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="classId"
                    value={formData.classId}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.classId ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Class</option>
                    {filteredClasses.map(cls => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} ({cls.level}) - {cls.teacher}
                      </option>
                    ))}
                  </select>
                  {errors.classId && (
                    <p className="text-red-500 text-xs mt-1">{errors.classId}</p>
                  )}
                  {formData.level && filteredClasses.length === 0 && (
                    <p className="text-yellow-500 text-xs mt-1">No classes found for this level</p>
                  )}
                </div>
              </div>
            </div>

            {/* Score Configuration */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-4 border-b pb-2">⚙️ Score Configuration</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Homework (max)</label>
                  <input
                    type="number"
                    value={formData.maxScores.homework}
                    onChange={e => handleMaxScoreChange('homework', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-center"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Group Work (max)</label>
                  <input
                    type="number"
                    value={formData.maxScores.groupWork}
                    onChange={e => handleMaxScoreChange('groupWork', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-center"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Attendance (max)</label>
                  <input
                    type="number"
                    value={formData.maxScores.attendance}
                    onChange={e => handleMaxScoreChange('attendance', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-center"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Activity (max)</label>
                  <input
                    type="number"
                    value={formData.maxScores.activity}
                    onChange={e => handleMaxScoreChange('activity', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-center"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Multiple Choice (max)</label>
                  <input
                    type="number"
                    value={formData.maxScores.multipleChoice}
                    onChange={e => handleMaxScoreChange('multipleChoice', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-center"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Theory (max)</label>
                  <input
                    type="number"
                    value={formData.maxScores.theory}
                    onChange={e => handleMaxScoreChange('theory', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-center"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Practice (max)</label>
                  <input
                    type="number"
                    value={formData.maxScores.practice}
                    onChange={e => handleMaxScoreChange('practice', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-center"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  📊 Total Maximum Score: <strong>
                    {Object.values(formData.maxScores).reduce((a, b) => a + b, 0)}
                  </strong> points
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-sm p-6 text-white sticky top-6">
              <h3 className="text-lg font-semibold mb-4">📝 Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Level:</span>
                  <span className="font-semibold">{formData.level}</span>
                </div>
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Program:</span>
                  <span className="font-semibold">{formData.program}</span>
                </div>
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Term:</span>
                  <span className="font-semibold">{formData.term}</span>
                </div>
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Subject:</span>
                  <span className="font-semibold">{formData.subject}</span>
                </div>
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Teacher:</span>
                  <span className="font-semibold">
                    {teachers.find(t => t.id === parseInt(formData.teacherId))?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-blue-700 pb-2">
                  <span>Class:</span>
                  <span className="font-semibold">
                    {classes.find(c => c.id === parseInt(formData.classId))?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <span className="font-semibold">{formData.dueDate || 'Not set'}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors mb-3"
              >
                ✨ Create Score Sheet
              </button>
              <button
                type="button"
                onClick={() => navigate('/top-manager/score-management')}
                className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex gap-2">
                <span className="text-yellow-600 text-lg">💡</span>
                <div>
                  <h4 className="font-semibold text-yellow-800 text-sm">Quick Tips</h4>
                  <p className="text-xs text-yellow-700 mt-1">
                    • Teachers will be notified automatically<br/>
                    • Score sheets can be edited until due date<br/>
                    • Submit for review after teacher completes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}