import { where } from "sequelize";
import { DatabaseError } from "../errors/index.js";
import db from '../models/index.js'
import company from "../models/company.js";

import sequelize from "sequelize";


const { Application, Job, Company } = db;


class applicationRepository {
    async create(data) {
        try {
            const application = await Application.create(data);
            return application;
        } catch (error) {
            console.error('[createApplication]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to create Application',
                error
            )
        }
    }

    async getAllUserApplications(userId) {
        try {
            const application = await Application.findAll({
                where: { applicant_id: userId },
                include: [{
                    model: Job,
                    as: 'job',
                    attributes: ['id', 'title', 'salary', 'location', 'work_location'],
                    include: [{
                        model: Company,
                        as: 'company',
                        attributes: ['id', 'name', 'logo', 'description', 'website']
                    }]

                }],
                order: [['createdAt', 'DESC']]
            });
            return application;
        } catch (error) {
            console.error('[getalluserApplication]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to get all user Application',
                error
            )
        }
    }

    async getAllJobApplications(jobId) {
        try {
            const applications = await Application.findAll({
                where: { job_id: jobId }
            })

            return applications;
        } catch (error) {
            console.error('[getalljobApplication]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to get all job Application',
                error
            )
        }
    }

    async getApplicationById(id) {
        try {
            const application = await Application.findByPk(id);
            return application;
        } catch (error) {
            console.error('[getApplication]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to get Application',
                error
            )
        }
    }

    async updateApplication(id, data) {
        try {
            const application = await Application.findByPk(id, {
                include: {
                    model: Job,
                    as : 'job',
                    attributes: ['title'],
                }
            });
            if (!application) {
                throw new DatabaseError('job is not exits', 404)
            }
            await application.update(data);

            const updatedApplication = await Application.findByPk(id, {
                include: {
                    model: Job,
                    as : 'job',
                    attributes: ['title']
                }
            });


            return updatedApplication;

        } catch (error) {
            console.error('[updateApplication]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to update Application',
                error
            )
        }
    }
}

export default applicationRepository;