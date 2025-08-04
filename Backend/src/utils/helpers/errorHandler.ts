//src/util/helpers/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof ValidationError) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: err.errors
        });
    }

    // Se não houver status code definido cai no status 500 por padrão
    return res.status(err.status || 500).json({
        message: err.message || "Erro interno do servidor.",
        error: process.env.NODE_ENV === "development" ? err : undefined
    })

    /*
        Essa checagem por NODE_ENV é uma boa prática de segurança, pois:
        - Em desenvolvimento: mostra detalhes úteis no json para o programador.
    */
}

export default errorHandler;