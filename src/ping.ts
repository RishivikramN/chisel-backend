import { Router } from "express";
import { Request, Response } from "express";
import status from "http-status";

const ping: Router = Router();

ping.get("/ping", async (req: Request, res: Response): Promise<any> => {
  try {
    res.status(status.OK).send("pong");
  } catch (err: any) {
    res.status(status.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: err.toString(),
    });
  }
});

export default ping;
