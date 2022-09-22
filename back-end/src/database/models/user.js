const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: "users",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.sales, { foreignKey: "userId", as: "userId" });
    User.hasMany(models.sales, { foreignKey: "sallerId", as: "sellerId" });
  };

  return User;
};

module.exports = User;
