import companyRepository from "../repository/companyRepository.js";
import { ApiError, ValidationError } from "../errors/index.js";
import { deleteFile, uploadToCloudinary } from "../apis/uploadServer.js";

import getDataUri from "../utils/datUri.js";

class companyService {
    constructor() {
        this.repository = new companyRepository();
    }

    async createCompany(data, user, file) {
        try {
            if (!user) {
                throw new ApiError("User does not exist", 400);
            }

            if (user.role !== 'recruiter') {
                throw new ApiError('Forbidden: Only recruiters can create company', 403);
            }

            if (!file) {
                throw new ApiError("Company logo is required", 400);
            }

            const fileUri = getDataUri(file);

            // create a upload payload
            const uploadPayload = {
                buffer: fileUri.content,
            }

            // upload to cloudinary
            const uploadResponse = await uploadToCloudinary(uploadPayload);
            if (!uploadResponse || !uploadResponse.url) {
                throw new ApiError("Failed to upload Company logo", 500);
            }

            data.logo = uploadResponse.url;
            data.logo_public_id = uploadResponse.public_id;
            data.recruiter_id = user.id;

            const company = await this.repository.createCompany(data);

            return company;
        } catch (error) {
            console.error('[companyService:createCompnay]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to creata company',
                500,
                error
            );
        }
    }

    async deleteCompany(id) {
        try {
            const company = await this.repository.getCompany(id);

            if (!company) {
                throw new ApiError("Company does not exist", 400);
            }

            const logo_public_id = company.logo_public_id;

            const result = await deleteFile(logo_public_id);

            if (!result.success) {
                throw new ApiError("Failed to delete company logo", 500);
            }

            const response = await this.repository.deleteCompany(id);

            return response;
        } catch (error) {
            console.error('[companyService:deleteCompany]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to delete company',
                500,
                error
            );
        }
    }

    async getCompanyDetails(id){
        try {
            const company = await this.repository.getCompanyDetails(id);
            return company;
        } catch (error) {
            console.error('[companyService:getCompanyDetails]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to fetch company details',
                500,
                error
            );
        }
    }

    async getAllCompanies(id){
        try {
            const allCompanies = await this.repository.getAllCompanies(id);
            return allCompanies;
        } catch (error) {
             console.error('[companyService:getAllCompany]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to fetch allCompanies',
                500,
                error
            );
        }
    }
}

export default companyService;