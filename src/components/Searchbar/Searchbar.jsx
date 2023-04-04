import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

import {
  Button,
  ButtonSearch,
  Form,
  Header,
  InputSearch,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      return toast.warn('Please enter a request!');
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <FcSearch size="30" />
          <ButtonSearch>Search</ButtonSearch>
        </Button>

        <InputSearch
          type="text"
          name="imageName"
          value={imageName}
          onChange={handleNameChange}
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}
