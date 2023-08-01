import { PrismaClient, Prisma } from "@prisma/client";
import { Todo } from "../types/Todo";

export default class TodoRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public createTodo = async (todo: Todo) => {
    return new Promise<Todo>(async (resolve, reject) => {
      const createdTodo = await this.prisma.todo.create({
        data: {
          ...todo,
        },
      });
      resolve(createdTodo);
    });
  };

  public getAllTodos = async (boardId: string): Promise<Todo[]> => {
    return new Promise<Todo[]>(async (resolve, reject) => {
      const todos = await this.prisma.todo.findMany({
        where: {
          boardId,
        },
      });
      resolve(todos);
    });
  };

  public updateTodo = async (todo: Todo) => {
    return new Promise<Todo | undefined>(async (resolve, reject) => {
      const existingTodo = await this.prisma.todo.findUnique({
        where: {
          id: todo.id,
        },
      });
      if (!existingTodo) {
        resolve(undefined);
        return;
      }

      const updatedTodo = await this.prisma.todo.update({
        where: {
          id: todo.id,
        },
        data: {
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
        },
      });

      resolve(updatedTodo);
    });
  };

  public deleteTodo = async (todoId: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      const existingTodo = await this.prisma.todo.findUnique({
        where: {
          id: todoId,
        },
      });

      if (!existingTodo) {
        resolve(false);
        return;
      }

      await this.prisma.todo.delete({
        where: {
          id: todoId,
        },
      });

      resolve(true);
    });
  };

  public toggleTodoComplete = async (todoId: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      const existingTodo = await this.prisma.todo.findUnique({
        where: {
          id: todoId,
        },
      });

      if (!existingTodo) {
        resolve(false);
        return;
      }

      await this.prisma.todo.update({
        where: {
          id: todoId,
        },
        data: {
          completed: !existingTodo.completed,
        },
      });

      resolve(true);
    });
  };
}
