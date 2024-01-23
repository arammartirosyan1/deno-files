import { indexOfNeedle } from "https://deno.land/std@0.200.0/bytes/index_of_needle.ts";
import { idMiddleware } from "./middleware/idMiddleWare.ts";
import { JWTAuthMiddleware } from "./middleware/jwtValidator.ts";
import { logMiddleware } from "./middleware/logMiddleware.ts";
import { Router } from "./shared/dependencies.ts";
import { Application } from "./shared/dependencies.ts";
import * as path from "https://deno.land/std@0.146.0/path/mod.ts";




const moduleDir = path.dirname(path.fromFileUrl(import.meta.url));

// The public directory (with "index.html" in it)
const publicDir = path.join(moduleDir, "public");

// A helper function to get the file contents
// of a specific file path in the public directory
function getPublicFile(...filePath: string[]): Promise<Uint8Array> {
  return Deno.readFile(path.join(publicDir, ...filePath));
}


const app = new Application();
// app.use(idMiddleware);

const mainRouter = new Router();

mainRouter
    .get("/", (ctx) => {
    ctx.response.body = getPublicFile("main/index.html");
    ctx.response.type = "text/html";
    })
    .get("/:id",(ctx) => {
        ctx.response.body = getPublicFile("main/index.html/:id");
    });


await app.listen({ port: 8000 });


