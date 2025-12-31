'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      // Relation: One Company has many Jobs
      this.hasMany(models.Job, {
        foreignKey: 'company_id',
        as: 'jobs',
        onDelete: 'CASCADE' // If a company is deleted, its jobs are also removed
      });
    }
  }

  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Usually company names should be unique
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo_public_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Cloudinary or storage service public ID'
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true // Ensures the input is a valid website link
      }
    },
    recruiter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Reference to User Service recruiter ID'
    }
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
    underscored: true,
  });

  return Company;
};