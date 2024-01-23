import { Middleware } from "../shared/dependencies.ts";
import { createResponse } from "../utils/tools.ts";

export const authGuard: Middleware = async (context, next) => {
    if (!context.state.authenticated) {
        createResponse({
            context,
            responseData: 'Authentication failed',
            status: 401
        })
        return
    }
    await next();
};