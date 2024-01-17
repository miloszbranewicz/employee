import { BaseResponse } from "../abstracts/Response";

export class SuccessResponse extends BaseResponse {
  sendSuccess(data: any, message = "Operation successful", code = 200): void {
    this.res.status(code).json({
      status: "success",
      message,
      data,
    });
  }

  sendError() {
    throw new Error("Cannot send error with SuccessResponse");
  }
}
