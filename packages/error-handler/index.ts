export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOpeartional: boolean;
  public readonly details?: any;
  constructor(
    message: string,
    statusCode: number,
    isOpeartional = true,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOpeartional = isOpeartional;
    this.details = details;
    Error.captureStackTrace(this);
  }
}

// not found error
export class NotFoundError extends AppError {
  constructor(message = "Resources not found") {
    super(message, 404);
  }
}

// validation error
export class ValidationError extends AppError {
  constructor(message = "Invalid request data", details?: any) {
    super(message, 400, true, details);
  }
}

// authenication error
export class AuthError extends AppError {
  constructor(message = "Unauthorizes") {
    super(message, 401);
  }
}

// Forbidden Error (for require permission)
export class Forbidden extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

// Database Error
export class DatabaseError extends AppError {
  constructor(message = "Database Errror", details?: any) {
    super(message, 500, true, details);
  }
}

// Rate limit Error
export class RateLimitError extends AppError {
  constructor(message = "Too many Request , please try again later") {
    super(message, 429);
  }
}
