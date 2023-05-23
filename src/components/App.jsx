import React from 'react';
import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMoreBtn } from './Button';
import { Loader } from './Loader';

export class App extends Component {
  state = {
    images: [],
    loading: false,
  };

  page = 1;

  fetchRequest = () => {
    const input = document.querySelector('input');
    const inputValue = input.value;

    this.setState({ loading: true, images: [] });
    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${inputValue}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}`
      )
        .then(response => response.json())
        .then(data => {
          // console.log(data.hits);
          this.setState({ images: [...this.state.images, ...data.hits] });
          // console.log(this.state);
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({ loading: false });
        });
    }, 2000);
  };

  handleLoadMoreRequest = () => {
    // const input = document.querySelector('input');
    // const inputValue = input.value;
    this.page += 1;

    this.fetchRequest();
  };

  handleRequest = e => {
    e.preventDefault();
    this.fetchRequest();
  };

  render() {
    const { loading, images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleRequest} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  smallImg={image.webformatURL}
                />
              );
            })}
          </ImageGallery>
        )}
        {images.length > 0 && (
          <LoadMoreBtn onClick={this.handleLoadMoreRequest} />
        )}
      </>
    );
  }
}
