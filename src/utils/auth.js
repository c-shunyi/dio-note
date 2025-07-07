import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: '未登录' });
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'dio_secret');
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: '无效token' });
  }
};

export default auth; 