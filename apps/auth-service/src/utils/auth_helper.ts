import { ValidationError } from "../../../../packages/error-handler";
import crypto from "crypto";
import redis from "../../../../packages/libs/redis";
import ejs from "ejs";
import path from "path";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistration = (
  data: any,
  userType: "user" | "seller"
) => {
  const { name, email, password, phone_number, country } = data;
  if (
    !name ||
    !email ||
    !password ||
    (userType == "seller" && (!phone_number || !country))
  ) {
    throw new ValidationError(`Missing required field`);
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError(`Invalid email format`);
  }
};

export const sentOtp = async (
  name: string,
  email: string,
  template: string
) => {
  const otp = crypto.randomInt(1000, 9999).toString();
  await redis.set(`otp:${email}`, otp, "EX", 300);
  await redis.set(`otp_cooldown:${email}`, "true", "EX", 60);
};

// render ejs template
const renderEmailTemplate = async (
  templateName: string,
  data: Record<string, any>
): Promise<string> => {
  const templatePath = path.join(
    process.cwd(),
    "auth_service",
    "src",
    "utils",
    "email-templates",
    `${templateName}.ejs`
  );

  return ejs.renderFile(templatePath, data);
};
