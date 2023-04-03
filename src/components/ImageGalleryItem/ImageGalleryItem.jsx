import { ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  return <ImageItem src={webformatURL} alt={tags} />;
};
