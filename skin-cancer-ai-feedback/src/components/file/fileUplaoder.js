import React, { useState } from "react";

import "../../styles/fileUploader.scss";
import FileItem from "./fileItem";

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const UPLOAD_SPEED = 5000;

  const simulateUpload = (file, uniqueId) => {
    const totalDuration = file.size / UPLOAD_SPEED;
    const updateInterval = 100;
    const progressIncrement = 100 / (totalDuration / updateInterval);

    const interval = setInterval(() => {
      setFiles((prevFiles) => {
        return prevFiles.map((f) => {
          if (f.id === uniqueId) {
            const newProgress = f.progress + progressIncrement;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: "completed" };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        });
      });
    }, updateInterval);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 4 - files.length);
    const newFiles = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "uploading",
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

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
