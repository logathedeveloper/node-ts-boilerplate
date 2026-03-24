import { connectDB } from "../config/database";
import Todo from "../modules/todos/todo.model";
import User from "../modules/users/user.model";

const seedTasks = async () => {
  await connectDB();

  try {
    Todo.collection.drop();
    console.log("Tasks collection truncated successfully");
    const users = await User.find();
    // let tasks = [];
    for (let i = 0; i < 100; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await Todo.create({
        title: `Task ${i + 1}`,
        description: `Description for task ${i + 1}`,
        completed: false,
        createdAt: Date.now(),
        user: randomUser._id,
      });

      // tasks.push({
      //     title: `Task ${i + 1}`,
      //     description: `Description for task ${i + 1}`,
      //     completed: false,
      //     createdAt : Date.now()
      //     userId : randomUser._id
      // });
    }

    // await Todo.insertMany(tasks);
    console.log("Tasks seeded successfully");
  } catch (error) {
    console.error("Error seeding tasks:", error);
  }
};

seedTasks()
  .then(() => {
    console.log("Seeding completed");
    process.exit();
  })
  .catch((error) => {
    console.error("Error during seeding:", error);
    process.exit(1);
  });
