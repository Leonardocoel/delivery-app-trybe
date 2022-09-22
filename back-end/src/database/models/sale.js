const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveryNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
      createdAt: "sale_date",
      updatedAt: false,
      tableName: "sales",
    }
  );

  Sale.associate = (models) => {
    Sale.hasOne(models.users, { foreignKey: "userId", as: "userFK" });
    Sale.hasOne(models.users, { foreignKey: "sellerId", as: "sellerFK" });
  };

  return Sale;
};

module.exports = Sale;
