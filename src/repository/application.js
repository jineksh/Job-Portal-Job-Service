import { where } from "sequelize";
import { DatabaseError } from "../errors/index.js";
import db from '../models/index.js'
import company from "../models/company.js";



const { Application,Job,Company } = db;


class applicationRepository {
    async create(data) {
        try {
            const application = await Application.create(data);
            return application;
        } catch (error) {
            console.error('[createApplication]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to create Application',
                error
            )
        }
    }

    async getAllUserApplications(userId){
        try {
            const application = await Application.findAll({
                where : {applicant_id : userId},
                include : [{
                    model : Job,
                    as : 'job',
                    attributes : ['id','title','salary','location','work_location'],
                    include : [{
                        model : Company,
                        as :  'company',
                        attributes : ['id','name','logo','description','website']
                    }]

                }],
                order: [['createdAt', 'DESC']]
            });
            return application;
        } catch (error) {
            console.error('[getalluserApplication]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to get all user Application',
                error
            )
        }
    }
}

export default applicationRepository;