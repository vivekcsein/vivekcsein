import * as Bun from "bun";

const PORT = Number(Bun.env.PORT ?? 3000);

const ROOT = process.cwd();

const join = (...paths: string[]) => paths.join("/");

const PATHS = {
  root: ROOT,

  src: join(ROOT, "src"),

  html: join(ROOT, "src", "html"),

  public: join(ROOT, "public"),

  assets: join(ROOT, "public", "assets"),

  images: join(ROOT, "public", "assets", "images"),

  icons: join(ROOT, "public", "assets", "icons"),
} as const;

Bun.serve({
  port: PORT,

  fetch(request) {
    const url = new URL(request.url);

    const pathname = url.pathname === "/" ? "/vivekcsein.html" : url.pathname;

    const file = Bun.file(`${PATHS.html}${pathname}`);

    return new Response(file);
  },
});

console.log(`➜ http://localhost:${PORT}`);
