import React from 'react';

export default function ListView (){
  const items = ['Use Array.map', 'Not a for loop', 'Give each item a unique key', 'Avoid using array index as the key'];

  // Inline styles as JavaScript objects
  const listStyle = {
    listStyleType: 'none',
    padding: '10px',
    margin: '0',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
  };

  const listItemStyle = {
    padding: '8px',
    marginBottom: '5px',
    backgroundColor: '#e0f7fa',
    border: '1px solid #00796b',
    borderRadius: '3px',
    fontFamily: 'Arial, sans-serif',
    color: '#00796b',
  };

  return (
    <div style={{width:"500px"}}>
      <h2>The React Way To Render A List</h2>
    <ul style={listStyle}>
      {items.map((item) => (
        <li key={item} style={listItemStyle}>
          <i class="fa-solid fa-check" style={{margin:"0 10px 0 0 "}}></i>
          {item}
        </li>
      ))}
      </ul>
      </div>
  );
};
