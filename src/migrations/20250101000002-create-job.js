'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', { // Lowercase tableName 'jobs'
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      salary: {
        type: Sequelize.DECIMAL(10, 2), // Precision for currency
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      work_location: {
        type: Sequelize.ENUM('remote', 'on_site', 'hybrid'),
        allowNull: false
      },
      job_type: {
        type: Sequelize.ENUM('full_time', 'part_time', 'intern'),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      opening: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'companies', // Name of the target table (lowercase)
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      posted_recruiter_id: {
        type: Sequelize.INTEGER,
        allowNull: false // User service ki ID reference
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: { // Matches underscored: true
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: { // Matches underscored: true
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jobs');
  }
};