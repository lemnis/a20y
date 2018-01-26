const gulp              = require("gulp");
const source            = require("vinyl-source-stream");
const buffer            = require("vinyl-buffer");
const browserify        = require("browserify");
const mochaPhantomJS    = require("gulp-mocha-phantomjs");
const babelify          = require("babelify");

gulp.task("browserify", function() {
	return browserify("./src/app.js", {debug: true})
		.transform(babelify)
		.on("error",function(e) {
			console.log("17", e.message);
			this.emit("end");
		})
		.bundle()
		.on("error",function(e) {
			console.log("22", e.message);
			this.emit("end");
		})
		.pipe(source("bundle.js")) // output filename
		.pipe(buffer())
		// Start piping stream to tasks!
		.pipe(gulp.dest("./build/"))
		.pipe(gulp.dest("./docs/dist/"));
});

gulp.task("watch", () => {
	gulp.watch("./src/**/*.js", ["browserify", "doc"]);
});

gulp.task("doc", function () {
	const fs = require("fs-then-native");
	const jsdoc2md = require("jsdoc-to-markdown");
	const path = require("path");

	/* input and output paths */
	const inputFiles = "src/**/*.js";
	const outputDir = "./docs/";
	const liveDir = "//lemnis.github.io/a20y/";
	const partial = [
		'./dmd/global-index-dl.hbs',
		'./dmd/sig-link-html.hbs'
	];

	/* get template data */
	const templateData = jsdoc2md.getTemplateDataSync({ files: inputFiles });

	/* reduce templateData to an array of class names */
	const classNames = templateData.filter(item => item.kind === "class").map(item => item.name);
	const mixinNames = templateData.filter(item => item.kind === "mixin").map(item => item.name);

	/* create indexs */
	const output = jsdoc2md.renderSync({
		data: templateData,
		template: `
<base href="${liveDir}">
{{>main-index~}}
`,
		partial,
		helper: './dmd/utils.js'
	})
	fs.writeFileSync(path.resolve(outputDir, 'README.md'), output)

	/* create a documentation file for each class */
	for (const className of classNames) {
		const template = `
<base href="${liveDir}">
<link rel="stylesheet" href="./dist/style.css" />
{{#classes name="${className}"}}{{>docs}}{{/classes}}
<script src="./dist/bundle.js" /></script>
		`;
		const output = jsdoc2md.renderSync({
			data: templateData,
			template: template,
			partial,
			helper: './dmd/utils.js'
		})
		fs.writeFileSync(path.resolve(outputDir + '/classes/', `${className}.md`), output)
	}

	/* create a documentation file for each mixin */
	for (const mixinName of mixinNames) {
		const template = `
<base href="${liveDir}">
<link rel="stylesheet" href="./dist/style.css" />
{{#mixines name="${mixinName}"}}{{>docs}}{{/mixines}}
<script src="./dist/bundle.js" /></script>
		`;
		const output = jsdoc2md.renderSync({
			data: templateData,
			template: template,
			partial,
			helper: './dmd/utils.js'
		})
		fs.writeFileSync(path.resolve(outputDir + '/mixins/', `${mixinName}.md`), output)
	}
});

gulp.task("test", function () {
	return gulp
		.src("index.html")
		.pipe(mochaPhantomJS());
});
