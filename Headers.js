import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Headers({ Title = "NewsNayab", Search }) {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term state
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    Search(searchTerm); // Call the Search function with the search term
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="ILOGO.jpeg" alt="mylogo" className="logo-set" />
        <Link to="/" className="name">{Title}</Link>
      </div>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm} // Bind the input value to state
          onChange={handleInputChange} // Handle input changes
        />
        <button className="btn" type="submit">Search</button>
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/business">Business</Link></li>
        <li><Link to="/entertainment">Entertainment</Link></li>
        <li><Link to="/sports">Sports</Link></li>
        <li><Link to="/health">Health</Link></li>
        <li><Link to="/science">Science</Link></li>
        <li><Link to="/technology">Technology</Link></li>
      </ul>
    </nav>
  );
}

// Prop types
Headers.propTypes = {
  Title: PropTypes.string,
  Search: PropTypes.func.isRequired, // Ensure that Search is a function
};
