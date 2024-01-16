import { Employee as PrismaEmployee } from "@prisma/client";
import { BaseModel } from "../abstracts/Model";

export class EmployeeModel extends BaseModel implements PrismaEmployee {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string | null;
  password: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    phoneNumber: string | null,
    password: string
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.phoneNumber = phoneNumber || null;
    this.password = password || "";
  }

  // Implement the validate method
  validate(): boolean {
    if (
      this.isFieldEmpty(this.firstName) ||
      this.isFieldEmpty(this.lastName) ||
      this.isFieldEmpty(this.email)
    ) {
      return false;
    }
    // Add more validation logic as needed
    return true;
  }

  // Additional methods
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Method to validate email format
  validateEmail(): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(this.email);
  }

  // Method to validate password length
  validatePassword(): boolean {
    return this.password.length >= 8;
  }

  // Method to validate polish phone number format
  validatePhoneNumber(): boolean {
    const re = /^\+48\d{9}$/;
    return re.test(this.phoneNumber || "");
  }
}
