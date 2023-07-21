import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={headerStyle} className="header-container">
          
      
        <h5>Dynamic chart update</h5>
  
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
   
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
};

export default Header;
