import { PrismaClient, Prisma } from "@prisma/client";
import { Board } from "../types/Board";
import { DefaultArgs } from "@prisma/client/runtime";

export default class BoardRepository {
  private prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
    DefaultArgs
  >;
  constructor() {
    this.prisma = new PrismaClient();
  }
  public CreateBoard = async (boardDetails: Board) => {
    return new Promise<Board>(async (resolve, reject) => {
      const createdBoard = await this.prisma.board.create({
        data: {
          ...boardDetails,
        },
      });
      resolve(createdBoard);
    });
  };

  public UpdateBoard = async (boardDetails: Board) => {
    return new Promise<Board | undefined>(async (resolve, reject) => {
      const existingBoard = await this.prisma.board.findUnique({
        where: {
          id: boardDetails.id,
        },
      });

      if (!existingBoard) {
        resolve(undefined);
        return;
      }
      const updatedBoard = await this.prisma.board.update({
        where: {
          id: boardDetails.id,
        },
        data: {
          title: boardDetails.title,
        },
      });
      resolve(updatedBoard);
    });
  };
  public getAllBoards = async () => {
    return new Promise<Board[]>(async (resolve, reject) => {
      const boards = await this.prisma.board.findMany();
      resolve(boards);
    });
  };
  public deleteBoard = async (boardId: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      const existingBoard = await this.prisma.board.findUnique({
        where: {
          id: boardId,
        },
      });

      if (!existingBoard) {
        resolve(false);
        return;
      }

      await this.prisma.board.delete({
        where: {
          id: boardId,
        },
      });

      resolve(true);
    });
  };
}
