import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  const styles = {
    container: {
      textAlign: 'center',
      marginTop: '50px',
    },
    title: {
      fontSize: '48px',
      marginBottom: '20px',
    },
    message: {
      fontSize: '24px',
      marginBottom: '30px',
    },
    homeLink: {
      fontSize: '20px',
      textDecoration: 'none',
      color: '#007BFF',
    },
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.homeLink}>Go back to the homepage</Link>
    </div>
  );
}

export default NotFound