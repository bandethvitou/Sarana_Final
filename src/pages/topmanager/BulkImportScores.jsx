// src/pages/topmanager/BulkImportScores.jsx
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';

export default function BulkImportScores() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [step, setStep] = useState(1); // 1: upload, 2: preview, 3: confirm
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Quarter 2');

  // Mock data
  const teachers = [
    { id: 1, name: 'Mr. John', class: 'Grade 5A', subject: 'Math' },
    { id: 2, name: 'Mr. John', class: 'Grade 6A', subject: 'Math' },
    { id: 3, name: 'Mrs. Linda', class: 'Grade 4A', subject: 'English' },
  ];

  const classes = [
    'Grade 4A', 'Grade 5A', 'Grade 6A', 'Grade 7A', 'Grade 8A'
  ];

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    
    // Preview Excel file
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Transform and validate data
      const formattedData = jsonData.slice(0, 10).map((row, idx) => ({
        id: idx + 1,
        name_kh: row['Name KH'] || row['ឈ្មោះ'] || '',
        name_en: row['Name EN'] || row['English Name'] || '',
        sex: row['Sex'] || row['ភេទ'] || '',
        homework: row['Homework'] || row['កិច្ចការផ្ទះ'] || 0,
        group_work: row['Group Work'] || row['ការងារជាក្រុម'] || 0,
        attendance: row['Attendance'] || row['វត្តមាន'] || 0,
        activity: row['Activity'] || row['សកម្មភាព'] || 0,
        multiple_choice: row['Multiple Choice'] || row['ជម្រើសច្រើន'] || 0,
        theory: row['Theory'] || row['ទ្រឹស្តី'] || 0,
        practice: row['Practice'] || row['ការអនុវត្ត'] || 0,
        comment: row['Comment'] || row['មតិ'] || '',
        isValid: true,
        errors: []
      }));
      
      setPreviewData(formattedData);
      setStep(2);
    };
    reader.readAsArrayBuffer(uploadedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxFiles: 1
  });

  const validateData = () => {
    const validated = previewData.map(student => {
      const errors = [];
      if (!student.name_kh && !student.name_en) errors.push('Name is required');
      if (student.homework > 10) errors.push('Homework cannot exceed 10');
      if (student.group_work > 10) errors.push('Group Work cannot exceed 10');
      if (student.attendance > 10) errors.push('Attendance cannot exceed 10');
      if (student.activity > 10) errors.push('Activity cannot exceed 10');
      if (student.multiple_choice > 20) errors.push('Multiple Choice cannot exceed 20');
      if (student.theory > 20) errors.push('Theory cannot exceed 20');
      if (student.practice > 20) errors.push('Practice cannot exceed 20');
      
      return {
        ...student,
        isValid: errors.length === 0,
        errors
      };
    });
    
    setPreviewData(validated);
    return validated.filter(s => !s.isValid).length === 0;
  };

  const handleImport = async () => {
    if (!selectedTeacher || !selectedClass) {
      alert('Please select teacher and class');
      return;
    }
    
    const isValid = validateData();
    if (!isValid) {
      alert('Please fix validation errors before importing');
      return;
    }
    
    setImporting(true);
    
    // Simulate API call
    setTimeout(() => {
      const validCount = previewData.filter(s => s.isValid).length;
      const invalidCount = previewData.filter(s => !s.isValid).length;
      
      setImportResult({
        success: true,
        total: previewData.length,
        valid: validCount,
        invalid: invalidCount,
        message: `Successfully imported ${validCount} student records`
      });
      setStep(3);
      setImporting(false);
    }, 2000);
  };

  const downloadTemplate = () => {
    const template = [
      ['Name KH', 'Name EN', 'Sex', 'Homework(10)', 'Group Work(10)', 'Attendance(10)', 'Activity(10)', 'Multiple Choice(20)', 'Theory(20)', 'Practice(20)', 'Comment'],
      ['គូសុខគុណរ៉ុខ្មែរ', 'KY SOKKUNVUTHI', 'M', 8, 10, 10, 9, 18, 15, 20, 'Good progress'],
      ['គីម ម៉េងហុង', 'Kim Menghong', 'M', 7, 10, 8, 8, 16, 12, 18, 'Needs improvement'],
      ['សុខ ច័ន្ទ', 'Sok Chan', 'F', 9, 9, 10, 9, 19, 18, 20, 'Excellent'],
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ScoreTemplate');
    XLSX.writeFile(wb, 'score_import_template.xlsx');
  };

  const resetImport = () => {
    setFile(null);
    setPreviewData([]);
    setImportResult(null);
    setStep(1);
    setSelectedTeacher('');
    setSelectedClass('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Bulk Import Scores</h1>
        <button
          onClick={() => navigate('/top-manager/score-management')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back to Score Management
        </button>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="font-semibold text-blue-900">Import Instructions</h3>
                <ul className="text-sm text-blue-800 mt-1 space-y-1">
                  <li>• Download the template file below</li>
                  <li>• Fill in student scores following the format</li>
                  <li>• Maximum scores: Homework(10), Group(10), Attendance(10), Activity(10), MC(20), Theory(20), Practice(20)</li>
                  <li>• Upload the completed Excel file (.xlsx or .xls)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Assignment Selection */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4 border-b pb-2">📌 Assignment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.subject} ({teacher.class})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Quarter 1</option>
                  <option>Quarter 2</option>
                  <option>Quarter 3</option>
                  <option>Quarter 4</option>
                </select>
              </div>
            </div>
          </div>

          {/* Download Template */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-blue-900">📥 Download Template</h2>
                <p className="text-sm text-gray-500 mt-1">Get the Excel template to fill in student scores</p>
              </div>
              <button
                onClick={downloadTemplate}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Download Template →
              </button>
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">📤 Upload File</h2>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-5xl mb-3">📎</div>
              {isDragActive ? (
                <p className="text-blue-600">Drop the Excel file here...</p>
              ) : (
                <>
                  <p className="text-gray-600">Drag & drop an Excel file here, or click to select</p>
                  <p className="text-sm text-gray-400 mt-1">Supports .xlsx, .xls files</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          {/* Preview Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-blue-900">📊 Preview Import Data</h2>
                <p className="text-sm text-gray-500">Found {previewData.length} student records</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleImport}
                  disabled={importing}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
                >
                  {importing ? 'Importing...' : 'Confirm Import →'}
                </button>
              </div>
            </div>
            
            {/* Validation Summary */}
            <div className="mb-4 flex gap-3">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                ✅ Valid: {previewData.filter(s => s.isValid).length}
              </div>
              <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                ⚠️ Invalid: {previewData.filter(s => !s.isValid).length}
              </div>
            </div>
          </div>

          {/* Data Preview Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">#</th>
                    <th className="px-3 py-2 text-left">Name KH</th>
                    <th className="px-3 py-2 text-left">Name EN</th>
                    <th className="px-3 py-2 text-left">Sex</th>
                    <th className="px-3 py-2 text-left">Home</th>
                    <th className="px-3 py-2 text-left">Group</th>
                    <th className="px-3 py-2 text-left">Attend</th>
                    <th className="px-3 py-2 text-left">Activity</th>
                    <th className="px-3 py-2 text-left">MC</th>
                    <th className="px-3 py-2 text-left">Theory</th>
                    <th className="px-3 py-2 text-left">Practice</th>
                    <th className="px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((student, idx) => (
                    <tr key={idx} className={`border-b ${!student.isValid ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-3 py-2">{idx + 1}</td>
                      <td className="px-3 py-2">{student.name_kh}</td>
                      <td className="px-3 py-2">{student.name_en}</td>
                      <td className="px-3 py-2">{student.sex}</td>
                      <td className="px-3 py-2">{student.homework}</td>
                      <td className="px-3 py-2">{student.group_work}</td>
                      <td className="px-3 py-2">{student.attendance}</td>
                      <td className="px-3 py-2">{student.activity}</td>
                      <td className="px-3 py-2">{student.multiple_choice}</td>
                      <td className="px-3 py-2">{student.theory}</td>
                      <td className="px-3 py-2">{student.practice}</td>
                      <td className="px-3 py-2">
                        {student.isValid ? (
                          <span className="text-green-600">✓ Valid</span>
                        ) : (
                          <span className="text-red-600 text-xs" title={student.errors.join(', ')}>
                            ⚠️ {student.errors.length} error(s)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {step === 3 && importResult && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          {importResult.success ? (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Import Successful!</h2>
              <p className="text-gray-600 mb-4">{importResult.message}</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{importResult.valid}</div>
                  <div className="text-sm text-gray-600">Records Imported</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{importResult.invalid}</div>
                  <div className="text-sm text-gray-600">Skipped</div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={resetImport}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Import Another File
                </button>
                <button
                  onClick={() => navigate('/top-manager/score-management')}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                >
                  Go to Score Management
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Import Failed</h2>
              <p className="text-gray-600 mb-4">{importResult.message}</p>
              <button
                onClick={resetImport}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-blue-900' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-blue-900' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>
            3
          </div>
        </div>
      </div>
    </div>
  );
}