import React, { useState } from 'react';

const Filters = ({ products, applyFilters }) => {
  const [productNameFilters, setProductNameFilters] = useState([]);
  const [priceRangeFilters, setPriceRangeFilters] = useState([]);
  const [ratingFilters, setRatingFilters] = useState([]);

  const handleProductNameChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setProductNameFilters([...productNameFilters, name]);
    } else {
      setProductNameFilters(productNameFilters.filter((filter) => filter !== name));
    }
  };

  const handlePriceRangeChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setPriceRangeFilters([...priceRangeFilters, name]);
    } else {
      setPriceRangeFilters(priceRangeFilters.filter((filter) => filter !== name));
    }
  };

  const handleRatingChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setRatingFilters([...ratingFilters, name]);
    } else {
      setRatingFilters(ratingFilters.filter((filter) => filter !== name));
    }
  };

  const applyFiltersHandler = () => {
    applyFilters({
      productNameFilters,
      priceRangeFilters,
      ratingFilters,
    });
  };

  // Extract unique product names from the products array
  const uniqueProductNames = [...new Set(products.map((product) => product.name))];

  return (
    <div className="filters">
      <h4>Filters</h4>
      <div>
        <h5>Product name</h5>
        {uniqueProductNames.map((productName) => (
          <label key={productName}>
            <input
              type="checkbox"
              name={productName}
              onChange={handleProductNameChange}
              checked={productNameFilters.includes(productName)}
            />
            {productName}
          </label>
        ))}
      </div>
      <div className='price-filter'>
        <h5>Price Range</h5>
        <label>
          <input
            type="checkbox"
            name="Under 500"
            onChange={handlePriceRangeChange}
          />
          Under 500
        </label>
        <label>
          <input
            type="checkbox"
            name="500 - 1000"
            onChange={handlePriceRangeChange}
          />
          500 - 1000
        </label>
        <label>
          <input
            type="checkbox"
            name="1000 - 2000"
            onChange={handlePriceRangeChange}
          />
          1000 - 2000
        </label>
        <label>
          <input
            type="checkbox"
            name="Above 2000"
            onChange={handlePriceRangeChange}
          />
          Above 2000
        </label>
        
      </div>
      <div className='ratings'>
        <h5>Ratings</h5>
        <label>
          <input type="checkbox" name="1" onChange={handleRatingChange} />
          {'⭐'.repeat(1)}
        </label>
        <label>
          <input type="checkbox" name="2" onChange={handleRatingChange} />
          {'⭐'.repeat(2)}
        </label>
        <label>
          <input type="checkbox" name="3" onChange={handleRatingChange} />
          {'⭐'.repeat(3)}
        </label>
        <label>
          <input type="checkbox" name="4" onChange={handleRatingChange} />
          {'⭐'.repeat(4)}
        </label>
        <label>
          <input type="checkbox" name="5" onChange={handleRatingChange} />
          {'⭐'.repeat(5)}
        </label>
       
      </div>
      <button className='fltr-btn' onClick={applyFiltersHandler}>Apply Filters</button>
    </div>
  );
};

export default Filters;
