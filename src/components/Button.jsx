import React from 'react';
import './styles.css';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className="Button" type="button" onClick={onClick}>
      Load more
    </button>
  );
};
