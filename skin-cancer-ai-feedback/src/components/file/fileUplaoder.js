import React, { useState } from "react";

import "../../styles/fileUploader.scss";
import FileItem from "./fileItem";

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  // Base upload speed (bytes per millisecond)
  const UPLOAD_SPEED = 5000; // 5 KB/ms (adjust as needed)

  // Function to simulate file upload progress
  const simulateUpload = (file, uniqueId) => {
    // Calculate the estimated upload duration based on file size
    const totalDuration = file.size / UPLOAD_SPEED; // Duration in ms based on file size
    const updateInterval = 100; // Interval in ms to update progress
    const progressIncrement = 100 / (totalDuration / updateInterval); // Calculate progress increment per interval

    const interval = setInterval(() => {
      setFiles((prevFiles) => {
        return prevFiles.map((f) => {
          if (f.id === uniqueId) {
            // Update progress for the specific file by ID
            const newProgress = f.progress + progressIncrement;
            if (newProgress >= 100) {
              clearInterval(interval); // Stop updating once we reach 100%
              return { ...f, progress: 100, status: "completed" };
            }
            return { ...f, progress: newProgress };
          }
          return f; // Return other files unchanged
        });
      });
    }, updateInterval); // Set interval to periodically update progress
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 4 - files.length); // Limit to 4 files
    const newFiles = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9), // Unique ID for each file
      file,
      progress: 0,
      status: "uploading", // Initial status
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Start simulated upload for each new file
    newFiles.forEach((file) => simulateUpload(file.file, file.id));
  };

  const removeFile = (id) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <div className="file-uploader">
      <div className="upload-area">
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          accept="image/png, image/jpeg, image/gif"
        />
        <p>
          Drag and drop files here, or <span>browse</span>
        </p>
        <p className="note">Supports JPEGs, PNGs, and GIFs up to 10MB</p>
      </div>

      <div className="file-list">
        {files.map((fileData) => (
          <FileItem
            key={fileData.id}
            file={fileData.file}
            progress={fileData.progress}
            status={fileData.status}
            onRemove={() => removeFile(fileData.id)}
          />
        ))}
      </div>

      <div className="confirm-section">
        <button
          disabled={files.length === 0}
          onClick={() => alert("Files confirmed!")}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
