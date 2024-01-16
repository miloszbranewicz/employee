import { Project } from "@prisma/client";
import { BaseModel } from "../abstracts/Model";

export class ProjectModel extends BaseModel {
  endDate: Date | null;
  startDate: Date | null;
  location: string | null;
  name: string;
  status: string | null;

  constructor({ id, endDate, startDate, location, name, status }: Project) {
    super(id);
    this.endDate = endDate;
    this.startDate = startDate;
    this.location = location;
    this.name = name;
    this.status = status;
  }

  getDuration(): number | null {
    if (this.startDate && this.endDate) {
      const duration = this.endDate.getTime() - this.startDate.getTime();
      return Math.ceil(duration / (1000 * 60 * 60 * 24)); // duration in days
    }
    return null;
  }

  isActive(): boolean {
    return this.status === "active";
  }

  validate(): boolean {
    if (!this.name) {
      return false;
    }
    if (this.startDate && this.startDate > new Date()) {
      return false;
    }
    if (this.startDate && this.endDate && this.endDate < this.startDate) {
      return false;
    }
    return true;
  }

  isCompleted(): boolean {
    return this.status === "completed";
  }

  isOverdue(): boolean {
    if (!this.endDate) {
      return false;
    }
    const now = new Date();
    // Remove time part from the date
    now.setHours(0, 0, 0, 0);
    return now > this.endDate;
  }

  getDaysLeft(): number | null {
    if (!this.endDate) {
      return null;
    }
    const now = new Date();
    // Remove time part from the date
    now.setHours(0, 0, 0, 0);
    const diff = this.endDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)); // difference in days
  }
}
