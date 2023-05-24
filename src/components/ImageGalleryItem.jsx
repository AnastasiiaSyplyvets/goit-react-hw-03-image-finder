import React from 'react';
import './styles.css';

export const ImageGalleryItem = ({ id, smallImg, onClick }) => {
  return (
    <li key={id} className="ImageGalleryItem">
      <img
        onClick={onClick}
        className="ImageGalleryItem-image"
        src={smallImg}
        alt=""
      />
    </li>
  );
};
