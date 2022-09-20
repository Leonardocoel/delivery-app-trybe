const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
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
  }
  );

  return Product;
};

module.exports = Product;