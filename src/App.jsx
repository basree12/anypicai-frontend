import React, { useState } from 'react';
import { UploadCloud, Download } from 'lucide-react';

export default function AnyPicAI() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResultUrl(null);
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await fetch('https://your-backend.com/api/convert', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResultUrl(data.editable_url);
    } catch (err) {
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🖼️ AnyPicAI</h1>
      <p className="mb-6 text-gray-600 text-center max-w-xl">
        Turn any image into an editable Canva-style design in seconds. Perfect for memes, flyers, and more.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        {preview && <img src={preview} alt="Preview" className="w-full mb-4 rounded-xl" />}

        <button
          onClick={handleUpload}
          disabled={loading || !image}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800"
        >
          <UploadCloud size={18} />
          {loading ? 'Processing...' : 'Convert to Editable'}
        </button>

        {resultUrl && (
          <a
            href={resultUrl}
            download
            className="mt-4 inline-flex items-center gap-2 text-green-600 hover:underline"
          >
            <Download size={18} /> Download Editable File
          </a>
        )}
      </div>
    </div>
  );
}
