import React from "react";
import "./index.css";

const LoadingView = () => (
  <div className="loading-container" data-testid="loader">
    <div className="custom-spinner"></div>
    <p className="loading-text">Loading workspace details...</p>
  </div>
);

export default LoadingView;
