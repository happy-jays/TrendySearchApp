// SearchResults.js
import React from 'react';
import {useLocation} from 'react-router-dom';
import '../App.css';

const SearchResults = () => {
    // const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const { searchResults } = location.state;
      return (
       
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
         
  );
};

export default SearchResults;
