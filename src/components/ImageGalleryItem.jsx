import React from 'react';
import './styles.css';

export const ImageGalleryItem = ({ id, smallImg, bigImg }) => {
  return (
    <li key={id} className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={smallImg} alt="" />
    </li>
  );
};
