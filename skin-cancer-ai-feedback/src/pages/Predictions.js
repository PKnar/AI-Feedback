import axios from "axios";
import React, { useState } from "react";
import ImageWithBoundingBoxes from "../components/ImageWithBoundingBoxes";
import "../styles/Predictions.scss";
import FeedbackActions from "../components/FeedbackActions";
import LeftPanel from "../components/LeftPanel";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { API_URL, URL } from "../Constants";

function Predictions({
  predictions,
  setPredictions,
  imagePreview,
  selectedFile,
}) {
  const [agree, setAgree] = useState(false);
  const [comment, setComment] = useState("");
  const [showBoxOptions, setShowBoxOptions] = useState(false);
  const [disagree, setDisagree] = useState(false);
  const [label, setLabel] = useState("");
  const [selectedBoxIndex, setSelectedBoxIndex] = useState();

  const [showLabelPopup, setShowLabelPopup] = useState(false);

  const originalWidth = 2048;
  const originalHeight = 1536;

  const wrapperWidth = 800;
  const scaleFactor = wrapperWidth / originalWidth;

  const handleAddBox = (label) => {
    setPredictions([
      ...predictions,
      { x_center: 500, y_center: 500, width: 100, height: 100, label: label },
    ]);

    console.log("new predictions", predictions);
  };

  const handleDeleteBox = (index) => {
    setPredictions(predictions.filter((_, i) => i !== index));
  };

  const handleUpdateBox = (index, newBox) => {
    console.log(newBox, "neww box");
    console.log("dragging");
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = newBox;
    setPredictions(updatedPredictions);
  };

  const handleSave = async () => {
    const saveData = {
      filename: selectedFile.name,
      boxes: predictions.map((box) => ({
        x_center: box.x_center / originalWidth,
        y_center: box.y_center / originalHeight,
        width: box.width / originalWidth,
        height: box.height / originalHeight,
        label: box.label,
      })),
      agree,
      comment,
    };

    try {
      await axios.post(`${API_URL}/api/feedback/save`, saveData);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleAgreeChange = (isAgree) => {
    setAgree(isAgree);
    setShowBoxOptions(!isAgree);
  };

  return (
    <div className="predictions">
      <LeftPanel
        agree={agree}
        setAgree={setAgree}
        setDisagree={setDisagree}
        setShowBoxOptions={setShowBoxOptions}
        handleAgreeChange={handleAgreeChange}
        predictions={predictions}
        selectedBoxIndex={selectedBoxIndex}
        setSelectedBoxIndex={setSelectedBoxIndex}
      />
      <div>
        {/* ------------Agree Disagree---------- */}
        <div className="agree-disagree">
          {!agree && <p className="question">Do you agree with AI results?</p>}
          {agree && (
            <p className="question">
              Thank you for feedback <br></br>{" "}
              <span
                style={{
                  color: "grey",
                }}
              >
                You agreed with the results
              </span>
            </p>
          )}
          <div className="buttons">
            <button
              className={`feedback-button agree ${agree ? "green" : ""}`}
              onClick={() => {
                setDisagree(false);
                handleAgreeChange(true);
              }}
            >
              <ThumbsUp size={18} style={{ marginRight: "0.5rem" }} /> Yes
            </button>

            <button
              className={`feedback-button disagree ${disagree ? "red" : ""}`}
              onClick={() => {
                setAgree(false);
                setDisagree(true);
                handleAgreeChange(false);
              }}
            >
              <ThumbsDown size={18} style={{ marginRight: "0.5rem" }} /> No,
              Needs Improvement
            </button>
          </div>

          {/* {agree && (
            <button
              style={{
                textAlign: "center",
                width: "200px",
                padding: "1rem",
                backgroundColor: "transparent",
                color: "white",
                cursor: "pointer",
                border: "0.5px solid white",
              }}
              onClick={(e) => {
                setAgree(false);
                setShowBoxOptions(true);
              }}
            >
              Change
            </button>
          )} */}
        </div>
        {imagePreview && (
          <ImageWithBoundingBoxes
            imageUrl={imagePreview}
            predictions={predictions}
            scaleFactor={scaleFactor}
            wrapperWidth={wrapperWidth}
            originalHeight={originalHeight}
            originalWidth={originalWidth}
            handleDeleteBox={handleDeleteBox}
            handleUpdateBox={handleUpdateBox}
            selectedBoxIndex={selectedBoxIndex}
          />
        )}
      </div>

      <FeedbackActions
        setAgree={setAgree}
        setComment={setComment}
        agree={agree}
        comment={comment}
        handleAddBox={handleAddBox}
        handleSave={handleSave}
        handleAgreeChange={handleAgreeChange}
        showBoxOptions={showBoxOptions}
        setLabel={setLabel}
        showLabelPopup={showLabelPopup}
        setShowLabelPopup={setShowLabelPopup}
      />
    </div>
  );
}

export default Predictions;
