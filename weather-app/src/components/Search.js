import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ setCity }) => {
  const [inputCity, setInputCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    setCity(inputCity);
    navigate(`/search?city=${inputCity}`);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
