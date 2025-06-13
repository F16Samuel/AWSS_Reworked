import React, { useState, ChangeEvent } from 'react';
import { uploadImage } from '../services/api';

interface UploadResult {
  message: string;
  category: string;
  imageUrl: string;
}

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      const response = await uploadImage(selectedFile);
      setResult(response);
    } catch (err: any) {
      alert(err.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-md border w-fit space-y-3 bg-gray-100">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>

      {result && (
        <div className="mt-4 space-y-2">
          <p><strong>Category:</strong> {result.category}</p>
          <img
            src={`${process.env.NODE_SERVER}${result.imageUrl}`}
            alt="Uploaded"
            className="w-48 rounded shadow"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;