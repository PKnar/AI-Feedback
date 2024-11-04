import React from "react";
import "../../styles/fileItem.scss";

const FileItem = ({ file, progress, onRemove }) => (
  <div className="file-item">
    <div className="file-info">
      <div className="file-name">{file.name}</div>
      <div className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
    </div>
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
    <button onClick={onRemove} className="remove-btn">
      ✕
    </button>
  </div>
);

export default FileItem;
