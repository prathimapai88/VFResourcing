import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
  const err = useRouteError();
  return (
    <div style={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7C3BED"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16" />
      </svg>

      <div style={styles.message}>
        <h2>Oops!!! Something went wrong</h2>
        <p>
          Error {err.status}: {err.statusText}
        </p>
        <Link  to="/">
        <button>Home</button>
        </Link>
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  message: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
};

export default ErrorComponent;
