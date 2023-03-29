module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // MySQL에서는 users 테이블 생성
    // id는 기본적으로 들어있다.
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, { // User 모델에대한 기본적인 세팅
    charset: 'utf8mb4', // 한글 + 이모티콘
    collate: 'utf8mb4_general_ci', // 한글+이모티콘 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // UserId:{} 칼럼을 생성해준다
    db.Comment.belongsTo(db.Post); // PostId:{} 칼럼을 생성해준다.
  };
  return Comment;
}