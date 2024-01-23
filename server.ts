import { Router } from "./shared/dependencies.ts";
import { Application } from "./shared/dependencies.ts";
import { renderFile } from "https://deno.land/x/dejs@0.10.3/mod.ts";

const { cwd } = Deno;
const app = new Application();
const mainRouter = new Router();

mainRouter
    .get("/", async (ctx) => {
        const template = `<body>
  <% if (name) { %>
    <h1>hello, <%= name %>!</h1>
  <% } %>
</body>`;

        ctx.response.body = await renderFile(`${cwd()}/main/index.ejs`, {
            name: "world",
          });
    })
    .get("/:id",(ctx) => {
        ctx.response.body = "id page"
    });



app.use(mainRouter.routes())
app.use(mainRouter.allowedMethods());

await app.listen({ port: 8000 });


