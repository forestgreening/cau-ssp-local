module.exports = (sequelize, DataTypes) => {
  const MaterialRental = sequelize.define('MaterialRental', {
    fileName: {
      type: DataTypes.STRING(30),
    },
    contractQuantity: {
      type: DataTypes.INTEGER(40),
    },
    companyName: {
      type: DataTypes.STRING(30),
    },
    quantity: {
      type: DataTypes.INTEGER(40),
    },
    date: {
      type: DataTypes.DATE,
    },
    match: {
      type: DataTypes.STRING(10),
    },
    isReaded: {
      type: DataTypes.BOOLEAN(),
    },
  }, {
    charset: 'utf8',
    colate: 'utf8_general_ci',
  });

  return MaterialRental;
};
