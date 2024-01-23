import { Middleware } from "../shared/dependencies.ts";
import { REQ_ID_HDR } from "../shared/config.ts";

const idMiddleware: Middleware = async (ctx, next) => {
    const reqId = crypto.randomUUID();
    ctx.state[REQ_ID_HDR] = reqId;
    await next();
    ctx.response.headers.set(REQ_ID_HDR, reqId);
};

export { idMiddleware };
