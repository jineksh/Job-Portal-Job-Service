import { DatabaseError } from "../errors/index.js";
import db from '../models/index.js'



const { Application } = db;


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
}

export default applicationRepository;