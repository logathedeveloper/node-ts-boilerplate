import request from "supertest";
import app from "../app";
import { redisClient } from "../config/redis";
import { jobQueue } from "../queue";
import { connectDB, disconnectDB } from "../config/database";
import { describe, it, test, expect, beforeAll, afterAll } from "@jest/globals";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
  await redisClient.quit();
  await jobQueue.close();
});

describe("Login API", () => {
  test("should login with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "Admin@123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("accessToken");
  });

  test("should fail with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin",
      password: "wrong",
    });

    expect(res.statusCode).toBe(422);
  });
});

describe("Register API", () => {
  let route = "/api/auth/register";
  let userData = {
    name: "Test User",
    email: "test@test.com",
    password: "Test@123",
  };
  test("should Register with New User details", async () => {
    const res = await request(app).post(route).send(userData);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("accessToken");
  });

  test("should fail with duplicate email register", async () => {
    const res = await request(app).post(route).send(userData);
    expect(res.statusCode).toBe(422);
    expect(res.body.error.code).toBe("ValidationError");
  });
  test("should fail with invalid values register", async () => {
    const res = await request(app)
      .post(route)
      .send({ name: "", email: "", password: "" });
    expect(res.statusCode).toBe(422);
    expect(res.body.error.code).toBe("ValidationError");
  });
});
