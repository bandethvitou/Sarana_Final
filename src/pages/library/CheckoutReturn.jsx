import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockStudents = [
  { id: 1, name: 'Sok Heng', class: 'Grade 10A' },
  { id: 2, name: 'Mey Lin', class: 'Grade 8B' },
  { id: 3, name: 'David', class: 'Grade 12A' },
];

const mockBooks = [
  { id: 'B001', title: 'Mathematics Grade 10', author: 'Mr. John' },
  { id: 'B002', title: 'Khmer Literature', author: 'Mrs. Srey' },
  { id: 'B003', title: 'Physics Textbook', author: 'Mr. David' },
];

export default function CheckoutReturn() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('checkout');
  const [checkoutForm, setCheckoutForm] = useState({
    student: '',
    book: '',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  const [returnForm, setReturnForm] = useState({
    book: '',
    student: '',
  });
  const [showOverdueFine, setShowOverdueFine] = useState(false);

  const handleCheckout = () => {
    if (!checkoutForm.student || !checkoutForm.book) {
      toast.error('Please select a student and a book');
      return;
    }
    toast.success('📤 Book checked out successfully!');
    setCheckoutForm({ student: '', book: '', dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] });
  };

  const handleReturn = () => {
    if (!returnForm.book) {
      toast.error('Please select a book to return');
      return;
    }
    // Simulate overdue check
    if (Math.random() > 0.5) {
      setShowOverdueFine(true);
    } else {
      toast.success('📥 Book returned successfully!');
      setReturnForm({ book: '', student: '' });
    }
  };

  const handleFinePayment = () => {
    toast.success('💰 Fine paid successfully! Book returned.');
    setShowOverdueFine(false);
    setReturnForm({ book: '', student: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📤 Checkout / Return</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button onClick={() => setActiveTab('checkout')} className={`px-6 py-2.5 font-medium transition-all ${activeTab === 'checkout' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`}>
          📤 Checkout
        </button>
        <button onClick={() => setActiveTab('return')} className={`px-6 py-2.5 font-medium transition-all ${activeTab === 'return' ? 'text-blue-900 border-b-2 border-orange-500' : 'text-gray-500'}`}>
          📥 Return
        </button>
      </div>

      {/* Checkout Tab */}
      {activeTab === 'checkout' && (
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📤 Checkout Book</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student *</label>
              <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={checkoutForm.student} onChange={(e) => setCheckoutForm({...checkoutForm, student: e.target.value})}>
                <option value="">Select student...</option>
                {mockStudents.map(s => <option key={s.id} value={s.name}>{s.name} – {s.class}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Book *</label>
              <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={checkoutForm.book} onChange={(e) => setCheckoutForm({...checkoutForm, book: e.target.value})}>
                <option value="">Select book...</option>
                {mockBooks.map(b => <option key={b.id} value={b.title}>{b.title} – {b.author}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input type="date" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={checkoutForm.dueDate} onChange={(e) => setCheckoutForm({...checkoutForm, dueDate: e.target.value})} />
              <p className="text-xs text-gray-400 mt-1">Default: 14 days from today</p>
            </div>
            <button onClick={handleCheckout} className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
              📤 Checkout
            </button>
          </div>
        </div>
      )}

      {/* Return Tab */}
      {activeTab === 'return' && (
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📥 Return Book</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Book *</label>
              <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={returnForm.book} onChange={(e) => setReturnForm({...returnForm, book: e.target.value})}>
                <option value="">Select book...</option>
                {mockBooks.map(b => <option key={b.id} value={b.title}>{b.title} – {b.author}</option>)}
              </select>
            </div>
            {returnForm.book && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Student: <span className="font-medium">Sok Heng</span></p>
                <p className="text-sm text-gray-600">Class: <span className="font-medium">Grade 10A</span></p>
                <p className="text-sm text-gray-600">Checkout Date: <span className="font-medium">2025-06-07</span></p>
              </div>
            )}
            <button onClick={handleReturn} className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              📥 Return
            </button>
          </div>
        </div>
      )}

      {/* Overdue Fine Modal */}
      {showOverdueFine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">⚠️ Overdue Fine</h2>
            <div className="space-y-3">
              <p className="text-gray-700">This book is <span className="font-bold text-red-600">15 days overdue</span>.</p>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">Fine Amount</p>
                <p className="text-3xl font-bold text-red-600">$5.00</p>
              </div>
              <p className="text-sm text-gray-500">Please pay the fine to complete the return.</p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowOverdueFine(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleFinePayment} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Pay & Return</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}