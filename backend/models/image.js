module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', { // MySQL에서는 users 테이블 생성
    // id는 기본적으로 들어있다.
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, { // User 모델에대한 기본적인 세팅
    charset: 'utf8', // 한글 + 이모티콘
    collate: 'utf8_general_ci', // 한글+이모티콘 저장
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
}