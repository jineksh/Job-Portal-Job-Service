import { ApiError } from "../errors/index.js";
import applicationRepository from "../repository/application.js";

class applicationService{
    constructor(params) {
        this.repository = new applicationRepository();
    }


    async createApplication(data){
        try {
            const application =  await this.repository.create(data);
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

    async getAllUserApplication(userId){
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


}

export default applicationService;