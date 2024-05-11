import React, { useState } from 'react';
import '../components/create.css'; // Import CSS file for styling
import Navbar from './navbar';
import Button from './button';

function ItemSelector() {
  const [availableItems, setAvailableItems] = useState([
    "Crop 1",
    "Crop 2",
    "Crop 3",
    "Crop 4",
    "Crop 5"
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    // Add item to selected items
    setSelectedItems(prevItems => [...prevItems, item]);
    // Remove item from available items
    setAvailableItems(prevItems => prevItems.filter(i => i !== item));
  };

  const handleRemoveItemClick = (item) => {
    // Remove item from selected items
    setSelectedItems(prevItems => prevItems.filter(i => i !== item));
    // Add item back to available items
    setAvailableItems(prevItems => [...prevItems, item]);
  };

  return (
    <div> <Navbar></Navbar>
    <div className="item-selector bgg">
      <div className="item-list">
        <h2>Crop Recommendation</h2>
        <ul>
          {availableItems.map(item => (
            <li key={item}>
              <div className="item-box">
                <span>{item}</span>
                <button onClick={() => handleItemClick(item)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="item-list">
        <h2>Selected Crops</h2>
        <ul>
          {selectedItems.map(item => (
            <li key={item}>
              <div className="item-box">
                <span>{item}</span>
                <button onClick={() => handleRemoveItemClick(item)}>-</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <a href='neww'>
    <Button/>
    </a>
    </div>
    
  );
}

export default ItemSelector;