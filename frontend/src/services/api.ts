import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface UploadResult {
  message: string;
  category: string;
  imageUrl: string;
}

export const uploadImage = async (file: File): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post<UploadResult>(`${API_BASE_URL}/waste/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
