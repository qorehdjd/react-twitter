const express = require('express');
const { Op } = require('sequelize');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async(req, res, next) => {
  try {
    const where = {};
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
    res.status(200).json(posts); 
  } catch (err) {
    console.error(err);
    next(err);
  }
});



module.exports = router;