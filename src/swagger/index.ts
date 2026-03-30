import { authUserBody, userAuth, userRegister, userRegisterBody } from "./schemas/auth.swagger";
import { createUser, createUserBody, getAllUsers, updateUser, updateUserBody } from "./schemas/users.swagger";

export const swaggerOptions = {
  swaggerOptions: {
    responseInterceptor: (response: any) => {
      if (
        response.url.includes("/login") &&
        response.url.includes("/register") &&
        response.status === 200
      ) {
        const data = JSON.parse(response.text);

        if (data.token) {
          localStorage.setItem("swagger_token", data.token);
        }
      }
      return response;
    },

    requestInterceptor: (request: any) => {
      const token = localStorage.getItem("swagger_token");
      if (
        token &&
        !request.url.includes("/login") &&
        !request.url.includes("/register")
      ) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }
      return request;
    },
  },
};

export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "REST API - Documentation",
    description: "Description of the APP API here",
    contact: {
      name: "Developer",
      email: "dev@example.com",
      url: "https://devwebsite.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local Server",
    },
    {
      url: "https://api.mysite.com",
      description: "Production Server",
    },
  ],
  tags: [
    {
      name: "Auth",
    },
    {
      name: "Users",
    },
    {
      name: "Todos",
    },
  ],
  paths: {
    "/auth/login": {
      post: userAuth,
    },
    "/auth/register": {
      post: userRegister,
    },
    "/user": {
      get: getAllUsers,
      post: createUser,
    },
    "/user/{id}": { 
      post: updateUser
    },
  },
  components: {
    securitySchemes: { //commented since, using request interception for injecting token
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      authUserBody,
      userRegisterBody,
      createUserBody,
      updateUserBody
    },
  },
};
