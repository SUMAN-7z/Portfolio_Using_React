import { useEffect } from "react";
import "./PageNotFound.css";

export default function NotFound() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }
  }, []);

  return (
    <div className={`notfound-wrapper`}>
      <div className="container1">
        <div className="code">404</div>

        <div className="text">
          The page you're looking for doesn't exist.
          <br />
          It may have been moved, renamed, or deleted.
        </div>

        <a href="/" className="btn">
          Return to Home
        </a>
      </div>
    </div>
  );
}
