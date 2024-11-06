import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  // Check if the user has already given consent
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={styles.banner}>
      This website uses cookies to ensure you get the best experience.
      <button onClick={acceptCookies} style={styles.button}>Accept</button>
      <button onClick={declineCookies} style={styles.button}>Decline</button>
    </div>
  );
};

const styles = {
  banner: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    zIndex: 1000,
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    marginLeft: '10px',
    cursor: 'pointer',
  },
};

export default CookieConsent;
