import React from "react";

function PredictionDisplay({ imageData }) {
  if (!imageData) return null;

  return (
    <div>
      <h3>AI Prediction: {imageData.prediction}</h3>
      <img src={imageData.imageUrl} alt="uploaded" width="300" />
      {/* Optional: Show bounding boxes here if available */}
    </div>
  );
}

export default PredictionDisplay;
