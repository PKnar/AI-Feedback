// frontend/src/components/BoundingBoxCanvas.js
import React from "react";
import { Stage, Layer, Rect } from "react-konva";

function BoundingBoxCanvas({ imageUrl, boxes, setBoxes }) {
  const handleDrag = (index, e) => {
    const newBoxes = boxes.slice();
    newBoxes[index] = {
      ...newBoxes[index],
      x_center: e.target.x() / e.target.getStage().width(),
      y_center: e.target.y() / e.target.getStage().height(),
    };
    setBoxes(newBoxes);
  };

  const handleResize = (index, e) => {
    const newBoxes = boxes.slice();
    newBoxes[index] = {
      ...newBoxes[index],
      width: e.target.width() / e.target.getStage().width(),
      height: e.target.height() / e.target.getStage().height(),
    };
    setBoxes(newBoxes);
  };

  return (
    <Stage
      width={500}
      height={500}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Layer>
        {boxes.map((box, index) => (
          <Rect
            key={index}
            x={box.x_center * 500 - (box.width * 500) / 2}
            y={box.y_center * 500 - (box.height * 500) / 2}
            width={box.width * 500}
            height={box.height * 500}
            fill="rgba(255, 0, 0, 0.3)"
            draggable
            onDragMove={(e) => handleDrag(index, e)}
            onTransformEnd={(e) => handleResize(index, e)}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default BoundingBoxCanvas;
