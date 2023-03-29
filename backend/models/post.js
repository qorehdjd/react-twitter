module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // MySQL에서는 users 테이블 생성
    // id는 기본적으로 들어있다.
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, { // User 모델에대한 기본적인 세팅
    charset: 'utf8mb4', // 한글 + 이모티콘
    collate: 'utf8mb4_general_ci', // 한글+이모티콘 저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // belongsTo면 {}형태로 나온다.
    db.Post.hasMany(db.Comment); // hasMany면 []형태로 나온다.
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'}); // belongsToMany면 [] 형태로 나온다.
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers'}); // as는 자바스크립트에서 불러올때 사용 ex) post.likers
    db.Post.belongsTo(db.Post, {as: 'Retweet'}); // 칼럼에 RetweetId로 바뀐다. foreignKey: 'RetweetId'가 생략되었다.
  };
  return Post;
}