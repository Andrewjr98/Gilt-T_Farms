import React from "react";


const SearchBar = () => {
    return (
      <div>
        <input type="text"></input>
        <input className="custom-btn" type="button" value="Search" placeholder="Enter Item Name ... "></input>
      </div>
    );
  };

export default SearchBar;