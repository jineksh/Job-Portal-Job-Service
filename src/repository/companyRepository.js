import db from '../models/index.js'
import { DatabaseError } from '../errors/index.js';


const {Company} = db;

class companyRepository {
    async createCompany(data){
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

    async getCompany(id){
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

    async deleteCompany(id){
        try {
            const response = await Company.destroy({
                where : { id }
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
}

export default companyRepository;