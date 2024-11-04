import React, { useState } from "react";
import axios from "axios";
import FileUploader from "../components/FileUploader";
import BoundingBoxAnnotator from "../components/BoundingBoxAnnotator";
import { Rnd } from "react-rnd";
import "../styles/Predictions.scss";

function Predictions({
  predictions,
  setPredictions,
  imagePreview,
  selectedFile,
}) {
  const [agree, setAgree] = useState(false);
  const [annotation, setAnnotation] = useState("");
  const [comment, setComment] = useState("");

  const handleAddBox = () => {
    setPredictions([
      ...predictions,
      { x: 50, y: 50, width: 100, height: 100, label: "new" },
    ]);
  };

  const handleDeleteBox = (index) => {
    setPredictions(predictions.filter((_, i) => i !== index));
  };

  const handleDragStop = (index, e, d) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index].x = d.x;
    updatedPredictions[index].y = d.y;
    setPredictions(updatedPredictions);
  };

  const handleResizeStop = (index, e, direction, ref, delta, position) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = {
      ...updatedPredictions[index],
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
      ...position,
    };
    setPredictions(updatedPredictions);
  };

  // Save data to backend
  const handleSave = async () => {
    const saveData = {
      filename: selectedFile.name,
      boxes: predictions.map((box) => ({
        x_center: (box.x + box.width / 2) / 400,
        y_center: (box.y + box.height / 2) / 400,
        width: box.width / 400,
        height: box.height / 400,
        label: box.label,
      })),
      agree,
      annotation,
      comment,
    };

    try {
      await axios.post("http://localhost:8000/api/feedback/save", saveData);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="predictions">
      <div>
        <h2 className="predictions__title">Predictions</h2>

        {imagePreview && (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginTop: "20px",
            }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="prediction-image"
            />
            {predictions.map((box, index) => (
              <Rnd
                key={index}
                size={{ width: box.width, height: box.height }}
                position={{ x: box.x, y: box.y }}
                onDragStop={(e, d) => handleDragStop(index, e, d)}
                onResizeStop={(e, direction, ref, delta, position) =>
                  handleResizeStop(index, e, direction, ref, delta, position)
                }
                bounds="parent"
                style={{ border: "2px solid red", position: "absolute" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <button
                    style={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteBox(index)}
                  >
                    X
                  </button>
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      padding: "2px",
                    }}
                  >
                    {box.label}
                  </span>
                </div>
              </Rnd>
            ))}
          </div>
        )}

        <button onClick={handleAddBox}>Add New Box</button>
        <button onClick={handleSave}>Save Annotations</button>
        {/* Agree Checkbox */}
        <div style={{ marginTop: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            Agree
          </label>
        </div>

        {/* Annotation Input */}
        <div style={{ marginTop: "10px" }}>
          <label>
            Annotation:
            <input
              type="text"
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              style={{ marginLeft: "10px", width: "200px" }}
            />
          </label>
        </div>

        {/* Comment Input */}
        <div style={{ marginTop: "10px" }}>
          <label>
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ marginLeft: "10px", width: "200px", height: "60px" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Predictions;
