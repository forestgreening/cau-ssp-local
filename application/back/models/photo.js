module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    imageUrl: {
      type: DataTypes.TEXT,
    },
    latitude: {
      type: DataTypes.FLOAT(20),
    },
    longitude: {
      type: DataTypes.FLOAT(20),
    },
    hash: {
      type: DataTypes.STRING(100),
    },
    creator: {
      type: DataTypes.STRING(20),
    },
  }, {
    charset: 'utf8',
    colate: 'utf8_general_ci',
  });
  Photo.associate = (db) => {
    db.Photo.belongsTo(db.User);
  };

  return Photo;
};
