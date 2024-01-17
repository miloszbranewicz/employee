import { BaseResponse } from "../abstracts/Response";

export class ErrorResponse extends BaseResponse {
  sendSuccess() {
    throw new Error("Cannot send success with ErrorResponse");
  }

  sendError(error: any, message = "Operation failed", code = 500): void {
    this.res.status(code).json({
      status: "error",
      message,
      error,
    });
  }
}
