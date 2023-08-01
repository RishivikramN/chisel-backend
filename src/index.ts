import express, { Express } from "express";
import dotenv from "dotenv";
import server from "./server";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

process.on("SIGINT", function () {
  prisma.$disconnect(); // Disconnect from Prisma
  console.log("Prisma Disconnected.");
  process.exit(0);
});
