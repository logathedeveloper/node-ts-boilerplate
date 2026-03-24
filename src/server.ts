import dotenv from "dotenv";
dotenv.config();

import cluster from "cluster";
import app from "./app";
import { connectDB } from "./config/database";
import { env } from "./config/env";
import { setupCluster } from "./utils/Cluster";
import { initScheduler } from "./schedulers";

const PORT = Number(env.PORT) || 3000;
const isClusterEnabled = env.ENABLE_CLUSTER;
let server: ReturnType<typeof app.listen>;

// Start HTTP server
const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`[${process.pid}] Server running on port ${PORT}`);
    });
    await initScheduler();
  } catch (err) {
    console.error(`[${process.pid}] Failed to start server`, err);
    process.exit(1);
  }
};

//shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`Received ${signal}. Shutting down ${process.pid}...`);

  if (cluster.isPrimary) {
    for (const id in cluster.workers) {
      cluster.workers[id]?.kill("SIGTERM");
    }
    process.exit(0);
  } else {
    if (server) {
      server.close(() => {
        console.log(`[${process.pid}] Server closed`);
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  }
};

// Global error handlers
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION");
  console.error(err);
  process.exit(1);
});

// Shutdown signals
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// App Entry point
(async () => {
  if (!isClusterEnabled || (isClusterEnabled && cluster.isPrimary))
    await connectDB();

  if (isClusterEnabled && cluster.isPrimary) {
    setupCluster();
  } else {
    startServer();
  }
})();
