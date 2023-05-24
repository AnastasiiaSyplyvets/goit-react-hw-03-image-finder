import React from 'react';
import './styles.css';
import { PropTypes } from 'react';

export const Searchbar = ({ onSubmit, onChange }) => {
  return (
    <header className="Searchbar">
      <form onSubmit={onSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="button-label">Search</span>
        </button>

        <input
          onChange={onChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
