import { Worker } from 'bullmq'

import redisConnection from '../config/redis.js';
import { sendMail } from '../utils/mail.js';
import  { getUserById } from '../apis/userServer.js'
import WorkerError from '../errors/queueError.js';
import {applicationStatusUpdateTemplate} from '../utils/updateApplicationMailTemplete.js'



export default async function emailWorker(name) {


    new Worker(name, async (job) => {


        try {
            console.log('Inside the Worker function');
            console.log(job.data);
            if (job.name === 'emailJob') {
                const user = await getUserById(job.data.applicantId);

                if (!user) {
                    throw new WorkerError('User not found', {
                        userId: job.data.userId,
                        jobId: job.id
                    });
                }

                const email = user.email;

                const mailTemplete = applicationStatusUpdateTemplate(job.data.jobTitle);

                await sendMail(email,'Application Update',mailTemplete);

                console.log('Mail is Sended');

            } else {
                console.warn(`No handler defined for job: ${job.name}`);
            }
        } catch (err) {
            console.error('Error processing job:', err);
            throw err;
        }

    },
        { connection: redisConnection }
    );


}