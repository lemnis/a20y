const gulp              = require("gulp");
const source            = require("vinyl-source-stream");
const buffer            = require("vinyl-buffer");
const browserify        = require("browserify");
const mochaPhantomJS    = require("gulp-mocha-phantomjs");
const babelify          = require("babelify");
const jsdoc    		      = require("gulp-jsdoc3");

gulp.task("browserify", function() {
	return browserify("./src/app.js", {debug: true})
		.transform(babelify)
		.on("error",function(e){
			console.log("17", e.message);
			this.emit("end");
		})
		.bundle()
		.on("error",function(e){
			console.log("22", e.message);
			this.emit("end");
		})
		.pipe(source("bundle.js")) // output filename
		.pipe(buffer())
		// Start piping stream to tasks!
		.pipe(gulp.dest("./build/"));
});

gulp.task("watch", () => {
	gulp.watch("./src/**/*.js", ["browserify", "doc"]);
});

gulp.task("doc", function () {
	const fs = require("fs-then-native");
	const jsdoc2md = require("jsdoc-to-markdown");
	const path = require("path");

	// return jsdoc2md.render({ files: "src/role/*.js" })
	// 	.then(output => fs.writeFile("api.md", output));


	/* input and output paths */
	const inputFiles = "src/**/*.js";
	const outputDir = "./docs/";

	const output = jsdoc2md.renderSync({ files: inputFiles })
	fs.writeFileSync("api.md", output)
		/* get template data */
		const templateData = jsdoc2md.getTemplateDataSync({ files: inputFiles })

		/* reduce templateData to an array of class names */
		const classNames = templateData.reduce((classNames, identifier) => {
		  if (identifier.kind === "class") classNames.push(identifier.name)
		  return classNames
		}, [])

		/* create a documentation file for each class */
		for (const className of classNames) {
		  const template = `{{#classes name="${className}"}}{{>docs}}{{/classes}}`
		  console.log(`rendering ${className}, template: ${template}`)
		  const output = jsdoc2md.renderSync({ data: templateData, template: template })
		  fs.writeFileSync(path.resolve(outputDir, `${className}.md`), output)
		}
});

gulp.task("test", function () {
	return gulp
		.src("index.html")
		.pipe(mochaPhantomJS());
});
