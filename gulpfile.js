const gulp              = require("gulp");
const source            = require("vinyl-source-stream");
const buffer            = require("vinyl-buffer");
var tap = require('gulp-tap');
const browserify        = require("browserify");
const babelify          = require("babelify");
const mochaPhantomJS = require('gulp-mocha-phantomjs');


gulp.task("browserify", function() {
	return browserify("./src/app.js", {debug: true})
		.transform(babelify)
		.on("error",function(e) {
			console.log("17", e.message);
			this.emit("end");
		})
		.bundle()
		.on("error",function(e) {
			console.log(e);
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
	const liveDir = "//D:/Personal/autotility/docs/";
	const partial = [
		'./dmd/global-index-dl.hbs',
		'./dmd/sig-link-html.hbs',
		'./dmd/body.hbs',
		'./dmd/listens.hbs'
	];

	/* get template data */
	const templateData = jsdoc2md.getTemplateDataSync({ files: inputFiles });

	/* reduce templateData to an array of class names */
	const classNames = templateData.filter(item => item.kind === "class").map(item => item.name);
	const mixinNames = templateData.filter(item => item.kind === "mixin").map(item => item.name);
	const moduleNames = templateData.filter(item => item.kind === "module").map(item => item.name);

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
		console.log(mixinName);
		const template = `
<base href="${liveDir}">
<link rel="stylesheet" href="./dist/style.css" />
{{#mixins name="${mixinName}"}}{{>docs}}{{/mixins}}
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

	/* create a documentation file for each module */
	for (const moduleName of moduleNames) {
		const template = `
<base href="${liveDir}">
<link rel="stylesheet" href="./dist/style.css" />
{{#modules name="${moduleName}"}}{{>docs}}{{/modules}}
<script src="./dist/bundle.js" /></script>
		`;
		const output = jsdoc2md.renderSync({
			data: templateData,
			template: template,
			partial,
			helper: './dmd/utils.js',
			'param-list-format': 'list'
		})
		fs.writeFileSync(path.resolve(outputDir + '/modules/', `${moduleName}.md`), output)
	}
});

gulp.task('test', function () {
	return gulp.src('test/index.html')
		.pipe(mochaPhantomJS({
			reporter: 'tap',
			mocha: {
				grep: 'pattern'
			},
			phantomjs: {
				viewportSize: {
					width: 1024,
					height: 768
				},
				useColors: true
			}
		})
	);
});
