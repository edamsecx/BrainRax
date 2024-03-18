await Bun.build({
  entrypoints: ["./minifier/index.ts"],
  outdir: "./minifier/build",
  format: "esm",
  minify: true
});
