//src/app.ts
import express from "express";
import cors from "cors";

import routes from "@routes/index";
import errorHandler from "@utils/helpers/errorHandler";

const app = express();

app.use(cors()); // cors - permite que a aplicação aceite requisições vindas de outras origens
app.use(express.json()); // express.json - permite receber requisições do body no formato JSON
routes(app);

// Middleware global que tratas todos os erros
app.use(errorHandler);

export default app;