import React, { useState } from "react";
import "../styles/Home.scss";
import FileUploader from "../components/FileUploader";

function Home({
  imagePreview,
  setImagePreview,
  predictions,
  setPredictions,
  setSelectedFile,
  selectedFile,
}) {
  return (
    <div className="home">
      <div style={{ width: "60%" }}>
        <FileUploader
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          predictions={predictions}
          setPredictions={setPredictions}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
      </div>
    </div>
  );
}

export default Home;
