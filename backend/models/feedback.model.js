export default (sequelize, DataTypes) => {
  const Feedback = sequelize.define("feedback", {
    agree: { type: DataTypes.BOOLEAN, allowNull: false },
    annotation: { type: DataTypes.STRING, allowNull: true },
    comment: { type: DataTypes.STRING, allowNull: true },
    boundingBoxes: { type: DataTypes.JSONB, allowNull: true },
  });

  return Feedback;
};
