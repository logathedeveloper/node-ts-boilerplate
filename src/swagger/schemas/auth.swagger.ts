const userAuth = {
  tags: ["Auth"],
  description: "Login",
  operationId: "Login",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/authUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "User loggen in successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: "true",
              },
              message: {
                type: "string",
                example: "success",
              },
              data: {
                type: "object",
                properties: { 
                  accessToken: {
                    type: "string",
                    example: "eyJhbG....ciOiJIkpCJww4",
                  },
                  refreshToken: {
                    type: "string",
                    example: "eyJhbG....ciOiJIkpXVCJ9",
                  },
                  user: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "69c50961459305f822dfece8",
                      },
                      name: {
                        type: "string",
                        example: "john",
                      },
                      email: {
                        type: "string",
                        example: "john.snow@email.com",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Invalid Login",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Invalid credentials",
              },
              error: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    example: "InvalidData",
                  },
                  details: {
                    type: "string",
                    example: "Invalid credentials",
                  },
                },
              },
            },
          },
        },
      },
    },
    "422": {
      description: "Validation Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Invalid credentials",
              },
              error: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    example: "ValidationError",
                  },
                  details: {
                    type: "object",
                    properties: {
                      email: {
                        type: "string",
                        example: "Email is required",
                      },
                      password: {
                        type: "string",
                        example: "Password is required",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
const authUserBody = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "admin@test.com",
    },
    password: {
      type: "string",
      example: "Admin@123",
    },
  },
};

const userRegister = {
  tags: ["Auth"],
  description: "Register",
  operationId: "Register",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/userRegisterBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "User loggen in successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: "true",
              },
              message: {
                type: "string",
                example: "success",
              },
              data: {
                type: "object",
                properties: {
                  accessToken: {
                    type: "string",
                    example: "eyJhbG....ciOiJIkpCJww4",
                  },
                  refreshToken: {
                    type: "string",
                    example: "eyJhbG....ciOiJIkpXVCJ9",
                  },
                  user: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "69c50961459305f822dfece8",
                      },
                      name: {
                        type: "string",
                        example: "john",
                      },
                      email: {
                        type: "string",
                        example: "john.snow@email.com",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "422": {
      description: "Validation Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Invalid credentials",
              },
              error: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    example: "ValidationError",
                  },
                  details: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        example: "Name is required",
                      },
                      email: {
                        type: "string",
                        example: "Email is required",
                      },
                      password: {
                        type: "string",
                        example: "Password is required",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "500": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Something went wrong",
              },
              error: {
                type: "string",
                example: "Falied to register",
              },
            },
          },
        },
      },
    },
  },
};
const userRegisterBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "John",
    },
    email: {
      type: "string",
      example: "john@test.com",
    },
    password: {
      type: "string",
      example: "john@123",
    },
  },
};
export { userAuth, authUserBody, userRegister,userRegisterBody };
