import request from "supertest";
import app from "../app";
import { redisClient } from "../config/redis";
import { jobQueue } from "../queue";
import { connectDB, disconnectDB } from "../config/database";
import { describe, it, test, expect, beforeAll, afterAll } from "@jest/globals";
let token: string;
let userId: string;

beforeAll(async () => {
  await connectDB();
  const res = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "Admin@123",
  });

  token = res.body.data.accessToken;
});

afterAll(async () => {
  await disconnectDB();
  await redisClient.quit();
  await jobQueue.close();
});

describe("User get All API", () => {
  test("should return the list of users", async () => {
    const res = await request(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
  });

  test("should fail without Access token", async () => {
    const res = await request(app).get("/api/user");
    expect(res.statusCode).toBe(401);
  });
});

describe("User Create API", () => {
  let route = "/api/user";
  let userData = {
    name: "Test User1",
    email: "testuser1@test.com",
    password: "Test@123",
  };
  test("should success with New User details", async () => {
    const res = await request(app)
      .post(route)
      .set("Authorization", `Bearer ${token}`)
      .send(userData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data"); 
    userId = res.body.data._id; 
  });

  test("should fail with duplicate email", async () => {
    const res = await request(app)
      .post(route)
      .set("Authorization", `Bearer ${token}`)
      .send(userData);
    expect(res.statusCode).toBe(422);
    expect(res.body.error.code).toBe("ValidationError");
  });
  test("should fail with invalid values", async () => {
    const res = await request(app)
      .post(route)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "", email: "", password: "" });
    expect(res.statusCode).toBe(422);
    expect(res.body.error.code).toBe("ValidationError");
  });
});

describe("User Update API", () => {
  let userData = {
    name: "Test User1",
    email: "testuserupdated@test.com",
    password: "Test@123",
  };
  test("should success with user update with new details", async () => {
    const res = await request(app)
      .post(`/api/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(userData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
  });

  test("should fail with invalid values", async () => {
    const res = await request(app)
      .post(`/api/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "", email: "", password: "" });
    expect(res.statusCode).toBe(422);
    expect(res.body.error.code).toBe("ValidationError");
  });
});
