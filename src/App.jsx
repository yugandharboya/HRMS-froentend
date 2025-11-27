import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import LoginAdmin from "./components/LoginAdmin";
import RegisterAdmin from "./components/RegisterAdmin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/login" element={<LoginAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
{
  /* <Route
  path="/"
  element={
    <ProtectedRoute>
      {" "}
      <Home />{" "}
    </ProtectedRoute>
  }
/>; */
}
