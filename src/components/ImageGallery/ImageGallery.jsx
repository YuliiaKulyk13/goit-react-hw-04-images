import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery, Item } from './ImageGallery.styled';
import { Container } from 'components/App.styled';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <Container>
      <Gallery>
        {items.map(item => (
          <Item key={item.id} onClick={() => onClick(item.largeImageURL)}>
            {
              <ImageGalleryItem
                webformatURL={item.webformatURL}
                tags={item.tags}
              />
            }
          </Item>
        ))}
      </Gallery>
    </Container>
  );
};
