import { jobQueue } from "../queue";

export const initScheduler = async () => {
  await jobQueue.add(
    "daily-report",
    {},
    {
      repeat: {
        pattern: "0 2 * * *", // every day at 2 AM
      },
      jobId: "daily-report-job",
    }
  );

  await jobQueue.add(
    "every-min-report",
    {},
    {
      repeat: {
        pattern: "* * * * *", // every Minute
      },
      jobId: "every-min-report-job",
    }
  );

  console.log("Scheduler initialized");
};
