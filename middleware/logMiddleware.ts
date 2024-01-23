// middleware/idMiddleware.ts
import { Middleware } from "../shared/dependencies.ts";
import { REQ_ID_HDR } from "../shared/config.ts";

const logMiddleware: Middleware = async (context, next) => {
    context.state.t0 = performance.now();
    context.state.endpoint = context.request.url.pathname
    console.log(`Received ${context.request.url} at ${new Date()} with ${context.state[REQ_ID_HDR]}`);
    await next();
};

export { logMiddleware };
