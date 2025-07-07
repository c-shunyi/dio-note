const FriendModel = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    friendUserId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  });
  return Friend;
};

export default FriendModel; 