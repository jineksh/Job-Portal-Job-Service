'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Application extends Model {
    static associate(models) {
      // We only keep the internal relation to the Job table
      this.belongsTo(models.Job, {
        foreignKey: 'job_id',
        as: 'job'
      });
    }
  }

  Application.init({
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Stored as a raw ID since User Service owns the User data
    applicant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
      allowNull: false
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: true 
      }
    },
    applied_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    subscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Application',
    tableName: 'applications',
    underscored: true,
  });

  return Application;
};