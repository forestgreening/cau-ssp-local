module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    loginId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    workIn: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    workInDetail: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    field: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    project: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    colate: 'utf8_general_ci',
    tableName: 'users',
  });
  User.associate = (db) => {
    db.User.hasMany(db.Photo);
  };

  return User;
};
