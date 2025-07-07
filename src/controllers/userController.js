import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { success, fail } from '../utils/response.js';

const genInviteCode = () => Math.random().toString(36).substr(2, 8);

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const inviteCode = genInviteCode();
    const user = await User.create({ username, password: hash, inviteCode });
    res.json(success({ id: user.id, username: user.username, inviteCode: user.inviteCode }, '注册成功'));
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.json(fail('401', '用户不存在'));
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json(fail('401', '密码错误'));
    
    const token = jwt.sign({ id: user.id }, 'dio_secret', { expiresIn: '7d' });
    res.json(success({
      token,
      user: { id: user.id, username: user.username, inviteCode: user.inviteCode }
    }, '登录成功'));
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.json(fail('404', '用户不存在'));
    }
    res.json(success({
      id: user.id,
      username: user.username,
      inviteCode: user.inviteCode,
      friendId: user.friendId
    }, '获取用户信息成功'));
  } catch (err) {
    next(err);
  }
}; 