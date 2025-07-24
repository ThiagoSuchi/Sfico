//src/app.ts
import express from "express";
import cors from "cors";

import routes from "@routes/index";

const app = express();

app.use(cors())
app.use(express.json());
routes(app)

export default app;