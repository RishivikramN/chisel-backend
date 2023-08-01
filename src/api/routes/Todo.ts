import { Router } from "express";
import TodoController from "../controllers/TodoController";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { Todo } from "../types/Todo";

const todos: Router = Router();
const validator = createValidator();
const controller = new TodoController();

const TodoPayloadSchema = Joi.object<Todo>({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean().required(),
  boardId: Joi.string().required(),
});

const ParamTodoSchema = Joi.object({
  todoId: Joi.string().required(),
});

todos.post("/", validator.body(TodoPayloadSchema), controller.createTodo);
todos.get("/:boardId", controller.getAllTodos);
todos.patch("/", validator.body(TodoPayloadSchema), controller.updateTodo);
todos.delete(
  "/:todoId",
  validator.params(ParamTodoSchema),
  controller.deleteTodo
);
todos.patch(
  "/toggle-completed/:todoId",
  validator.params(ParamTodoSchema),
  controller.toggleTodoComplete
);

export default todos;
