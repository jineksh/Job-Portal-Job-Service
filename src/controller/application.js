import applicationService from "../service/application.js";
import ApiResponse from "../utils/apiResponse.js";

const service = new applicationService();

export const createApplication = async (req, res, next) => {
    try {
        const application = await service.createApplication(req.body);
        return res.status(200).json(
            new ApiResponse(
                200,
                application,
                'application created successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}