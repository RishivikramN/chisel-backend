import { Request, Response } from "express";
import httpStatus from "http-status";
import { Board } from "../types/Board";
import BoardRepository from "../repositories/BoardRepository";

export default class BoardController {
  private boardRepository: BoardRepository;
  constructor() {
    this.boardRepository = new BoardRepository();
  }
  public createBoard = async (req: Request, res: Response): Promise<any> => {
    try {
      const { title, id } = req.body as Board;
      const createdBoard = await this.boardRepository.CreateBoard({
        title,
        id,
      });
      return res.status(httpStatus.CREATED).json({
        board: createdBoard,
      });
    } catch (e: any) {
      console.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: e.toString(),
      });
    }
  };

  public updateBoard = async (req: Request, res: Response): Promise<any> => {
    try {
      const { title, id } = req.body as Board;
      const board = await this.boardRepository.UpdateBoard({
        title,
        id,
      });

      if (!board)
        res.status(httpStatus.NOT_FOUND).json({ message: "Board Not Found" });

      return res.status(httpStatus.OK).json({
        board,
      });
    } catch (e: any) {
      console.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: e.toString(),
      });
    }
  };
  public getAllBoards = async (req: Request, res: Response): Promise<any> => {
    try {
      const boards = await this.boardRepository.getAllBoards();
      return res.status(httpStatus.OK).json({
        boards,
      });
    } catch (e: any) {
      console.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: e.toString(),
      });
    }
  };
  public deleteBoard = async (req: Request, res: Response): Promise<any> => {
    try {
      const { boardId } = req.params;

      const isSuccess = await this.boardRepository.deleteBoard(boardId);

      if (!isSuccess) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "Board not found.",
        });
      }
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (e: any) {
      console.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: e.toString(),
      });
    }
  };
}
