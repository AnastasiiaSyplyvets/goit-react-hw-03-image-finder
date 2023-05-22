import React from 'react';
import './styles.css';

export const ImageGallery = ({ children }) => {
  return (
    <>
      <ul className="ImageGallery">{children}</ul>
    </>
  );
};
