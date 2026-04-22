import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// A simple wrapper that applies a full-screen background image and optional overlay.
// It randomly selects between 'main.png' and 'other.png' by default, but a specific
// filename can be passed via the `background` prop. Images are expected to live in the
// public/ directory so they can be referenced via PUBLIC_URL.

const backgrounds = [
  '/main.png',
  '/other.png'
];

export default function PageWrapper({ children, background }) {
  let bg = background;
  if (!bg) {
    // pick a random image from the list on every render
    const idx = Math.floor(Math.random() * backgrounds.length);
    bg = backgrounds[idx];
  }
  const navigate = useNavigate();
  const style = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${process.env.PUBLIC_URL + bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    position: 'relative'
  };

  // add a translucent overlay to make text readable
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 0
  };

  const isLoggedIn = !!localStorage.getItem('access');
  const headerLinks = (
    <div className="header-links">
      {isLoggedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
            style={{ marginLeft: '12px', background: 'transparent', color: '#333', border: 'none', cursor: 'pointer' }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/">Login</Link>
          <Link to="/register" style={{ marginLeft: '12px' }}>Register</Link>
        </>
      )}
    </div>
  );

  return (
    <div style={style} className="page">
      <div style={overlayStyle} />
      <div className="header">
        <span>Study Planner</span>
        {headerLinks}
      </div>
      <div style={{ zIndex: 1, width: '100%' }}>{children}</div>
    </div>
  );
}
