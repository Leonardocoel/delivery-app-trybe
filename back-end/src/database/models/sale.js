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
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
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
    Sale.hasOne(models.users, { foreignKey: "userId", as: "userId" });
    Sale.hasOne(models.users, { foreignKey: "sellerId", as: "sellerId" });
  };

  return Sale;
};

module.exports = Sale;
