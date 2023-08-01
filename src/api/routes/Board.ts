import { Router } from "express";
import BoardController from "../controllers/BoardController";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { Board } from "../types/Board";

const boards: Router = Router();
const validator = createValidator();
const controller = new BoardController();

const BoardPayloadSchema = Joi.object<Board>({
  id: Joi.string().required(),
  title: Joi.string().required(),
});

const ParamBoardSchema = Joi.object({
  boardId: Joi.string().required(),
});

boards.post("/", validator.body(BoardPayloadSchema), controller.createBoard);
boards.patch("/", validator.body(BoardPayloadSchema), controller.updateBoard);
boards.get("/all", controller.getAllBoards);
boards.delete(
  "/:boardId",
  validator.params(ParamBoardSchema),
  controller.deleteBoard
);

export default boards;
