import React from 'react';
import './styles.css';
import { PropTypes } from 'react';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className="Button" type="button" onClick={onClick}>
      Load more
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func,
};
