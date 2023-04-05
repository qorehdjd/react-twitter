const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const {Post, Comment, Image, User, Hashtag} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (e) {
  console.log('uploads 폴더가 없어서 생성합니다.');
  fs.mkdirSync('uploads');
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
})
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'react-twitter',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post('/', isLoggedIn, upload.none(), async(req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() }})));
      // 해시태그 중복일 때는 가져오고 없을 때는 등록한다.
      // result 값은 [ [노드, true], [리액트, true] ]
      await post.addHashtags(result.map(v => v[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지를 여러개 올리면 image: [강아지.png, 고구마.png]
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        // Image.create()에서 {postId: req.params.postId} 하게되면 post와 image가 연결되지만 id를 안적어줬을경우 post.addImages()로 연결해줘야된다.
        await post.addImages(images);
      }else { // 이미지를 하나만 올리면 image: 강아지.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: User, //좋아요 누른사람
        as: 'Likers',
        attributes: ['id'],
      }]
    })
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


router.post('/:postId/comment', isLoggedIn, async(req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: Number(req.params.postId),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }]
    });
    res.status(201).json(fullComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:postId/like', isLoggedIn, async(req, res, next) => {
  try {
    console.log(1234);
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.delete('/:postId/like',isLoggedIn, async(req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(err);
    next(err);
  }
});

router.delete('/:postId', isLoggedIn,  async(req, res, next) => {
  try {
    const post = await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id }
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    res.status(200).json(Number(req.params.postId));
  } catch (e) {
    console.error(e);
    next(e);
  }
})

router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
  // const Image = await Image.create({
  //   src: req.files.map(v => v.filename)
  // });
  res.json(req.files.map(v => v.location));
})

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Post,
        as: 'Retweet',
      }]
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    if (post.UserId === req.user.id || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      }
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗한 게시글 입니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }, {
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
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }]
    })
    res.status(200).json(retweetWithPrevPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
})

router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }, 
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      },{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: User, //좋아요 누른사람
        as: 'Likers',
        attributes: ['id'],
      }]
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글 입니다.');
    }
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    next(e);
  }
})

module.exports = router;