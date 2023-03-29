const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const {User, Post, Comment, Image, } = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: { id: req.user.id }});
    if (!user) {
      res.status(403).send('존재하지 않는 유저입니다.');
    }
    const followers = await user.getFollowers({
      limit: Number(req.query.limit),
    });
    res.status(200).json(followers);
  } catch (e) {
    console.error(e);
    next(e);
  }
})

router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: { id: req.user.id }});
    if (!user) {
      res.status(403).send('존재하지 않는 유저입니다.');
    }
    const followings = await user.getFollowings({
      limit: Number(req.query.limit),
    });
    res.status(200).json(followings);
  } catch (e) {
    console.error(e);
    next(e);
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    console.log('userId', req.params.userId);
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.params.userId },
        attributes: ['id', 'nickname'],
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      });
      if (!fullUserWithoutPassword) { 
        res.status(404).json('존재하지 않는 사용자입니다.');
      }
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 침해 막기위하여
      data.Followings = data.Followings.length;
      data.Followers = data.Followers.length;
      res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
  if (err) {
    console.error(err);
    return next(err);
  }
  if (info) {
    return res.status(401).send(info.reason);
  }
  return req.login(user, async (loginErr) => { // passport 자체 로그인 에러 login함수 실행되면 serializeUser실행
    if (loginErr) {
      console.error(loginErr);
      return next(loginErr);
    }
    // res.setHeader('Cookie', 'chgrgr') 알아서 쿠키를 만들어준다.
    const fullUserWithoutPassword = await User.findOne({
      where: { id: user.id },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      }]
    })
    return res.status(200).json(fullUserWithoutPassword);
  })
  })(req, res, next);
})

router.post('/logout', isLoggedIn, (req, res) => { // 세션,쿠키 삭제
  req.logout((err) => {
    if (err)  return next(err);
    res.redirect('/');
  });
})

router.post('/signUp', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    })
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname,
    });
    res.status(200).send('ok'); 
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.patch('/nickname', isLoggedIn ,async(req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname
    }, {
      where: { id: req.user.id }
    });
    return res.status(200).json(req.body.nickname);
  } catch (e) {
    console.error(e);
    next(e);
  }
})

router.patch('/:nickname/follow', isLoggedIn,  async(req, res, next) => {
  try {
    const user = await User.findOne({
      where: { nickname: req.params.nickname }
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 유저입니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ nickname: req.params.nickname});
  } catch (e) {
    console.error(e);
    next(e);
  }
})

router.delete('/:nickname/unfollow', isLoggedIn, async(req, res, next) => {
  try {
    const user = await User.findOne({
      where: { nickname: req.params.nickname }
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 유저입니다.');
    }
    await user.removeFollowers(req.user.id);
    return res.status(200).json({nickname: req.params.nickname});
  } catch (e) {
    console.error(e);
    next(e);
  }
})

router.delete('/:nickname/follower', isLoggedIn, async(req, res, next) => {
  try {
    const user = await User.findOne({
      where: { nickname: req.params.nickname }
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 유저입니다.');
    }
    await user.removeFollowings(req.user.id);
    console.log('user', user);
    res.status(200).json({nickname: req.params.nickname});
  } catch (e) {
    console.error(e);
    next(e);
  }
})


router.get('/:userId/posts',  async (req, res, next) => {
  try {
    const where = {};
    where.UserId = req.params.userId;
    if (Number(req.query.lastId)) { // 스크롤로 post더 불러올 때
      where.id = { [Op.lt]: Number(req.query.lastId) } // lastId보다 작은 포스트들을 불러온다
    }
    const posts = await Post.findAll({
      where,
      limit: 5,
      order: [['createdAt', 'DESC'], [Comment, 'createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: User, //좋아요 누른사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }]
    });
    if (!posts) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
})

module.exports = router;