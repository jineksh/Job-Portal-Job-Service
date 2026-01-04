import db from '../models/index.js'
import { DatabaseError } from '../errors/index.js';
import { where } from 'sequelize';


const { Company, Job } = db;

class companyRepository {
    async createCompany(data) {
        try {
            const company = await Company.create(data);
            return company;
        } catch (error) {
            console.error('[createCompany]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to create Company',
                error
            )
        }
    }

    async getCompany(id) {
        try {
            const company = await Company.findByPk(id);
            return company;
        } catch (error) {
            console.error('[getCompany]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to fetch Company',
                error
            )
        }
    }

    async deleteCompany(id) {
        try {
            const response = await Company.destroy({
                where: { id }
            })

            return response;
        } catch (error) {
            console.error('[deleteCompany]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to delete Company',
                error
            )
        }
    }

    async getCompanyDetails(id) {
        try {
            const company = await Company.findByPk(id, {
                include: [{
                    model: Job,
                    as: 'jobs',
                }]
            }
            );

            if (!company) {
                throw new DatabaseError('company not found', 404)
            }

            return company;
        } catch (error) {
            console.error('[getCompanydetails]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to fetch Companydeatils',
                error
            )
        }
    }

    async getAllCompanies(id){
        try {
            const allCompanies = await Company.findAll({
                where : {recruiter_id : id}
            })
            return allCompanies;
        } catch (error) {
            console.error('[getAllCompany]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to fetch AllCompany',
                error
            )
        }
    }
}

export default companyRepository;