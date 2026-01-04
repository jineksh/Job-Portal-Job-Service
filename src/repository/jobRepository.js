import db from '../models/index.js'
import { DatabaseError } from '../errors/index.js';
import { where } from 'sequelize';

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
            if(!job){
                throw new DatabaseError('job is not exits',404)
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

}

export default jobRepository;