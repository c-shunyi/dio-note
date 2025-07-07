const DioNoteModel = (sequelize, DataTypes) => {
  const DioNote = sequelize.define('DioNote', {
    userAId: { type: DataTypes.INTEGER, allowNull: false },
    userBId: { type: DataTypes.INTEGER, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false }, // 时长，单位分钟
    posture: { type: DataTypes.STRING },
    mood: { type: DataTypes.STRING },
    remark: { type: DataTypes.STRING },
  });
  return DioNote;
};

export default DioNoteModel; 