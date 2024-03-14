import { Express, Request, Response, NextFunction } from "express";
import { ValidateError } from "tsoa";
import logger from "./shared/Logger";

export class CustomError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const handle404 = (app: Express) => {
  app.use(function notFoundHandler(_req: Request, res: Response) {
    res.status(404).send({
      message: "Not Found",
    });
  });
};

export const handleError = (app: Express) => {
  app.use(function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    logger.err(err, true);
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(400).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }

    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    if (err.status === 401) {
      return res.status(401).json({
        message: "Unauthorize",
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    next();
  });
};
