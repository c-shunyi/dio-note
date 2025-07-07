const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    inviteCode: { type: DataTypes.STRING, unique: true },
    friendId: { type: DataTypes.INTEGER, unique: true }, // 只能绑定一个dio友
  });
  return User;
}; 

export default UserModel;
