const gulp              = require("gulp");
const source            = require("vinyl-source-stream");
const buffer            = require("vinyl-buffer");
const browserify        = require("browserify");
const mochaPhantomJS    = require("gulp-mocha-phantomjs");
const babelify          = require("babelify");
const jsdoc    		      = require("gulp-jsdoc3");

gulp.task("browserify", function() {
	return browserify("./src/app.js", {debug: true})
		.transform(babelify, {
			presets: ["es2015"],
			sourceMaps:true,
			sourceType: "module"
		})
		.on("error",function(e){
			console.log('17', e.message);
			this.emit("end");
		})
		.bundle()
		.on("error",function(e){
			console.log('22', e.message);
			this.emit("end");
		})
		.pipe(source("bundle.js")) // output filename
		.pipe(buffer())
		// Start piping stream to tasks!
		.pipe(gulp.dest("./build/"));
});

gulp.task("watch", () => {
	gulp.watch("./src/**/*.js", ["browserify", "doc"]);
	gulp.watch("./docs/*.md", ["doc"]);
});

gulp.task("doc", function (cb) {
	const config = require("./jsdoc.json");

	gulp.src(["README.md", "./src/**/*.js",  "./docs/*.md"], {read: false})
		.pipe(jsdoc(config, cb));
});

gulp.task("test", function () {
	return gulp
		.src("index.html")
		.pipe(mochaPhantomJS());
});
