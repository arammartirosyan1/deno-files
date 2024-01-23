import { Context } from "../shared/dependencies.ts";
import { CustomError } from "./classes.ts";
import { createResponse } from "./tools.ts";

export class BaseController {
    protected async handleRequest<T>(
        context: Context,
        requestFunction: () => Promise<{ data: T; error?: CustomError }>
    ) {
        try {
            const { data, error } = await requestFunction();
            if (error) {
                this.createErrorResponse(context, error);
            }
            this.createResponse(context, data);

        } catch (error) {
            this.createErrorResponse(context, error);
        }
    }

    protected createErrorResponse(
        context: Context,
        error: CustomError
    ) {
        createResponse({ context, responseData: error.message, status: error.status, error });
    }

    protected createResponse<T>(
        context: Context,
        responseData: T
    ) {
        createResponse({ context, responseData });
    }
}