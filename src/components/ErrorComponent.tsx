import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import './../../styles/Error.scss';

interface RouteError {
  status?: number;
  statusText?: string;
}

const ErrorComponent: React.FC = () => {
  const error = useRouteError() as RouteError;

  return (
    <div className="error-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16" />
      </svg>
      <div className="error-message">
        <h2>Oops!!! Something went wrong</h2>
        <p>
          Error {error?.status}: {error?.statusText}
        </p>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
