// frontend/src/components/ImageUploader.js
import React, { useState } from "react";
import axios from "axios";

import DragDrop from "./DragDrop";
import { useNavigate } from "react-router-dom";
import NeonLoading from "./NeoLoading";

function ImageUploader({
  imagePreview,
  setImagePreview,
  predictions,
  setPredictions,
  setSelectedFile,
  selectedFile,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file) => {
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setPredictions([]); // Clear previous predictions
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/feedback/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const fetchedPredictions = response.data.predictions.map((box) => {
        console.log(box);
        return {
          x: box.x_center,
          y: box.y_center,
          width: box.width,
          height: box.height,
          label: box.label,
        };
      });
      setPredictions(fetchedPredictions);
      navigate("/predictions");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      {loading && <NeonLoading />}
      {!loading && (
        <DragDrop
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default ImageUploader;
