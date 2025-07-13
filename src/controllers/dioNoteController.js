import { DioNote, User } from '../models/index.js';
import { success, fail } from '../utils/response.js';

export const createDioNote = async (req, res, next) => {
  try {
    const { duration, posture, mood, remark } = req.body;
    const user = await User.findByPk(req.userId);
    if (!user.friendId) return res.json(fail('未绑定dio友'));
    // 保证userId小的在前
    const [userAId, userBId] = user.id < user.friendId ? [user.id, user.friendId] : [user.friendId, user.id];
    const note = await DioNote.create({ userAId, userBId, duration, posture, mood, remark });
    res.json(success(note, '创建笔记成功'));
  } catch (err) {
    next(err);
  }
};

export const getDioNotes = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user.friendId) return res.json(fail('未绑定dio友'));
    const [userAId, userBId] = user.id < user.friendId ? [user.id, user.friendId] : [user.friendId, user.id];
    const notes = await DioNote.findAll({ where: { userAId, userBId } });
    res.json(success(notes, '获取笔记列表成功'));
  } catch (err) {
    next(err);
  }
}; 