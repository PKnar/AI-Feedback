import React, { useEffect, useState } from "react";
import "./styles/App.scss";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Predictions from "./pages/Predictions";
import Nav from "./components/nav/Nav";
import FeedbackForm from "./components/FeedbackForm";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [imagePreview, setImagePreview] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const preventZoom = (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventZoom, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventZoom);
    };
  }, []);

  return (
    <div className="App">
      <div className="glow"></div>
      <div className="app-wrapper">
        <AnimatePresence>
          <Nav />
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Home
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    predictions={predictions}
                    setPredictions={setPredictions}
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile}
                  />
                </motion.div>
              }
            />
            <Route
              path="/predictions"
              element={
                imagePreview ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Predictions
                      imagePreview={imagePreview}
                      setImagePreview={setImagePreview}
                      predictions={predictions}
                      setPredictions={setPredictions}
                      setSelectedFile={setSelectedFile}
                      selectedFile={selectedFile}
                    />
                  </motion.div>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default RootApp;
