import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: '#007BFF', textDecoration: 'underline' }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
