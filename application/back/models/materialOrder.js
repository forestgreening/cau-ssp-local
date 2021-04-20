module.exports = (sequelize, DataTypes) => {
  const MaterialOrder = sequelize.define('MaterialOrder', {
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
  }, {
    charset: 'utf8',
    colate: 'utf8_general_ci',
    tableName: 'materialOrders',
  });

  return MaterialOrder;
};
