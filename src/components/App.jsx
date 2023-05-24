import React from 'react';
import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMoreBtn } from './Button';
import { Loader } from './Loader';
import Modal from './Modal';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    // status: 'idle',
    showModal: false,
    selectedImage: null,
  };

  page = 1;

  toggleModal = image => {
    this.setState(prevState => ({ selectedImage: image }));
  };

  fetchRequest = () => {
    const input = document.querySelector('input');
    const inputValue = input.value;

    this.setState({ loading: true });
    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${inputValue}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}`
      )
        .then(response => response.json())
        .then(data => {
          this.setState({
            images: [...this.state.images, ...data.hits],
            loading: false,
            // status: 'resolved',
          });
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({ loading: false });
        });
    }, 2000);
  };

  handleLoadMoreRequest = () => {
    this.page += 1;

    this.fetchRequest();
  };

  handleRequest = e => {
    e.preventDefault();
    this.setState({ images: [] });
    this.fetchRequest();
  };

  render() {
    const { loading, images, selectedImage } = this.state;

    //   if (status === 'idle') {
    //     return <Searchbar onSubmit={this.handleRequest} />;
    //   }

    //   if (status === 'pending') {
    //     return (
    //       <>
    //         <Searchbar onSubmit={this.handleRequest} />;
    //         <Loader />;
    //       </>
    //     );
    //   }

    //   if (status === 'resolved') {
    //     return (
    //       <>
    //         <Searchbar onSubmit={this.handleRequest} />;
    //         {images.length > 0 && (
    //           <ImageGallery>
    //             {images.map(image => {
    //               return (
    //                 <ImageGalleryItem
    //                   key={image.id}
    //                   smallImg={image.webformatURL}
    //                 />
    //               );
    //             })}
    //           </ImageGallery>
    //         )}
    //         {images.length > 0 && (
    //           <LoadMoreBtn onClick={this.handleLoadMoreRequest} />
    //         )}
    //       </>
    //     );
    //   }

    return (
      <>
        <Searchbar onSubmit={this.handleRequest} />
        {selectedImage && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={selectedImage.largeImageURL}
          >
            <img src={selectedImage.largeImageURL} alt={selectedImage.name} />
          </Modal>
        )}

        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery>
            {images.map(image => {
              return (
                <>
                  <ImageGalleryItem
                    onClick={() => this.toggleModal(image)}
                    key={image.id}
                    smallImg={image.webformatURL}
                  />
                </>
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
