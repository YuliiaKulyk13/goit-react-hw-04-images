import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImagesGallery(imageName, page) {
  const response = await axios.get('', {
    params: {
      key: '33700008-b0f3fc2623c0687ada0dd2d9b',
      q: imageName,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      page: page,
    },
  });

  return response;
}
