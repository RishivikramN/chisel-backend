import { Request, Response } from "express";
import httpStatus from "http-status";
import { Todo } from "../types/Todo";
import TodoRepository from "../repositories/TodoRepository";

export default class TodoController {
  private todoRepository: TodoRepository;
  constructor() {
    this.todoRepository = new TodoRepository();
  }

  public createTodo = async (req: Request, res: Response): Promise<any> => {
    try {
      const { title, description, completed, boardId, id } = req.body as Todo;
      const createdTodo = await this.todoRepository.createTodo({
        id,
        title,
        description,
        completed,
        boardId,
      });
      return res.status(httpStatus.CREATED).json({
        todo: createdTodo,
      });
    } catch (e: any) {
      console.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: e.toString(),
      });
    }
  };

  public updateTodo = async (req: Request, res: Response): Promise<any> => {
    try {
      const { title, description, completed, boardId, id } = req.body as Todo;
      const todo = await this.todoRepository.updateTodo({
        id,
        title,
        description,
        completed,
        boardId,
      });

      if (!todo)
        res.status(httpStatus.NOT_FOUND).json({ message: "Todo Not Found" });

      return res.status(httpStatus.OK).json({
        todo,
      });
    } catch (e: any) {
      console.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: e.toString(),
      });
    }
  };

  public getAllTodos = async (req: Request, res: Response): Promise<any> => {
    try {
      const boardId = req.params.boardId as string;
      const todos = await this.todoRepository.getAllTodos(boardId);
      return res.status(httpStatus.OK).json({
        todos,
      });
    } catch (e: any) {
      console.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: e.toString(),
      });
    }
  };

  public deleteTodo = async (req: Request, res: Response): Promise<any> => {
    try {
      const { todoId } = req.params;

      const isSuccess = await this.todoRepository.deleteTodo(todoId);

      if (!isSuccess) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "Todo not found.",
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

  public toggleTodoComplete = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { todoId } = req.params;

      const isSuccess = await this.todoRepository.toggleTodoComplete(todoId);

      if (!isSuccess) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "Todo not found.",
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
