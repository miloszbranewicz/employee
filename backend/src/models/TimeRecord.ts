import { TimeRecord as PrismaTimeRecord } from "@prisma/client";
import { BaseModel } from "../abstracts/Model";

export class TimeRecordModel extends BaseModel implements PrismaTimeRecord {
  employeeId: number;
  projectId: number;
  date: Date;
  hoursWorked: number;

  constructor(
    id: number,
    employeeId: number,
    projectId: number,
    date: Date,
    hours: number
  ) {
    super(id);
    this.employeeId = employeeId;
    this.projectId = projectId;
    this.date = date;
    this.hoursWorked = hours;
  }

  validate(): boolean {
    if (
      !this.employeeId ||
      !this.projectId ||
      !this.date ||
      !this.hoursWorked
    ) {
      return false;
    }
    if (this.hoursWorked < 0) {
      return false;
    }
    return true;
  }

  isWeekend(): boolean {
    const dayOfWeek = this.date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 (Sunday) or 6 (Saturday)
  }

  isOvertime(threshold: number = 8): boolean {
    return this.hoursWorked > threshold;
  }
}
