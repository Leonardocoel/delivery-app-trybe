const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define("products", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE(10, 2),
    urlImage: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
    tableName: "products"
  }
  );

  return Product;
};

module.exports = Product;