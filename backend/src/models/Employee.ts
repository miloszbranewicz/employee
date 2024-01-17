import { Employee } from "@prisma/client";
import { BaseModel } from "../abstracts/Model";

export class EmployeeModel extends BaseModel {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  role: string;
  password: string;

  constructor({
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    password,
  }: Employee) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.phoneNumber = phoneNumber || null;
    this.password = password || "";
  }

  validate(): boolean {
    if (
      this.isFieldEmpty(this.firstName) ||
      this.isFieldEmpty(this.lastName) ||
      this.isFieldEmpty(this.email)
    ) {
      return false;
    }
    return true;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  validateEmail(): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(this.email);
  }

  validatePassword(): boolean {
    return this.password.length >= 8;
  }

  validatePhoneNumber(): boolean {
    const re = /^\+48\d{9}$/;
    return re.test(this.phoneNumber || "");
  }

  toJSON(): object {
    const { password, ...rest } = this;
    return rest;
  }
}
