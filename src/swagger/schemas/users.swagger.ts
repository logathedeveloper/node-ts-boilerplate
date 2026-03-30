const getAllUsers = {
  tags: ["Users"],
  description: "Get all users",
  operationId: "getUsers",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "filter",
      in: "query",
      style: "deepObject",
      explode: true,
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
        },
      },
      examples: {
        noFilter: {
          summary: "No Filter",
          value: {},
        },
        byName: {
          summary: "Filter by name",
          value: {
            name: "john",
          },
        },
        byEmail: {
          summary: "Filter by email",
          value: {
            email: "john@email.com",
          },
        },
        fullFilter: {
          summary: "Filter by name + email",
          value: {
            name: "john",
            email: "john@email.com",
          },
        },
      },
    },
  ],
  responses: {
    "200": {
      description: "Success",
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
                type: "array",
                example: [
                  {
                    id: "69c50961459305f822dfece8",
                    name: "john",
                    email: "john@email.com",
                  },
                ],
              },
              meta: {
                type: "object",
                properties: {
                  total: {
                    type: "integer",
                    example: 1,
                  },
                  page: {
                    type: "integer",
                    example: 1,
                  },
                  limit: {
                    type: "integer",
                    example: 15,
                  },
                  totalPages: {
                    type: "integer",
                    example: 1,
                  },
                  hasNext: {
                    type: "boolean",
                    example: 1,
                  },
                  hasPrev: {
                    type: "boolean",
                    example: 1,
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
                example: "Falied to fetch",
              },
            },
          },
        },
      },
    },
  },
};

const createUser = {
  tags: ["Users"],
  description: "Create a new user",
  operationId: "createUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "User created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                example: "60564fcb544047cdc3844818",
              },
              name: {
                type: "string",
                example: "John Snow",
              },
              email: {
                type: "string",
                example: "john.snow@email.com",
              },
              createdAt: {
                type: "string",
                example: "2026-03-30T19:40:59.495Z",
              },
              updatedAt: {
                type: "string",
                example: "2026-03-30T21:23:10.879Z",
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
                example: "Invalid Data",
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
const createUserBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "John Snow",
    },
    email: {
      type: "string",
      example: "john.snow@email.com",
    },
    password: {
      type: "string",
      description: "unencrypted user's password",
      example: "!1234aWe1Ro3$#",
    },
  },
};

const updateUser = {
  tags: ["Users"],
  description: "Update user deatails",
  operationId: "updateUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
      },
      description: "User ID",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/updateUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "User updated successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                example: "60564fcb544047cdc3844818",
              },
              name: {
                type: "string",
                example: "John Snow",
              },
              email: {
                type: "string",
                example: "john.snow@email.com",
              },
              createdAt: {
                type: "string",
                example: "2026-03-30T19:40:59.495Z",
              },
              updatedAt: {
                type: "string",
                example: "2026-03-30T21:23:10.879Z",
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
                example: "Invalid Data",
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
const updateUserBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "John Snow",
    },
    email: {
      type: "string",
      example: "john.snow@email.com",
    },
    password: {
      type: "string",
      description: "unencrypted user's password",
      example: "!1234aWe1Ro3$#",
    },
  },
};

const deleteUser = {
  tags: ["Users"],
  description: "Update user deatails",
  operationId: "deleteUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
      },
      description: "User ID",
    },
  ],
  responses: {
    "200": {
      description: "User Deleted successfully!",
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
                example: "success",
              },
              error: {
                type: "object",
                example: {
                  code: {
                    type: "string",
                    example: "ValidationError",
                  },
                  details: {
                    type: "object",
                    example: {
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

export {
  createUser,
  createUserBody,
  updateUser,
  updateUserBody,
  getAllUsers,
  deleteUser,
};
