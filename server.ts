import "zone.js/node";

import { APP_BASE_HREF } from "@angular/common";
import { ngExpressEngine } from "@nguniversal/express-engine";
import * as express from "express";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { AppServerModule } from "./src/main.server";

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), "dist/angular-conduit/browser");
  const indexHtml = existsSync(join(distFolder, "index.original.html"))
    ? "index.original.html"
    : "index";

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  // The NES build of the engine refuses to render for a host that is not on
  // this allowlist. Add deployment hostnames here or via NG_ALLOWED_HOSTS
  // (comma separated, "*.example.com" wildcards allowed).
  server.engine(
    "html",
    ngExpressEngine({
      bootstrap: AppServerModule,
      allowedHosts: ["localhost", "127.0.0.1"],
    })
  );

  server.set("view engine", "html");
  server.set("views", distFolder);

  // Serve static files from /browser
  server.get("*.*", express.static(distFolder, { maxAge: "1y" }));

  // All regular routes use the Universal engine
  server.get("*", (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env["PORT"] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
