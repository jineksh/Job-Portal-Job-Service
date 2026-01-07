import { ApiError } from "../errors/index.js";
import applicationRepository from "../repository/application.js";
import emailProducer from '../producers/mail.js'

class applicationService {
    constructor(params) {
        this.repository = new applicationRepository();
    }


    async createApplication(data) {
        try {
            const application = await this.repository.create(data);
            return application;
        } catch (error) {
            console.error('[applicationService:createApplication]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to create Application',
                500,
                error
            );
        }
    }

    async getAllUserApplication(userId) {
        try {
            const applications = await this.repository.getAllUserApplications(userId);
            return applications;
        } catch (error) {
            console.error('[applicationService:getallApplication]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to fetch all Applications',
                500,
                error
            );
        }
    }

    async getAllJobApplications(jobId, user) {
        try {
            // if(user.role !== 'recruiter'){
            //     throw new ApiError('Forbidden: Only recruiters can get all job applications', 403);
            // }
            const applications = await this.repository.getAllJobApplications(jobId);

            if (applications.length === 0) {
                return [];
            }

            return applications;
        } catch (error) {
            console.error('[applicationService:getallApplication]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to fetch all job Applications',
                500,
                error
            );
        }
    }

    async updateApplication(id, status, user) {
        try {
            const application = await this.repository.getApplicationById(id);
            if (user.role === 'job_seeker') {
                throw new ApiError(
                    'Forbidden: only recruiter can update application',
                    403
                );
            }
            if (!application) {
                throw new ApiError("Application does not exist", 400);
            }
            const updateData = {
                status: status
            };

            const updatedApplication = await this.repository.updateApplication(id, updateData);

            const applicantId = updatedApplication.applicant_id;

            console.log(applicantId);

            const jobTitle = updatedApplication.job.title;

            emailProducer({ applicantId, jobTitle });

            return updatedApplication;


        } catch (error) {
            console.error('[applicationService:updateApplication]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to update job Applications',
                500,
                error
            );
        }
    }


}

export default applicationService;