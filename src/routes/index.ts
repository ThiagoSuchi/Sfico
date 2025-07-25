//src/routes/index.ts
import express from "express";

import expensive from "@routes/ExpenseRoutes"

const routes = (app) => {
    app.use(express.json(),
        expensive
    )
}

export default routes