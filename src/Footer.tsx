import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Live Chart Update. All rights reserved.</p>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
};

export default Footer;
