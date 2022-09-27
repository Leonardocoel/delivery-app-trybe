const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "products",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },
      urlImage: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "products",
    }
  );
  Product.associate = (models) => {
  Product.hasMany(models.SalesProduct, {foreignKey: "productId", as: "products" })
  }

  return Product;
};

module.exports = Product;
