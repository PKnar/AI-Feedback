function normalizeBoundingBox(box, imageWidth, imageHeight) {
  const x_center = (box.x_min + box.x_max) / 2 / imageWidth;
  const y_center = (box.y_min + box.y_max) / 2 / imageHeight;
  const width = (box.x_max - box.x_min) / imageWidth;
  const height = (box.y_max - box.y_min) / imageHeight;

  return {
    x_center: parseFloat(x_center.toFixed(6)),
    y_center: parseFloat(y_center.toFixed(6)),
    width: parseFloat(width.toFixed(6)),
    height: parseFloat(height.toFixed(6)),
    label: box.label.toLowerCase().trim(),
  };
}

export default normalizeBoundingBox;
