"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));

const dist = "./dist/";

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
});

gulp.task("copy-html", () => {
  return gulp.src("./src/index.html").pipe(gulp.dest(dist)).pipe(browserSync.stream());
});

gulp.task("build-js", () => {
  return gulp
    .src("./src/js/index.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "script.js",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      }),
    )
    .pipe(gulp.dest(dist))
    .on("end", browserSync.reload);
});

gulp.task("copy-assets", () => {
  return gulp
    .src("./src/assets/**/*.*")
    .pipe(gulp.dest(dist + "/assets"))
    .on("end", browserSync.reload);
});

gulp.task("copy-db", () => {
  return gulp.src("./db.json").pipe(gulp.dest(dist));
});

gulp.task("styles", () => {
  return gulp
    .src("src/assets/sass/**/*.+(sass|scss)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(dist + "/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", () => {
  browserSync.init({
    server: "./dist/",
    port: 4000,
    notify: true,
  });

  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./db.json", gulp.parallel("copy-db"));
  gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/assets/css/**/*.*", gulp.parallel("styles"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js", "copy-db", "styles"));

gulp.task("build-prod-js", () => {
  return gulp
    .src("./src/js/index.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "script.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      }),
    )
    .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));
