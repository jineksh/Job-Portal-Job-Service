import ApiResponse from "../utils/apiResponse.js";
import companyService from "../service/companyService.js";


const service = new companyService();

export const createCompany = async(req,res,next)=>{
    try {
        const data = req.body;
        const company = await service.createCompany(data,req.user,req.file);
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

export const deleteCompany = async(req,res,next)=>{
    try {
        const { id }= req.params;
        const response = await service.deleteCompany(parseInt(id));
        return  res.status(200).json(
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