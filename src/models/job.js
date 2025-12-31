'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      // One Job belongs to one Company (Many-to-One)
      this.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'company'
      });

      // One Job has many Applications
      this.hasMany(models.Application, {
        foreignKey: 'job_id',
        as: 'applications'
      });
    }
  }

  Job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    work_location: {
      work_location: DataTypes.ENUM('remote','on_site','hybrid'),
      allowNull: false,
      comment: 'e.g., Remote, On-site, Hybrid'
    },
    job_type: {
      type: DataTypes.ENUM('full_time', 'part_time', 'intern'),
      allowNull: false,
      comment: 'e.g., Full-time, Part-time'
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'e.g., React Developer, Node Designer'
    },
    opening: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    posted_recruiter_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Job',
    tableName: 'jobs',
    underscored: true,
  });

  return Job;
};