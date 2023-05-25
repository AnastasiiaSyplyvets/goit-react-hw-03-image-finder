import React from 'react';
import '../styles.css';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      id="load-more"
      className="Button"
      type="button"
      onClick={onClick}
    >
      Load more
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func,
};
