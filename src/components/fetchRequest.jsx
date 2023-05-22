// import React from 'react';

// export const FetchRequest = ({ page }) => {
//   const input = document.querySelector('input');
//   const inputValue = input.value;
//   return fetch(
//     `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${inputValue}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
//   )
//     .then(response => response.json())
//     .then(data => {
//       console.log(data.hits);
//       this.setState({ images: [...this.state.images, ...data.hits] });
//     })
//     .catch(err => console.log(err));
// };
