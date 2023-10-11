// SearchResults.js
import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import '../App.css';
import Filters from './Filters';

const SearchResults = () => {
    // const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const { filteredResults, products } = location.state;
    const [appliedFilters, setAppliedFilters] = useState({
      productNameFilters: [],
      priceRangeFilters: [],
      ratingFilters: [],
    });
    const [wishlist, setWishlist] = useState([]);
    
    const applyFilters = (filters) => {
      // Apply filters to update the displayed results
      setAppliedFilters(filters);
    };
  
    const applyFiltersLogic = () => {
      // Extract filters from state
      const { productNameFilters, priceRangeFilters, ratingFilters } = appliedFilters;
  
      // Filter products based on the applied filters
      let filteredProducts = [...products];
  
      // Apply product name filter
      if (productNameFilters.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          productNameFilters.includes(product.name)
        );
      }
  
      // Apply price range filter
      if (priceRangeFilters.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          const priceRange = getPriceRange(product.price);
          return priceRangeFilters.includes(priceRange);
        });
      }
  
      // Apply rating filter
      if (ratingFilters.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          ratingFilters.includes(String(product.rating))
        );
      }
  
      return filteredProducts;
    };
  
    // Function to determine the price range for a given price
    const getPriceRange = (price) => {
      if (price < 500) return 'Under 500';
      if (price >= 500 && price < 1000) return '500 - 1000';
      if (price >= 1000 && price < 2000) return '1000 - 2000';
      return 'Above 2000';
    };
    const addToWishlist = (productId) => {
      // Add or remove the product from the wishlist
      if (wishlist.includes(productId)) {
        setWishlist(wishlist.filter((id) => id !== productId));
      } else {
        setWishlist([...wishlist, productId]);
      }
    };
  
    const isProductInWishlist = (productId) => {
      return wishlist.includes(productId);
    };
  
    const filteredProducts = applyFiltersLogic();
  
      return (
        <div className="row">
        <div className="col col1">
          <Filters products={products} applyFilters={applyFilters} />
        </div>
        <div className="search-results col">
          {appliedFilters.productNameFilters.length > 0 ||
          appliedFilters.priceRangeFilters.length > 0 ||
          appliedFilters.ratingFilters.length > 0 ? (
            // Display filteredProducts when filters are applied
            filteredProducts.map((item) => (
              <div key={item.id} className="search-result-item">
                 <span
                className={`wishlist-icon ${
                  isProductInWishlist(item.id) ? 'active' : ''
                }`}
                onClick={() => addToWishlist(item.id)}
              >
                &#x2665;
              </span>
                <img src={item.image} alt={item.name}/>
                <div className="result-details">
                  <h3>{item.name}</h3>
                  <p>Rs.{item.price}</p>
                  <p>{'⭐'.repeat(item.rating)}</p>
                 </div>
              </div>
            ))
          ) : (
            // Display filteredResults when no filters are applied
            filteredResults.map((item) => (
              <div key={item.id} className="search-result-item" >
                 <span
                className={`wishlist-icon ${
                  isProductInWishlist(item.id) ? 'active' : ''
                }`}
                onClick={() => addToWishlist(item.id)}
              >
                &#x2665;
              </span>
                <img src={item.image} alt={item.name}  />
                <div className="result-details" >
                  <h3>{item.name}</h3>
                  <p>Rs.{item.price}</p>
                  <p>{'⭐'.repeat(item.rating)}</p>
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
         
  );
};

export default SearchResults;
