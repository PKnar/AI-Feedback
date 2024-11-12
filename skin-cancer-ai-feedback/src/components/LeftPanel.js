import {
  BadgeInfoIcon,
  Info,
  InfoIcon,
  SquareIcon,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React from "react";

function LeftPanel({
  predictions,

  agree,
  setAgree,
  setDisagree,
  setShowBoxOptions,
  handleAgreeChange,
  selectedBoxIndex,
  setSelectedBoxIndex,
}) {
  const numPredictions = predictions.length;
  return (
    <div className="prediction-panel">
      <h5 className="lp-title">Info</h5>
      {numPredictions === 0 && (
        <div
          className="negative-cases"
          style={{
            display: "flex",
            alignItems: "flex-start",
            padding: "1rem",
          }}
        >
          <div>
            {" "}
            <Info size={18} style={{ marginRight: "0.5rem" }} />
          </div>

          <p className="lp-description">
            {" "}
            No detectable signs of skin cancer were identified by the AI. Please
            review the results to confirm or adjust findings as needed for your
            clinical evaluation.
          </p>
        </div>
      )}

      {numPredictions > 0 && (
        <div
          className="positive-cases"
          style={{
            display: "flex",
            alignItems: "flex-start",
            padding: "1rem",
          }}
        >
          {" "}
          <div>
            {" "}
            <Info size={18} style={{ marginRight: "0.5rem" }} />
          </div>
          <p className="lp-description">
            Attention: {numPredictions} of Concern Detected Please review this
            area carefully to confirm findings.
          </p>
        </div>
      )}
      <h5 className="lp-title">Predictions</h5>
      <ul
        style={{
          padding: " 0.5rem 1rem",
          listStyle: "none",
          height: "50vh",
          overflowY: "auto",
        }}
      >
        {predictions.map((box, index) => {
          console.log("---box--", box);
          return (
            <li
              key={index}
              style={{
                padding: "0.8rem",
                cursor: "pointer",
                backgroundColor:
                  selectedBoxIndex === index ? "#ddd" : "transparent",
                color: selectedBoxIndex === index ? "black" : "white",
              }}
              onClick={() => setSelectedBoxIndex(index)}
            >
              {" "}
              Box {index + 1}: {box.label && box.label}
              {box.confidence && ` ${(box.confidence * 100).toFixed(1)}%`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftPanel;
