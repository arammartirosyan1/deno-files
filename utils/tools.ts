import { ResponseType } from "../interfaces/global.ts";

export function createResponse(
    { context, responseData, status = 200, error }: ResponseType): void {

    const { t0, endpoint } = context.state
    if (error) console.error(JSON.stringify(error.message));

    context.response.status = status;
    context.response.body = JSON.stringify(responseData);

    const t1 = performance.now();
    console.info(`Endpoint "${endpoint}" finished after ${t1 - t0} ms!`)
}
