import jobService from "../service/jobService.js";
import ApiResponse from "../utils/apiResponse.js";

const service = new jobService();

export const createJob = async(req,res,next)=>{
    try {
        const {id} = req.user;
        const data = req.body;
        const job = await service.createJob(data,id);
        return res.status(200).json(
            new ApiResponse(
                200,
                job,
                'job created successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}


export const updateJob = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const data = req.body;
        const updatedJob = await service.updateJob(data,parseInt(id));
        return res.status(200).json(
            new ApiResponse(
                200,
                updatedJob,
                'job updated successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}