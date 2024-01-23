// deno-lint-ignore-file prefer-const
import { Context, ValidationErrors, ValidationRules, validate } from "../shared/dependencies.ts";
import { createResponse } from "../utils/tools.ts";


/**
 * get single error message from errors
 */

const getErrorMessage = (
    errors: ValidationErrors,
): string | undefined => {
    for (let attr in errors) {
        const attrErrors = errors[attr];
        for (let rule in attrErrors) {
            return attrErrors[rule] as string;
        }
    }
};

/**
 * request validation middleware 
 * validate request body with given validation rules
 */


const requestValidator = ({ bodyRules }: { bodyRules: ValidationRules }) => {
    return async (context: Context, next: () => Promise<unknown>) => {
        console.log("requestValidator invoked.")
        /** get request body */
        const request = context.request;
        const body = await request.body().value;

        /** check rules */
        const [isValid, errors] = await validate(body, bodyRules);
        if (!isValid) {
            /** if error found, throw bad request error */
            const message = getErrorMessage(errors);
            createResponse({
                context,
                responseData: message,
                status: 400
            });
            return
        }

        Object.keys(bodyRules).forEach((key) => {
            if (key in body) {
                context.state[key] = body[key];
            }
        });

        await next();
    };
};

export { requestValidator };