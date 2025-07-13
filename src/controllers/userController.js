import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { success, fail } from '../utils/response.js';

const genInviteCode = () => Math.random().toString(36).substr(2, 8);

// 用户注册
export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // 1.判断是否传入数据
    if (!username || !password) return res.json(fail('400', '请输入用户名和密码'));
    // 2.判断用户名是否存在
    const userExist = await User.findOne({ where: { username } });
    if (userExist) return res.json(fail('400', '用户名已存在'));
    // 3.判断密码是否符合要求（密码长度不能小于6位，不能大于16位）
    if (password.length < 6 || password.length > 16) return res.json(fail('400', '密码长度不能小于6位，不能大于16位'));
    // 4.生成邀请码 
    const inviteCode = genInviteCode();
    // 5.生成密码hash
    // const hash = await bcrypt.hash(password, 10);
    // 6.创建用户
    const user = await User.create({ username, password, inviteCode });
    // 7.返回用户信息
    res.json(success({ id: user.id, username: user.username, inviteCode: user.inviteCode }, '注册成功'));
  } catch (err) {
    next(err);
  }
};

// 用户登录
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // 1.判断是否传入数据
    if (!username || !password) return res.json(fail('400', '请输入用户名和密码'));
    // 2.判断用户名是否存在
    const user = await User.findOne({ where: { username } });
    if (!user) return res.json(fail('401', '用户不存在'));
    // 3.判断密码是否正确
    // const match = await bcrypt.compare(password, user.password);
    // if (!match) return res.json(fail('401', '密码错误'));
    if (password !== user.password) return res.json(fail('401', '密码错误'));
    // 4.生成token
    const token = jwt.sign({ id: user.id }, 'dio_secret', { expiresIn: '7d' });
    res.json(success({
      token,
      user: { id: user.id, username: user.username, inviteCode: user.inviteCode }
    }, '登录成功'));
  } catch (err) {
    next(err);
  }
};

// 获取用户信息
export const getProfile = async (req, res, next) => {
  try {
    // 1.判断是否传入userId
    if (!req.userId) return res.json(fail('401', 'token异常'));
    // 2.根据userId查询用户
    const user = await User.findByPk(req.userId);
    if (!user) return res.json(fail('404', '用户不存在'));
    // 3.返回用户信息
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