import { Context } from "../shared/dependencies.ts";
import { CustomError } from "../utils/classes.ts";


export interface ResponseType {
    context: Context;
    responseData: any;
    status?: number;
    error?: CustomError;
}

export interface AuthToken {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
    email: string;
    phone: string;
    app_metadata: {
        provider: string;
        providers: string[];
    };
    user_metadata: Record<string, any>;
    role: string;
    aal: string;
    amr: {
        method: string;
        timestamp: number;
    }[];
    session_id: string;
}
