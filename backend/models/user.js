module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // MySQL에서는 users 테이블 생성
    // id는 기본적으로 들어있다.
    email: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100), // 비밀번호는 암호화를 하는데 암호화를 하게되면 길어지게된다
      allowNull: false,
    },
  }, { // User 모델에대한 기본적인 세팅
    charset: 'utf8', //한글 쓴다
    collate: 'utf8_general_ci', // 한글 저장
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked'}); // 다대다 관계 좋아요(post)와 사용자와의 관계
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId'});
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId'});
  };
  return User
}