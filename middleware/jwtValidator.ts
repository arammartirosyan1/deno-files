import { Middleware, verify } from "../shared/dependencies.ts";
import { AuthToken } from "../interfaces/global.ts";
import { SUPABASE_JWT_SECRET } from "../shared/config.ts";


const getJwtPayload = async (token: string, secret: string): Promise<any | null> => {
    const encoder = new TextEncoder();
    const secretKeyBuffer = encoder.encode(secret);

    const key = await crypto.subtle.importKey(
        "raw",
        secretKeyBuffer,
        { name: "HMAC", hash: "SHA-256" },
        true,
        ["sign", "verify"],
    )

    try {
        const jwtObject = await verify(token, key);
        return jwtObject?.payload || null;
    } catch (err) {
        console.error(err);
        return null;
    }
};


const JWTAuthMiddleware: Middleware = async (context, next) => {
    try {
        const authHeader = context.request.headers.get("Authorization");
        const JWTSecret = SUPABASE_JWT_SECRET

        if (!authHeader) { throw Error("Authorization header missing.") }

        const token = authHeader.replace(/^bearer/i, "").trim();
        const verified: AuthToken = await getJwtPayload(token, JWTSecret);

        if (!verified) { throw Error("Authorization header invalid.") }
        context.state.access_token = token;

        if (!verified.sub) {
            context.state.user_profile_id = undefined;
            context.state.authenticated = false;
        } else {
            context.state.user_profile_id = verified.sub;
            context.state.authenticated = true;
        }
    } catch (err) {
        console.error(err);
        context.state.user_profile_id = undefined;
        context.state.access_token = undefined;
        context.state.authenticated = false;
    }

    await next();
};

export { JWTAuthMiddleware };