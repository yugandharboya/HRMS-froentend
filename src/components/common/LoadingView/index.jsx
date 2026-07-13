import "./index.css";
import { TailSpin } from "react-loader-spinner";

const LoadingView = () => (
  <div className="loading-container" data-testid="loader">
    <div className="loader">
      <TailSpin
        height="50"
        width="50"
        color="#00BFFF"
        ariaLabel="loading"
        visible={true}
      />
    </div>
    <p className="loading-text">Loading...</p>
  </div>
);
export default LoadingView;
