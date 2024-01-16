import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export abstract class BaseController {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  abstract index(req: Request, res: Response): Promise<void>;

  abstract show(req: Request, res: Response): Promise<void>;

  abstract create(req: Request, res: Response): Promise<void>;

  abstract update(req: Request, res: Response): Promise<void>;

  abstract delete(req: Request, res: Response): Promise<void>;
}
