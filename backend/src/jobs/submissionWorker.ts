// Placeholder for BullMQ worker
import { Worker } from 'bullmq';
import { submitToJudge0 } from '../utils/judge0';

const connection = { host: 'localhost', port: 6379 };

export const submissionWorker = new Worker(
  'submissions',
  async (job) => {
    const { code, language, input } = job.data;
    const result = await submitToJudge0(code, language, input);
    return result;
  },
  { connection }
); 