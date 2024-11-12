import { Trash, Trash2, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

const ImageWithBoundingBoxes = ({
  imageUrl,
  predictions,
  scaleFactor,
  wrapperWidth,
  originalHeight,
  originalWidth,
  handleDeleteBox,
  handleUpdateBox,
  selectedBoxIndex,
}) => {
  const imageRef = useRef(null);

  return (
    <div
      className="image-wrapper"
      style={{
        position: "relative",
        width: wrapperWidth,
        height: wrapperWidth * (originalHeight / originalWidth),
        overflow: "hidden",
        border: "1px solid #ddd",
      }}
    >
      <img
        src={imageUrl}
        ref={imageRef}
        alt="Prediction"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {predictions.map((box, index) => {
        const scaledWidth = box.width * scaleFactor;
        const scaledHeight = box.height * scaleFactor;
        const scaledX = box.x_center * scaleFactor - scaledWidth / 2;
        const scaledY = box.y_center * scaleFactor - scaledHeight / 2;

        console.log({
          scaledX,
          scaledY,
          scaledWidth,
          scaledHeight,
          scaleFactor,
          box,
        });

        return (
          <Rnd
            key={index}
            size={{ width: scaledWidth, height: scaledHeight }}
            position={{ x: scaledX, y: scaledY }}
            bounds="parent"
            onDragStop={(e, d) => {
              const newXCenter = (d.x + scaledWidth / 2) / scaleFactor;
              const newYCenter = (d.y + scaledHeight / 2) / scaleFactor;
              console.log(d, newXCenter, newYCenter);
              handleUpdateBox(index, {
                ...box,
                x_center: newXCenter,
                y_center: newYCenter,
              });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const newWidth = ref.offsetWidth / scaleFactor;
              const newHeight = ref.offsetHeight / scaleFactor;
              const newXCenter =
                (position.x + ref.offsetWidth / 2) / scaleFactor;
              const newYCenter =
                (position.y + ref.offsetHeight / 2) / scaleFactor;
              handleUpdateBox(index, {
                ...box,
                width: newWidth,
                height: newHeight,
                x_center: newXCenter,
                y_center: newYCenter,
              });
            }}
            resizeHandleStyles={{
              topRight: {
                width: "8px",
                height: "8px",
                background: "red",
                margin: "5px",
              },
              bottomRight: {
                width: "8px",
                height: "8px",
                background: "red",

                margin: "5px",
              },
              bottomLeft: {
                width: "8px",
                height: "8px",
                background: "red",
                margin: "5px",
              },
              topLeft: {
                width: "8px",
                height: "8px",
                background: "red",
                margin: "5px",
              },
            }}
            style={{
              border: `${
                selectedBoxIndex === index
                  ? "2px solid blue"
                  : "1.5px solid red"
              }`,
              position: "absolute",
              backgroundColor: `${
                selectedBoxIndex === index
                  ? "rgba(0, 0, 139, 0.3)"
                  : "rgba(255, 0, 0, 0.2)"
              }`,
            }}
          >
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              {/* Delete Button */}
              <button
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-14px",
                  background: "black",
                  color: "white",
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBox(index);
                }}
              >
                <X size={12} />
              </button>
              {/* Label and Confidence */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  fontSize: "12px",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    marginTop: "-13px",
                    color: "white",
                    borderRadius: "0.5rem",
                    padding: "0.2rem",
                    textShadow: "1px 1px 4px rgba(0, 0, 0, 1)",
                  }}
                >
                  {box.label}{" "}
                  {box.confidence && `(${(box.confidence * 100).toFixed(1)}%)`}
                </span>
              </div>
            </div>
          </Rnd>
        );
      })}
    </div>
  );
};

export default ImageWithBoundingBoxes;
