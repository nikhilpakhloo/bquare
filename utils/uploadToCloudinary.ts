import axios from 'axios';

const cloudName = 'di3e0p4lg';
const uploadPreset = 'unsigned_prescription';

export const uploadToCloudinary = async (uri: string, mimeType: string, fileName: string) => {
  const data = new FormData();

  data.append('file', {
    uri,
    type: mimeType,
    name: fileName,
  } as any);
  data.append('upload_preset', uploadPreset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.secure_url;
};
