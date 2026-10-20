// src/pages/admissions/NewRegistration.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createRegistration } from '../../services/admissions';

export default function NewRegistration() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    level: 'Kids',
    class: '',
    dob: '',
    gender: 'Male',
    previousSchool: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setUploading(true);
    try {
      // Send form data to backend
      const response = await createRegistration(formData);
      if (response?.data?.success) {
        toast.success('✅ Student registered successfully!');
        setTimeout(() => navigate('/admissions'), 1500);
      } else {
        toast.error(response?.data?.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Registration failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const levels = ['Baby', 'Kids', 'Junior', 'Senior'];
  const classes = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🆕 New Registration</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 ${errors.studentName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Full name"
            />
            {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              {levels.map(level => <option key={level}>{level}</option>)}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">Select Class</option>
              {classes.map(cls => <option key={cls}>{cls}</option>)}
            </select>
          </div>

          {/* Parent Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 ${errors.parentName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Full name"
            />
            {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="parent@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="012-345-678"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Street, City, Province"
            />
          </div>

          {/* Previous School */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Previous School</label>
            <input
              type="text"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Previous school name (if any)"
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Any additional information..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button
            onClick={() => navigate('/admissions')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Registering...' : 'Register Student'}
          </button>
        </div>
      </div>
    </div>
  );
}