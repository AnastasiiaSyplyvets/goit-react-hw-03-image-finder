import React from 'react';
import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMoreBtn } from './Button';
// import { FetchRequest } from './fetchRequest';

export class App extends Component {
  state = {
    images: [],
  };

  page = 1;

  componentDidMount() {}

  fetchRequest = () => {
    const input = document.querySelector('input');
    const inputValue = input.value;
    fetch(
      `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${inputValue}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.hits);
        this.setState({ images: [...this.state.images, ...data.hits] });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  handleLoadMoreRequest = () => {
    const input = document.querySelector('input');
    const inputValue = input.value;
    this.page += 1;

    this.fetchRequest();
    // fetch(
    //   `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${inputValue}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}`
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data.hits);
    //     this.setState({ images: [...this.state.images, ...data.hits] });

    //     console.log(this.state);
    //   })
    //   .catch(err => console.log(err));
  };

  handleRequest = e => {
    e.preventDefault();
    this.fetchRequest();
    // const input = document.querySelector('input');
    // const inputValue = input.value;

    // console.log(inputValue);

    //   fetch(
    //     `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${inputValue}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}`
    //   )
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data.hits);
    //       this.setState({ images: [...this.state.images, ...data.hits] });

    //       console.log(this.state);
    //     })
    //     .catch(err => console.log(err));
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Searchbar onSubmit={this.handleRequest} />
        {this.state.images.length > 0 && (
          <ImageGallery>
            {this.state.images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  smallImg={image.webformatURL}
                />
              );
            })}
          </ImageGallery>
        )}
        {this.state.images.length > 0 && (
          <LoadMoreBtn onClick={this.handleLoadMoreRequest} />
        )}
      </>
    );
  }
}
