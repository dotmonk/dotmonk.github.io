// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: "/",
  },
  optimize: {
    preload: true,
    minify: true,
    target: "esnext",
  },
  buildOptions: {
    clean: true,
    out: "./docs/",
  },
};