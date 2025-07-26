//src/routes/index.ts
import { Application } from "express";

import expensive from "@routes/ExpenseRoutes"

const routes = (app: Application) => {
    app.use(
        expensive,
    )
}

export default routes