import React from "react";
import "../styles/NeonLoading.scss";

const NeonLoading = () => {
  return (
    <>
      <div className="neon-orb">
        <div className="steam">
          <div className="anima">
            <span style={{ "--i": 0.5 }}></span>
            <span style={{ "--i": 0.3 }}></span>
            <span style={{ "--i": 1.5 }}></span>
            <span style={{ "--i": 2.5 }}></span>
            <span style={{ "--i": 0.1 }}></span>
            <span style={{ "--i": 0.1 }}></span>
            <span style={{ "--i": 1.5 }}></span>
            <span style={{ "--i": 1 }}></span>
          </div>
        </div>
        <p>Please wait prediction is Loading...</p>
      </div>
    </>
  );
};

export default NeonLoading;
