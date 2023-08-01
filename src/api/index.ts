import { Router } from "express";

import boards from "./routes/Board";
import todos from "./routes/Todo";

const router: Router = Router();

router.use("/boards", boards);
router.use("/todos", todos);

export default router;
