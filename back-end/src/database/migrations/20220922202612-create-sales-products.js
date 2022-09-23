"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("salesProducts", {
      saleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: "sale_id",
        references: {
          model: 'sales',
          key: 'id'
        },
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: "product_id",
        references: {
          model: 'products',
          key: 'id'
        },
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("salesProducts");
  },
};
