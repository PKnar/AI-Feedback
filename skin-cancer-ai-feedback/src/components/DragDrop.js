import React, { useRef, useState } from "react";
import "../styles/FileUpload.scss";
import { FileOutputIcon, FileUp, FileUpIcon, Upload } from "lucide-react";

const DragDrop = ({
  handleUpload,
  handleFileChange,
  selectedFile,
  setSelectedFile,
  setLoading,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    startUpload();
    const droppedFile = event.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const startUpload = () => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);
  };

  return (
    <div className="file-upload-container">
      <h2>Upload file</h2>
      <div
        className={`file-drop-area ${isDragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <FileUpIcon className="icon" />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files[0])}
          style={{ display: "none" }}
        />

        <p>
          Drag and drop file here, or{" "}
          <span
            onClick={() => {
              fileInputRef.current.click();
              startUpload();
            }}
          >
            browse
          </span>
        </p>
        <p>Supports JPEGs and PNGs</p>
      </div>

      {selectedFile && (
        <div className="file-info-container">
          <div className="file-info">
            <p className="file-name">{selectedFile.name}</p>
            <p className="file-size">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="action-buttons">
        <button className="cancel-button" onClick={() => setSelectedFile(null)}>
          Cancel
        </button>
        <button
          onClick={(e) => {
            setLoading(true);
            handleUpload();
          }}
          disabled={!selectedFile}
        >
          Upload & Predict
        </button>
      </div>
    </div>
  );
};

export default DragDrop;
