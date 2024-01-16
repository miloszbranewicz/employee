import { Report as PrismaReport } from "@prisma/client";
import { BaseModel } from "../abstracts/Model";

export class ReportModel extends BaseModel implements PrismaReport {
  projectId: number;
  description: string | null;
  creationDate: Date;

  constructor(
    id: number,
    projectId: number,
    description: string | null,
    creationDate: Date
  ) {
    super(id);
    this.projectId = projectId;
    this.description = description;
    this.creationDate = creationDate;
  }

  validate(): boolean {
    if (!this.projectId || !this.creationDate) {
      return false;
    }
    return true;
  }

  isRecent(days: number = 7): boolean {
    const now = new Date();
    const diff = now.getTime() - this.creationDate.getTime();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24)); // difference in days
    return diffDays <= days;
  }

  hasDescription(): boolean {
    return this.description !== null;
  }
}
