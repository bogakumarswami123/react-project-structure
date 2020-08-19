import api from './api';

export async function uploadImage({ location, file }) {
  const res = await api.promise({
    method: 'POST',
    path: '/files/upload',
    form: {
      location,
      file,
    },
  });
  return res.data;
}

export default {
  uploadImage,
};
