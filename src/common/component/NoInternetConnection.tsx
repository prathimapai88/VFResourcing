import React from 'react';
import '../../../styles/NoInternetConnection.scss';

const NoInternetConnection: React.FC = () => {
  return (
    <div className="no-internet-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--primary-color)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <line x1="12" y1="20" x2="12.01" y2="20"/>
      </svg>
      <div className="no-internet-content">
        <h2>No Internet Connection</h2>
        <p>Please check your internet connection and try again.</p>
      </div>
    </div>
  );
};

export default NoInternetConnection;
