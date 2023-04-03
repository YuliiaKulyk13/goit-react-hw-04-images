import { LoadButton } from './Button.styled';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <LoadButton type="button" onClick={onClick}>
      Load More
    </LoadButton>
  );
};
