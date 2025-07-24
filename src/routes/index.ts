//src/routes/index.ts
import express from "express";

import expensive from "@routes/ExpensiveRoutes"

const routes = (app) => {
    app.use(express.json(),
        expensive
    )
}

export default routes