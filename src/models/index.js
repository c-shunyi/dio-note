import { Sequelize } from 'sequelize';
import UserModel from './user.js';
import FriendModel from './friend.js';
import DioNoteModel from './dioNote.js';

const sequelize = new Sequelize('dio_note', 'shunyi', 'chen1203', {
  host: '154.12.94.154',
  dialect: 'mysql',
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = UserModel(sequelize, Sequelize);
db.Friend = FriendModel(sequelize, Sequelize);
db.DioNote = DioNoteModel(sequelize, Sequelize);

export const { User, Friend, DioNote } = db;
export { sequelize }; 