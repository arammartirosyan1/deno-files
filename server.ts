import { Router } from "./shared/dependencies.ts";
import { Application } from "./shared/dependencies.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory
} from 'https://deno.land/x/view_engine@v1.3.0/mod.ts';



const app = new Application();
// app.use(idMiddleware);
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

app.use(viewEngine(oakAdapter, ejsEngine));


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


