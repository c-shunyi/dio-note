import { User, Friend } from '../models/index.js';
import { success, fail } from '../utils/response.js';

export const bindFriend = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;
    const user = await User.findByPk(req.userId);
    console.log(user);
    if (!user) return res.json(fail('404', '用户不存在'));
    if (user.friendId) return res.json(fail('400', '你已绑定dio友'));
    
    const friend = await User.findOne({ where: { inviteCode } });
    if (!friend || friend.id === user.id) return res.json(fail('400', '无效的邀请码'));
    if (friend.friendId) return res.json(fail('400', '对方已绑定dio友'));
    
    // 互相绑定
    user.friendId = friend.id;
    friend.friendId = user.id;
    await user.save();
    await friend.save();
    await Friend.create({ userId: user.id, friendUserId: friend.id });
    await Friend.create({ userId: friend.id, friendUserId: user.id });
    
    res.json(success({ 
      friend: { id: friend.id, username: friend.username } 
    }, '绑定成功'));
  } catch (err) {
    next(err);
  }
}; 