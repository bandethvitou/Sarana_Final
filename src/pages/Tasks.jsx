    import { useState } from 'react';

    const initialTasks = [
    { id: 1, title: 'Prepare admission forms', assignedTo: 'Ms. Siti', assignedBy: 'Mr. Rudi', dueDate: '2025-06-10', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Inventory check', assignedTo: 'Mr. Budi', assignedBy: 'Mr. Rudi', dueDate: '2025-06-05', priority: 'Medium', status: 'In Progress' },
    { id: 3, title: 'Send report to director', assignedTo: 'Ms. Anna', assignedBy: 'Mr. John', dueDate: '2025-06-02', priority: 'Low', status: 'Completed' },
    ];

    export default function Tasks() {
    const [tasks, setTasks] = useState(initialTasks);
    const [search, setSearch] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');

    const filteredTasks = tasks.filter(t => {
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.assignedTo.toLowerCase().includes(search.toLowerCase());
        const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
        return matchSearch && matchPriority;
    });

    return (
        <div>
        <h1 className="text-2xl font-bold text-blue-900 mb-6">All Tasks</h1>
        <div className="flex gap-4 mb-4">
            <input placeholder="Search..." className="border rounded-lg px-4 py-2 w-64" value={search} onChange={e => setSearch(e.target.value)} />
            <select className="border rounded-lg px-4 py-2" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            </select>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Assigned To</th>
                <th className="px-4 py-3 text-left">Assigned By</th>
                <th className="px-4 py-3 text-left">Due Date</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredTasks.map(task => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{task.title}</td>
                    <td className="px-4 py-3">{task.assignedTo}</td>
                    <td className="px-4 py-3">{task.assignedBy}</td>
                    <td className="px-4 py-3">{task.dueDate}</td>
                    <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>{task.priority}</span>
                    </td>
                    <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-700' : task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>{task.status}</span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    }