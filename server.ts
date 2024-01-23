import { Router } from "./shared/dependencies.ts";
import { Application } from "./shared/dependencies.ts";


const app = new Application();

const mainRouter = new Router();

mainRouter
    .get("/", (ctx) => {
        const test = fetch("./public/download/index.html")
        ctx.response.body = test
    })
    .get("/:id",(ctx) => {
        ctx.response.body = "id page"
    });



app.use(mainRouter.routes())
app.use(mainRouter.allowedMethods());

await app.listen({ port: 8000 });


