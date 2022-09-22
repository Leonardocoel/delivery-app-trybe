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
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
      },
      urlImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "products",
    }
  );

  return Product;
};

module.exports = Product;
