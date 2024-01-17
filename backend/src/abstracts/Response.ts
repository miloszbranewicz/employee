import { Response } from "express";

export abstract class BaseResponse {
  protected res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  abstract sendSuccess(data: any, message: string, code: number): void;
  abstract sendError(error: any, message: string, code: number): void;
}
