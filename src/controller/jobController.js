import { all, formToJSON } from "axios";
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

export const getSingleJob = async(req,res,next)=>{
    try {
        const {jobid} = req.params;
        const job = await service.getSingleJob(parseInt(jobid));
        return res.status(200).json(
            new ApiResponse(
                200,
                job,
                'job fetched successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}

export const getAllActiveJobs = async(req,res,next)=>{
    try {
        const {title,location,page=1,limit = 6} = req.query;
        const allJobs = await service.getAllActiveJob(title,location,parseInt(page),parseInt(limit));
        console.log(allJobs)
        return res.status(200).json(
            new ApiResponse(
                200,
                allJobs,
                'all active jobs fetched successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}

// export const getAllJobs = async(req,res,next)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }

