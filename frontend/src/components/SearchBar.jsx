import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/components/_searchBar.scss';

const SearchBar = ({ value, onChange, placeholder = 'Шукайте корисні пости та користувачів...' }) => {
  return (
    <div className="search-bar">
      <div className="search-bar__wrapper">
        <FaSearch className="search-bar__icon" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="search-bar__input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
