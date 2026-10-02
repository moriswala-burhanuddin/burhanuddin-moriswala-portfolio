import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={styles.banner}>
            <p style={styles.text}>
                We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
            </p>
            <button onClick={acceptCookies} style={styles.button}>
                Accept
            </button>
        </div>
    );
};

const styles = {
    banner: {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: '#fff',
        padding: '15px 20px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 9999,
        fontFamily: "'Inter', sans-serif",
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        flexWrap: 'wrap',
        gap: '10px'
    },
    text: {
        margin: 0,
        fontSize: '14px',
        flex: '1 1 auto',
    },
    button: {
        backgroundColor: '#fff',
        color: '#000',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        transition: 'background-color 0.2s',
    }
};

export default CookieConsent;
