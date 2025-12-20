import { Response, Request, NextFunction } from "express";
import { validateRegistration } from "../utils/auth_helper";
import { prisma } from "../../../../packages/libs/prisma";
import { ValidationError } from "../../../../packages/error-handler";

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateRegistration(req.body, "user");

  const { email } = req.body;
  const existUser = await prisma.users.findUnique({ where: email });
  if (existUser) {
    return next(new ValidationError(`User already exist`));
  }
};
