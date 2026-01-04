import ApiResponse from "../utils/apiResponse.js";
import companyService from "../service/companyService.js";


const service = new companyService();

export const createCompany = async (req, res, next) => {
    try {
        const data = req.body;
        const company = await service.createCompany(data, req.user, req.file);
        return res.status(200).json(
            new ApiResponse(
                200,
                company,
                'Company created successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}

export const deleteCompany = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.deleteCompany(parseInt(id));
        return res.status(200).json(
            new ApiResponse(
                200,
                response,
                'Company deleted successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}

export const getCompanyDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Companydeatils = await service.getCompanyDetails(parseInt(id));
        return res.status(200).json(
            new ApiResponse(
                200,
                Companydeatils,
                'Company fetched successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}

export const AllCompanies = async (req, res, next) => {
    try {
        const { id } = req.user;
        const allCompanies = await service.getAllCompanies(id);
        return res.status(200).json(
            new ApiResponse(
                200,
                allCompanies,
                'all companies fetched successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}