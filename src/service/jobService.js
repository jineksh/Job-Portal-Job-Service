import { ApiError, ValidationError } from "../errors/index.js";
import jobRepository from "../repository/jobRepository.js";


class jobService {

    constructor() {
        this.repository = new jobRepository();
    }

    async createJob(data, id) {

        try {
            if (
                !data.title ||
                !data.description ||
                !data.location ||
                !data.work_location ||
                !data.salary ||
                !data.job_type ||
                !data.role ||
                data.opening == null ||
                !data.company_id ||
                !id ||
                data.is_active === undefined
            ) {
                throw new ApiError('All fields are required', 400);
            }
            const jobData = { ...data, posted_recruiter_id: id };

            const job = await this.repository.createJob(jobData);

            return job;
        } catch (error) {
            console.error('[jobService:createJob]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to creata job',
                500,
                error
            );
        }
    }

    async updateJob(data,id){
        try {
            const updatedJob = await this.repository.updateJob(data,id);
            return updatedJob;
        } catch (error) {
            console.error('[jobService:updateJob]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to update job',
                500,
                error
            );
        }
    }

    async getSingleJob(jobId){
        try {
            const job = await this.repository.getSingleJob(jobId);
            return job;
        } catch (error) {
            console.error('[jobService:getSingleJob]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to fetch job',
                500,
                error
            );
        }
    }

    async getAllActiveJob(title,location,page,limit){
        try {
           const activeJobs = await this.repository.getAllActiveJobs(title,location,page,limit);
           return activeJobs; 
        } catch (error) {
            console.error('[jobService:getAllActiveJob]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to fetch all active job',
                500,
                error
            );
        }
    }

    async getAllJobs(){
        try {
           const allJobs = await this.repository.getAllJobs();
              return allJobs;
        } catch (error) {
            console.error('[jobService:getAllJobs]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to fetch all job',
                500,
                error
            );
        }
    }



}


export default jobService;