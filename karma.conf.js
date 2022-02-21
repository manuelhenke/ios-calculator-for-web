module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "karma-typescript"],
    files: ["dist/**/*.js", "src/**/*.test.ts"],
    preprocessors: {
      "src/**/*.test.ts": "karma-typescript",
    },
    reporters: ["spec", "karma-typescript"],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    browserConsoleLogOptions: {
      level: "log",
      format: "%b %T: %m",
      terminal: false,
    },
    singleRun: true,
    concurrency: Infinity,
  });
};
