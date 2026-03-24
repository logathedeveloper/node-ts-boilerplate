import { jobQueue } from "../queue";

export const UserCreatedEvent = {
  emit: async (user: { email: string; name: string }) => {
    
    await jobQueue.add(
      "send-welcome-email",
      {
        email: user.email,
        name: user.name,
      },
      {
        jobId: `welcome-${user.email}`,
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
      }
    );
  },
};
