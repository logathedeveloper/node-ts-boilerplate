import { Worker } from "bullmq";
import { redisConfig } from "../config/redis";
import { handleMailJob } from "../processors/mail.processor";

const worker = new Worker("job-queue", async (job: { name: string; data: any }) => {

    console.log(`Processing job: ${job.name} `);

    switch (job.name) {
      case "send-welcome-email":
        return handleMailJob(job.data);

      case "send-welcome-email":
        return handleMailJob(job.data);

      case "send-welcome-email":
        return handleMailJob(job.data);

      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  },
  {
    connection: redisConfig,
    concurrency: 2,
  }
); 

worker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Job failed: ${job?.id}`, err);
});