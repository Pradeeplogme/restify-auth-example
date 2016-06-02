"use strict";

// Gulp and dependencies
var gulp   = require("gulp")
	, eslint = require("gulp-eslint")
	, nodemon = require("gulp-nodemon");

// Lint JS Files
gulp.task("lint", function () {
	return gulp.src(["**/*.js", "!node_modules/**"])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});


// Watch Files For Changes
gulp.task("watch", function () {
	gulp.watch("*.js", ["lint"]);
});

gulp.task("demon", function () {
	nodemon({
		script: "app.js"
		, ext: "js"
		, env: {
			"NODE_ENV": "development"
		}
	})
		.on("start", ["watch"])
		.on("change", ["watch"])
		.on("restart", () =>  console.log("restarted!"));
});

// Default Task
gulp.task("default", ["lint","demon"]);