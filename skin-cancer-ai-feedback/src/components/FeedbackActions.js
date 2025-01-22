import {
  PlusCircleIcon,
  PlusIcon,
  SaveAll,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React, { useState } from "react";

function FeedbackActions({
  setAgree,
  setComment,
  agree,
  comment,
  handleAddBox,
  handleSave,
  showBoxOptions,

  showLabelPopup,
  setShowLabelPopup,
}) {
  const handleAddNewBox = () => {
    setShowLabelPopup(true);
  };

  const handleLabelSelect = (selectedLabel) => {
    setShowLabelPopup(false);
    handleAddBox(selectedLabel);
  };

  return (
    <div className="feedback-actions">
      {showBoxOptions && (
        <div>
          {/* <div
            style={{
              margin: "1rem",

              padding: "1REM",
            }}
          >
            <h2>TOOLS</h2>
            <p>
              Use feedback tools to give feedback to the AI prediction results
            </p>
          </div> */}

          <div
            style={{
              marginTop: "2rem",
              // borderTop: "0.5px solid grey",
            }}
          >
            <h3
              style={{
                margin: "1rem",
              }}
            >
              Annotation Tool
            </h3>
            <p
              style={{
                margin: "1rem",
              }}
            >
              Use this annotation tool to draw boxes around potential cancer
              cells{" "}
            </p>
            <button
              onClick={handleAddNewBox}
              style={{
                marginTop: "20px",
                width: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
                cursor: "pointer",
                margin: "1rem",
                marginTop: "4rem",
              }}
            >
              <PlusCircleIcon style={{ marginRight: "0.5rem" }} /> Add New
              Bouding Box
            </button>
          </div>

          {/* Comment Box */}
          <div
            style={{
              marginTop: "2rem",
              borderTop: "0.5px solid grey",
              paddingTop: "1rem",
            }}
          >
            <p
              style={{
                padding: "0.5rem",
                fontSize: "15px",
                margin: "1rem",
              }}
            >
              Add Comments (Optional):
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ marginTop: "0.5rem", width: "100%", height: "100px" }}
            />
          </div>

          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="glowing-button"
            onClick={handleSave}
          >
            <SaveAll style={{ marginRight: "0.5rem" }} size={15} /> Submit
          </button>
        </div>
      )}
      {/* Label selection popup for skin cancer subtypes */}
      {showLabelPopup && (
        <div
          className="label-popup"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h4>Select Skin Cancer Type</h4>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {[
              { type: "Melanoma", color: "#ffcccc" },
              { type: "Basal Cell Carcinoma", color: "#ffb3b3" },
              { type: "Squamous Cell Carcinoma", color: "#ff9999" },
              { type: "Actinic Keratosis", color: "#ff6666" },
            ].map(({ type, color }) => (
              <li key={type} style={{ marginBottom: "10px" }}>
                <button
                  onClick={() => handleLabelSelect(type)}
                  style={{
                    backgroundColor: color,
                    padding: "10px",
                    border: "none",
                    borderRadius: "3px",
                    color: "#333",
                  }}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowLabelPopup(false)}
            style={{ marginTop: "10px", padding: "5px" }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default FeedbackActions;
