import { Employee } from "@prisma/client";
import { generateRandomEmail, generateRandomINT } from "../utils/functions";
const request = require("supertest");
const baseURL = "http://localhost:3000";

const id = generateRandomINT();

describe("POST /employee", () => {
  it("Should create a new employee", async () => {
    const newEmployee = {
      email: generateRandomEmail(),
      password: "testpassword",
      firstName: "testfirstname",
      lastName: "testfirstname",
      phoneNumber: "1234567890",
      role: "ADMIN",
      id: id,
    };
    const response = await request(baseURL)
      .post("/employee")
      .send({ user: newEmployee });
    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user).toHaveProperty("firstName");
    expect(response.body.user).toHaveProperty("lastName");
    expect(response.body.user).toHaveProperty("phoneNumber");
    expect(response.body.user).toHaveProperty("role");
  });
});

describe("GET /employee/:id", () => {
  it("Should get a single employee", async () => {
    const response = await request(baseURL).get(`/employee/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("firstName");
    expect(response.body).toHaveProperty("lastName");
    expect(response.body).toHaveProperty("phoneNumber");
    expect(response.body).toHaveProperty("role");
  });
});

describe("PUT /employee/:id", () => {
  it("Should update an employee", async () => {
    const updatedEmployee = {
      email: generateRandomEmail(),
      password: "Updated Password",
      firstName: "Updated First Name",
      lastName: "Updated Last Name",
      phoneNumber: "000000000",
      role: "UPDATED_ROLE",
      id: id,
    };
    const response = await request(baseURL)
      .put(`/employee/${id}`)
      .send(updatedEmployee);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(updatedEmployee.id);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toBe(updatedEmployee.email);
    expect(response.body).toHaveProperty("firstName");
    expect(response.body.firstName).toBe(updatedEmployee.firstName);
    expect(response.body).toHaveProperty("lastName");
    expect(response.body.lastName).toBe(updatedEmployee.lastName);
    expect(response.body).toHaveProperty("phoneNumber");
    expect(response.body.phoneNumber).toBe(updatedEmployee.phoneNumber);
    expect(response.body).toHaveProperty("role");
    expect(response.body.role).toBe(updatedEmployee.role);
  });
});

describe("DELETE /employee", () => {
  it("Should delete an employee", async () => {
    const response = await request(baseURL).delete(`/employee/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("firstName");
    expect(response.body).toHaveProperty("lastName");
    expect(response.body).toHaveProperty("phoneNumber");
    expect(response.body).toHaveProperty("role");
  });
});

describe("GET /employee", () => {
  it("Should get all employees", async () => {
    const response = await request(baseURL).get("/employee");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("employees");
  });
});
