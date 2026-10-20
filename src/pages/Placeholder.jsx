export default function Placeholder({ title }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-4">{title}</h1>
      <div className="bg-white rounded-xl p-12 shadow-sm text-center text-gray-400">
        🚧 This page is under construction.
      </div>
    </div>
  );
}