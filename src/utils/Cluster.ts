const cluster = require("cluster");
const os = require("os");
const numCores = os.cpus().length;

export const setupCluster = () => {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Spawning ${numCores} workers...\n`);

  for (let i = 0; i < numCores; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker: any) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("exit", (worker: any, code: any, signal: any) => {
    console.error(
      `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal})`
    );

    // Auto-restart worker
    if (!worker.exitedAfterDisconnect) {
      console.log("Restarting worker...");
      cluster.fork();
    }
  });
};
