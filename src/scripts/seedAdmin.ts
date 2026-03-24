import bcrypt from "bcrypt";
import { connectDB } from "../config/database";
import User from "../modules/users/user.model";

async function seedAdmin() {

    await connectDB();

    const email = "admin@test.com";

    const exists = await User.findOne({ email: email });
    if (exists) {
        console.log("Admin user already exists");
        process.exit(0);
    }

    const hashed = await bcrypt.hash("Admin@123", 10);

    await User.create({
        name: "Admin",
        email: email,
        password: hashed,
        role: "admin"
    });

    console.log("Admin user created");
    process.exit(0);
}

seedAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});
