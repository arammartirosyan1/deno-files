import { Router } from "./shared/dependencies.ts";
import { Application } from "./shared/dependencies.ts";
import { renderFile } from "https://deno.land/x/dejs@0.10.3/mod.ts";

const { cwd } = Deno;
const app = new Application();
const mainRouter = new Router();

mainRouter
    .get("/", async (ctx) => {
        ctx.response.body = await renderFile(`${cwd()}/public/main/index2.ejs`, {
            name: "world",
          });
    })
    .get("/:id", async (ctx) => {
        const id = ctx.params.id;
        console.log(ctx.params)

        const url = "https://prod-108.westeurope.logic.azure.com:443/workflows/cbf9f189541f4b38a1c0204570933932/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=j19ZpP6zcDynbRqaKNmYcnEGkt5WcydmJxeQyedj804";
        const body = `{"id": "${id}"}`;

        console.log(body)
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Secret': '57964aa2-6c3e-4710-8881-e1da54eb3938'
        },
        body,
        });

        if(!response.ok) console.log("issue")

        const jsonData = await response.json()        
        // ctx.response.body = jsonData

        ctx.response.body = await renderFile(`${cwd()}/public/main/index.html`, {
            data: jsonData,
          });
    });



app.use(mainRouter.routes())
app.use(mainRouter.allowedMethods());

await app.listen({ port: 8000 });


