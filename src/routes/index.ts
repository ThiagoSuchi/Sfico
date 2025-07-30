//src/routes/index.ts
import { Application } from "express";

import expense from "@routes/ExpenseRoutes"
import income from "@routes/IncomesRoutes"

const routes = (app: Application) => {
    app.use(
        expense,
        income
    )
}

export default routes