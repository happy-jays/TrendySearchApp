import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);
  const [showTrendingDropdown, setShowTrendingDropdown] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Generate some fake trending clothes data
    const fakeProducts = Array.from({ length: 50 }, () => ({
      id: uuidv4(),
      name: faker.commerce.productName(),
      image: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price(),
      rating: Math.floor(Math.random() * 5) + 1,
    }));

    setProducts(fakeProducts);
  }, []);

  // Create trendingProducts array containing the first 5 products
  const trendingProducts = products.slice(0, 5);
  const popularSuggestion = products.slice(5,10); 
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchTerm(inputText);
    setShowTrendingDropdown(inputText === ''); // Show dropdown if the input is empty

    // Implement search logic and update searchResults
    // Example: You can filter the data based on the search term
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    // Implement your search logic here, e.g., filter data based on the searchTerm
    const filteredResults = products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // setSearchResults(filteredResults);
    navigate('/results', { state: {filteredResults, products} });
  };

  const handleSearchBarClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      setShowTrendingDropdown(true); // Show dropdown when search bar is clicked
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the form from submitting
      handleSearch(); // Call handleSearch when Enter is pressed
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input" onClick={handleSearchBarClick}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={searchInputRef}
        />
        {/* <FaSearch className="search-icon" /> */}
      </div>
      {showTrendingDropdown && (
        <div className='trending-dropdown'>
         <h2 id='lts-trnd'>Latest Trends</h2> 
        <ul className="trending-list">
          {trendingProducts.map((item) => (
            <li key={item.id} className="trending-item">
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </li>
          ))}
          </ul>
          <h2 id='plr-sgs'>Popular Suggestions</h2>
          {popularSuggestion.map((item) => (
            <p key={item.id} className="popular-item">
              {item.name}
            </p>
          ))}
        </div>
      )}
      {/* {searchTerm.length > 0 && (
        <div className="search-results">
          {searchResults.map((item) => (
            <div key={item.id} className="search-result-item">
              <img src={item.image} alt={item.name} />
              <div className="result-details">
                <h3>{item.name}</h3>
                <p>Rs.{item.price}</p>
                <p>{'⭐'.repeat(item.rating)}</p>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;
