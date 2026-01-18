import db from '../models/index.js'
import { DatabaseError } from '../errors/index.js';
import { where } from 'sequelize';
import { Op } from 'sequelize'


const { Job, Company } = db;


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
    async getAllActiveJobs(title, location, page = 1, limit = 6) {
        try {
            // Offset calculation: Page 1 pe 0 skip, Page 2 pe 'limit' jitne skip
            const offset = (page - 1) * limit;

            const query = {
                where: {
                    is_active: true
                },
                include: [
                    {
                        model: Company,
                        as: 'company',
                        attributes: ['id', 'name', 'logo']
                    }
                ],
                // Pagination fields
                limit: parseInt(limit),
                offset: parseInt(offset),
                // Hamesha latest jobs upar dikhao
                order: [['createdAt', 'DESC']]
            };

            // Dynamic filters logic same rahega
            if (title) {
                query.where.title = { [Op.like]: `%${title}%` };
            }

            if (location) {
                query.where.location = { [Op.like]: `%${location}%` };
            }

            const { rows, count } = await Job.findAndCountAll(query);

            return {
                jobs: rows,
                totalJobs: count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page)
            };

        } catch (error) {
            console.error('[getActiveJob]', error);
            // ... error handling same
        }
    }


    async getAllJobs() {
        try {
            const jobs = await Job.findAll({
                include: [{
                    model: Company,
                    as: 'company',
                    attributes: ['id', 'name', 'logo', 'website']
                }]
            });
            return jobs;
        } catch (error) {
            console.error('[getAllJobs]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to fetch all jobs',
                error
            )
        }
    }
}

export default jobRepository;