import db from '../models/index.js'
import { DatabaseError } from '../errors/index.js';
import { where } from 'sequelize';
import { Op } from 'sequelize'

const { Job } = db;


class jobRepository {


    async createJob(data) {
        try {
            const job = await Job.create(data);
            return job;
        } catch (error) {
            console.error('[createJob]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to create Job',
                error
            )
        }
    }

    async updateJob(data, id) {
        try {
            const job = await Job.findByPk(id);
            if (!job) {
                throw new DatabaseError('job is not exits', 404)
            }
            const updatedJob = await job.update(data);



            return updatedJob;
        } catch (error) {
            console.error('[updateJob]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to update Job',
                error
            )
        }
    }

    async getSingleJob(id) {
        try {
            const job = await Job.findByPk(id);
            if (!job) {
                throw new DatabaseError('Job not found', 404);
            }
            return job;
        } catch (error) {
            console.error('[getSingleJob]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to fetch Job',
                error
            )
        }
    }
    async getAllActiveJobs(title, location) {
        try {
            const query = {
                where: {
                    is_active: true // Ensure you only get active jobs
                }
            };

            // Dynamically add search filters
            if (title) {
                query.where.title = { [Op.like]: `%${title}%` };
            }
            if (location) {
                query.where.location = { [Op.like]: `%${location}%` };
            }

            return await Job.findAll(query);
        } catch (error) {
            console.error('[getActiveJob]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to fetch Job',
                error
            )
        }
    }

}

export default jobRepository;