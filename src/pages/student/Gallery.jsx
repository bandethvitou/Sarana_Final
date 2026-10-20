import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const albums = [
  { id: 1, title: 'Sports Day', cover: '🏃', photos: 15 },
  { id: 2, title: 'Science Fair', cover: '🔬', photos: 12 },
  { id: 3, title: 'Graduation', cover: '🎓', photos: 20 },
  { id: 4, title: 'School Events', cover: '🎉', photos: 8 },
  { id: 5, title: 'Class Activities', cover: '📚', photos: 10 },
];

const photos = [
  { id: 1, title: 'Opening Ceremony', album: 'School Events' },
  { id: 2, title: 'Science Experiment', album: 'Science Fair' },
  { id: 3, title: 'Football Match', album: 'Sports Day' },
  { id: 4, title: 'Graduation Day', album: 'Graduation' },
  { id: 5, title: 'Class Discussion', album: 'Class Activities' },
];

export default function Gallery() {
  const navigate = useNavigate();
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos = selectedAlbum
    ? photos.filter(p => p.album === selectedAlbum)
    : photos;

  const albumColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100', 'bg-pink-100'];

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📸 Gallery</h1>

      {selectedPhoto ? (
        // Fullscreen Photo View
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300"
            >
              ✕
            </button>
            <div className="text-white text-center">
              <div className="text-8xl mb-4">🖼️</div>
              <p className="text-xl font-bold">{selectedPhoto.title}</p>
              <p className="text-gray-400">{selectedPhoto.album}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {selectedAlbum ? (
            // Album View - Photo Grid
            <div>
              <button
                onClick={() => setSelectedAlbum(null)}
                className="mb-4 text-blue-900 hover:underline flex items-center gap-2"
              >
                ← Back to Albums
              </button>
              <h2 className="text-xl font-bold text-blue-900 mb-4">{selectedAlbum}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="bg-white rounded-xl shadow-sm p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="text-6xl mb-2">🖼️</div>
                    <p className="text-sm font-medium">{photo.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Album Cards View
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {albums.map((album, idx) => (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbum(album.title)}
                  className={`${albumColors[idx % albumColors.length]} rounded-xl shadow-sm p-6 text-center cursor-pointer hover:shadow-md transition-shadow`}
                >
                  <div className="text-6xl mb-3">{album.cover}</div>
                  <h3 className="font-bold text-blue-900">{album.title}</h3>
                  <p className="text-sm text-gray-500">{album.photos} photos</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}