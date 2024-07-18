import { NextFunction, Request, Response } from "express";
import AppError from "./app-error";

export default function (err: AppError, req: Request, res: Response, _: NextFunction) {
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    status: "error",
    error: {
      message: err.message,
    },
  });
}
