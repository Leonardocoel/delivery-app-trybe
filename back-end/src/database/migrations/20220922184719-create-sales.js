'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: "user_id",
        references: {
          model: 'users',
          key: 'id',
        },
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: "seller_id",
        references: {
          model: 'users',
          key: 'id',
        },
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9,2),
        allowNull:false,
        field: "total_price"
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        allowNull:false,
        field: "delivery_address"
      },
      deliveryNumber:{
        type: Sequelize.STRING(50),
        allowNull:false,
        field: "delivery_number",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: "sale_date"
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};