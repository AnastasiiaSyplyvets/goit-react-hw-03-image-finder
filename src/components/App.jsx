import React from 'react';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    // status: 'idle',
    showModal: false,
    selectedImage: null,
    searchQuiry: '',
  };

  page = 1;

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate befor');
    console.log(prevState);
    if (prevState.searchQuiry !== this.state.searchQuiry) {
      this.fetchRequest();
      // console.log('componentDidUpdate in if');
      // console.log('prevState.value:', prevState.searchQuiry);
      // console.log(this.state.searchQuiry);
    }
  }

  toggleModal = image => {
    this.setState(prevState => ({ selectedImage: image }));
  };

  fetchRequest = () => {
    this.setState({ loading: true });

    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${this.state.searchQuiry}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}&editors_choice=id,webformatURL,largeImageURL,tags`
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.total === 0) {
            alert('No results found!');
            return;
          }

          // if (data.total <= 12) {
          //   const btn = document.querySelector('#load-more');
          //   btn.addAttribute('disabled');

          //   console.log('data <12');
          // }

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

  handleRequest = value => {
    // e.preventDefault();
    this.page = 1;

    this.setState({ searchQuiry: value, images: [] });
    console.log(value);
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
        {/* {images.length <= 12 ? null : (
          <LoadMoreBtn disabled onClick={this.handleLoadMoreRequest} />
        )} */}
      </>
    );
  }
}
