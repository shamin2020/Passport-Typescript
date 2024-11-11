import { NextFunction, Request, Response } from "express";

/*
FIXED
*/
export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

/*
FIXED
*/
export const forwardAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.redirect("/auth/login");
};
