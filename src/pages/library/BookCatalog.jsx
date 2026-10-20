import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockBooks = [
  { id: 'B001', title: 'Mathematics Grade 10', author: 'Mr. John', isbn: '978-123-456', category: 'Textbook', level: 'Senior', quantity: 5, available: 3, status: 'available' },
  { id: 'B002', title: 'Khmer Literature', author: 'Mrs. Srey', isbn: '978-123-457', category: 'Textbook', level: 'Junior', quantity: 8, available: 4, status: 'available' },
  { id: 'B003', title: 'Physics Textbook', author: 'Mr. David', isbn: '978-123-458', category: 'Textbook', level: 'Senior', quantity: 3, available: 1, status: 'checked-out' },
  { id: 'B004', title: 'English Grammar', author: 'Ms. Anna', isbn: '978-123-459', category: 'Textbook', level: 'All', quantity: 10, available: 6, status: 'available' },
  { id: 'B005', title: 'Biology Textbook', author: 'Mr. Rudi', isbn: '978-123-460', category: 'Textbook', level: 'Senior', quantity: 4, available: 2, status: 'available' },
  { id: 'B006', title: 'History Book', author: 'Mrs. Lisa', isbn: '978-123-461', category: 'Reference', level: 'All', quantity: 6, available: 5, status: 'available' },
  { id: 'B007', title: 'Geography Atlas', author: 'Mr. Mike', isbn: '978-123-462', category: 'Reference', level: 'All', quantity: 3, available: 0, status: 'reserved' },
];

const categories = ['All', 'Textbook', 'Story', 'Reference', 'Other'];
const levels = ['All', 'Baby', 'Kids', 'Junior', 'Senior'];

export default function BookCatalog() {
  const navigate = useNavigate();
  const [books, setBooks] = useState(mockBooks);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Textbook',
    level: 'All',
    quantity: 1,
    location: 'A1',
  });

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search);
    const matchCategory = categoryFilter === 'All' || b.category === categoryFilter;
    const matchLevel = levelFilter === 'All' || b.level === levelFilter;
    return matchSearch && matchCategory && matchLevel;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✅ Available</span>;
      case 'checked-out': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">📤 Checked Out</span>;
      case 'reserved': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 Reserved</span>;
      default: return null;
    }
  };

  const handleAddBook = () => {
    if (!form.title || !form.author) {
      toast.error('Please fill in title and author');
      return;
    }
    const newBook = {
      id: `B${String(books.length + 1).padStart(3, '0')}`,
      ...form,
      available: form.quantity,
      status: 'available',
    };
    setBooks([...books, newBook]);
    setShowModal(false);
    setForm({ title: '', author: '', isbn: '', category: 'Textbook', level: 'All', quantity: 1, location: 'A1' });
    toast.success('✅ Book added successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this book?')) {
      setBooks(books.filter(b => b.id !== id));
      toast.success('🗑️ Book deleted');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📖 Book Catalog</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          {levels.map(l => <option key={l}>{l}</option>)}
        </select>
        <button onClick={() => { setEditingBook(null); setShowModal(true); }} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
          + Add Book
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">ISBN</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Qty/Avail</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((book) => (
              <tr key={book.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs font-bold">{book.id}</td>
                <td className="px-4 py-3 font-medium">{book.title}</td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3 text-xs">{book.isbn}</td>
                <td className="px-4 py-3">{book.category}</td>
                <td className="px-4 py-3">{book.level}</td>
                <td className="px-4 py-3">{book.quantity}/{book.available}</td>
                <td className="px-4 py-3">{getStatusBadge(book.status)}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-900 hover:underline text-sm mr-2">✏️</button>
                  <button onClick={() => handleDelete(book.id)} className="text-red-500 hover:underline text-sm">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-8 text-gray-400">No books found</div>}
      </div>

      {/* Add Book Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">{editingBook ? '✏️ Edit Book' : '📖 Add New Book'}</h2>
            <div className="space-y-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input type="text" className="w-full border rounded-lg px-4 py-2" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Author *</label><input type="text" className="w-full border rounded-lg px-4 py-2" value={form.author} onChange={(e) => setForm({...form, author: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label><input type="text" className="w-full border rounded-lg px-4 py-2" value={form.isbn} onChange={(e) => setForm({...form, isbn: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label><select className="w-full border rounded-lg px-4 py-2" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>{categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Level</label><select className="w-full border rounded-lg px-4 py-2" value={form.level} onChange={(e) => setForm({...form, level: e.target.value})}>{levels.filter(l => l !== 'All').map(l => <option key={l}>{l}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label><input type="number" min="1" className="w-full border rounded-lg px-4 py-2" value={form.quantity} onChange={(e) => setForm({...form, quantity: parseInt(e.target.value) || 1})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Shelf Location</label><input type="text" className="w-full border rounded-lg px-4 py-2" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} placeholder="A1, B2, etc." /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddBook} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">{editingBook ? 'Update' : 'Add Book'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}