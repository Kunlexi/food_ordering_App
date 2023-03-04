import express, { Request, Response, NextFunction, response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from  Admin" });
});

export { router as AdminRoute };
