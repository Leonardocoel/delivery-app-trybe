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

    models.Sale.belongsToMany(models.products, {
      through: SalesProducts, as: 'products',
      foreignKey: "productId", as: "productFK" })

    models.products.belongsToMany(models.Sale, {
      through: SalesProducts, as: 'sales',
      foreignKey: "saleId", as: "saleFK" })  
  }
  
  return SalesProducts;
};

module.exports = SalesProducts;
