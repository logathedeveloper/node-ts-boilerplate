import { connectDB } from "../config/database";
import User from "../modules/user/user.model";
import Todo from "../modules/todo/todo.model";
import bcrypt from "bcrypt";


async function seedAdmin() {

    await connectDB();
    await User.deleteMany({});
    console.log("Users cleared");
    await Todo.deleteMany({}); 
    console.log("Tasks cleared");

    await User.create({
        name: "Admin",
        email: "admin@test.com",
        password: await bcrypt.hash("Admin@123", 10),
        role: "admin"
    },{
        name: "User",
        email: "user@test.com",
        password: await bcrypt.hash("User@123", 10),
        role: "user"
    });

    console.log("Users created for Admin and User roles");
    process.exit(0);
}

seedAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});
