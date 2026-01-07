import updateApplicationMailQueue from '../queues/mail.js'
export default async function emailProducer({ applicantId , jobTitle }){
    try {
        console.log('inside producers');
        await updateApplicationMailQueue.add('emailJob', { applicantId ,jobTitle});
        console.log('job added');
    } catch (error) {
        console.error('Error adding job to queue:', error);
    }
}