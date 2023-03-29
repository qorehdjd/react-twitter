module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { // MySQL에서는 users 테이블 생성
    // id는 기본적으로 들어있다.
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, { // User 모델에대한 기본적인 세팅
    charset: 'utf8mb4', // 한글 + 이모티콘
    collate: 'utf8mb4_general_ci', // 한글+이모티콘 저장
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post,  { through: 'PostHashtag'});
  };
  return Hashtag;
}