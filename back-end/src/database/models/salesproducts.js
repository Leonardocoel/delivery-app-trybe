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
      tableName: "sales_products",
    }
  );

  SalesProducts.associate = (models) => {

    models.Sale.belongsToMany(models.products, {
      through: SalesProducts, as: 'products',
      foreignKey: 'saleId', as: 'products' })

    models.products.belongsToMany(models.Sale, {
      through: SalesProducts, as: 'sales',
      foreignKey: 'productId', as: 'saleFK' })  
  }
  
  return SalesProducts;
};

module.exports = SalesProducts;
