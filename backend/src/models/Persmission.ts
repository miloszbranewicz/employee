import { Permission } from "@prisma/client";
import { BaseModel } from "../abstracts/Model";

export class PermissionModel extends BaseModel {
  employeeId: number;
  permissionType: string;

  constructor({ id, employeeId, permissionType }: Permission) {
    super(id);
    this.employeeId = employeeId;
    this.permissionType = permissionType;
  }
  validate(): boolean {
    if (!this.employeeId || !this.permissionType) {
      return false;
    }
    return true;
  }
  isAdmin(): boolean {
    return this.permissionType === "admin";
  }

  isEmployee(): boolean {
    return this.permissionType === "employee";
  }
}
