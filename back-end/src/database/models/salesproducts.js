const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    "SalesProduct",
    {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      underscored: true,
      timestamps: false,
      tableName: "salesProducts",
    }
  );

  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.products, {foreignKey: "productId", as: "productFK" })
    SalesProducts.belongsTo(models.Sale, {foreignKey: "saleId", as: "saleFK" })  
  }
  

  return SalesProducts;
};

module.exports = SalesProducts;
