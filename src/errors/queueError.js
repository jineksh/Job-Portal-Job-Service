class WorkerError extends Error {
    constructor(message, meta = {}) {
        super(message);
        this.name = 'WorkerError';
        this.meta = meta; // extra debug info
    }
}

export default WorkerError