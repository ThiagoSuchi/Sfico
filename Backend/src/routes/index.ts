//src/routes/index.ts
import { Application } from "express";

import expense from "@routes/ExpenseRoutes"
import income from "@routes/IncomesRoutes"
import summary from "@routes/SummaryRoutes"

const routes = (app: Application) => {
    app.use(
        expense,
        income,
        summary
    )
}

export default routes