//src/middlewares/asyncError.ts

import { NextFunction, Request, RequestHandler, Response } from "express"

const asyncError = (handler: RequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch(next)
    }
}

export default asyncError;