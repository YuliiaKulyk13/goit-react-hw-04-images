import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { Component } from 'react';
import {
  Button,
  ButtonSearch,
  Form,
  Header,
  InputSearch,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      return toast.warn('Please enter a request!');
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <FcSearch size="30" />
            <ButtonSearch>Search</ButtonSearch>
          </Button>

          <InputSearch
            type="text"
            name="imageName"
            value={this.state.imageName}
            onChange={this.handleNameChange}
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
