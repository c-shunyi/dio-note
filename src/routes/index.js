import express from 'express';
import userRoutes from './user.js';
import friendRoutes from './friend.js';
import dioNoteRoutes from './dioNote.js';
import auth from '../utils/auth.js';

const router = express.Router();

// 白名单：无需鉴权的接口
const whiteList = [
  '/user/register',
  '/user/login',
];
// 注册中间件，白名单的接口不鉴权
router.use((req, res, next) => {
  if (whiteList.includes(req.path)) {
    return next();
  }
  return auth(req, res, next);
});
router.use('/user', userRoutes);
router.use('/friend', friendRoutes);
router.use('/dio-note', dioNoteRoutes);

export default router; 