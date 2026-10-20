// src/components/TestApi.jsx
import { useState } from 'react';
import { api } from '../services';

export default function TestApi() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Test the public endpoint first
      const response = await api.get('/public/test');
      console.log('API Response:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('API Error:', error);
      
      // Check if it's a connection error
      if (error.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Make sure the backend is running on http://localhost:8081');
      } else if (error.response) {
        setError(`Server error: ${error.response.status} - ${error.response.data?.message || error.message}`);
      } else {
        setError(`Error: ${error.message}`);
      }
      
      setResult({ 
        success: false, 
        error: error.message,
        details: error.response?.data || 'No additional details'
      });
    } finally {
      setLoading(false);
    }
  };

  const testAuth = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Test login endpoint
      const response = await api.post('/auth/login', {
        username: 'admin',
        password: 'password'
      });
      console.log('Auth Response:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('Auth Error:', error);
      setError(`Auth error: ${error.message}`);
      setResult({ 
        success: false, 
        error: error.message,
        details: error.response?.data || 'No additional details'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">🔌 API Connection Test</h3>
      
      <div className="flex gap-3 mb-4">
        <button 
          onClick={testApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-colors"
        >
          {loading ? '⏳ Testing...' : '🔗 Test Public API'}
        </button>
        
        <button 
          onClick={testAuth}
          disabled={loading}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
        >
          {loading ? '⏳ Testing...' : '🔐 Test Auth API'}
        </button>
        
        <button 
          onClick={() => {
            setResult(null);
            setError(null);
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Connection Status */}
      <div className="mb-4 text-sm">
        <span className="font-medium">Status: </span>
        {loading ? (
          <span className="text-yellow-600">⏳ Testing connection...</span>
        ) : error ? (
          <span className="text-red-600">❌ {error}</span>
        ) : result ? (
          <span className="text-green-600">✅ Connection successful!</span>
        ) : (
          <span className="text-gray-500">Click a button to test</span>
        )}
      </div>

      {/* Result Display */}
      {result && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Response:</span>
            <span className={`text-xs px-2 py-1 rounded ${result.success !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {result.success !== false ? '✅ Success' : '❌ Failed'}
            </span>
          </div>
          <pre className="p-4 bg-gray-100 rounded-lg text-xs overflow-auto max-h-96 border border-gray-200">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {/* Connection Tips */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Tips:</h4>
        <ul className="space-y-1 text-blue-800">
          <li>• Make sure backend is running: <code className="bg-blue-100 px-2 py-0.5 rounded">http://localhost:8081</code></li>
          <li>• Check health endpoint: <code className="bg-blue-100 px-2 py-0.5 rounded">http://localhost:8081/actuator/health</code></li>
          <li>• Test credentials: username: <code className="bg-blue-100 px-2 py-0.5 rounded">admin</code>, password: <code className="bg-blue-100 px-2 py-0.5 rounded">password</code></li>
          <li>• Check CORS: Backend should allow requests from localhost:5173</li>
        </ul>
      </div>
    </div>
  );
}