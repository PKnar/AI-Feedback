import React, { useState } from "react";
import axios from "axios";
import ImageUpload from "./FileUploader";
import BoundingBoxCanvas from "./BoundingBoxAnnotator";

function FeedbackForm() {
  const [imageUrl, setImageUrl] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [agree, setAgree] = useState(null);
  const [comment, setComment] = useState("");

  const handlePredictions = (predictions) => {
    setBoxes(predictions);
  };

  const handleSubmit = async () => {
    const feedback = { agree, comment, boundingBoxes: boxes };
    try {
      await axios.post("http://localhost:8000/api/feedback", feedback);
      alert("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <ImageUpload onPredictions={handlePredictions} />
      {imageUrl && (
        <BoundingBoxCanvas
          imageUrl={imageUrl}
          boxes={boxes}
          setBoxes={setBoxes}
        />
      )}
      <label>
        Do you agree with the prediction?
        <input
          type="radio"
          name="agree"
          value="yes"
          onChange={() => setAgree(true)}
        />{" "}
        Yes
        <input
          type="radio"
          name="agree"
          value="no"
          onChange={() => setAgree(false)}
        />{" "}
        No
      </label>
      <br />
      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
}

export default FeedbackForm;
