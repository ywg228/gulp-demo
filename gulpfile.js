var gulp =  require('gulp');

var less = require('gulp-less');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

var $ = require('gulp-load-plugins')(); //不需要require插件了，按需加载

gulp.task('server', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

//copy文件
gulp.task('copy', function() {
	return gulp.src('src/test.html')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

gulp.task('images', function() {
	return gulp.src('src/images/**/*.{png,jpg}')
		.pipe(gulp.dest('dist/images'))
		.pipe(connect.reload());
});

gulp.task('data', function() {
	return gulp.src(['src/json/*.json', 'src/xml/*.xml', '!src/json/test2.json'])
		.pipe(gulp.dest('dist/data'))
		.pipe(connect.reload());
});

gulp.task('build', ['copy', 'images', 'data'], function() {
	console.log('编译成功');
});

//监听任务 监听文件变化执行对应的任务
gulp.task('watch', function() {
	gulp.watch('test.html', ['copy']);
	gulp.watch('src/images/**/*.{png,jpg}', ['images']);
	gulp.watch(['src/json/*.json', 'src/xml/*.xml', '!src/json/test2.json'], ['data']);
});

gulp.task('default', ['server', 'watch']);

//less->css
gulp.task('less', function() {
	return gulp.src('src/css/**/*.less')
		.pipe(less()) //less->css
		.pipe(cleanCSS()) //压缩css
		.pipe(gulp.dest('dist/css'));
});

//合并文件
gulp.task('concat', function() {
	return gulp.src(['src/js/bom.js', 'src/js/dom.js'])
		.pipe(concat('util.js')) //合并文件
		.pipe(uglify()) //压缩js
		.pipe(rename('util.min.js')) //重命名文件
		.pipe(gulp.dest('dist/js'));
});

//压缩js
gulp.task('uglify', function() {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
})

//重命名文件
gulp.task('rename', function() {
	return gulp.src('src/js/bom.js')
		.pipe(rename('bomUtil.js'))
		.pipe(gulp.dest('dist/js'));
})
	
//压缩css
gulp.task('cleanCSS', function() {
	return gulp.src(['src/css/**/*.css'])
	 	.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'));
})

//压缩图片
gulp.task('imagemin', function() {
	return gulp.src('src/images/**/*.{jpg,png}')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
})

//
gulp.task('loadPlugin', function() {
	return gulp.src('src/js/**/*.js')
		.pipe($.concat('all.js')) //合并文件
		.pipe($.uglify()) //压缩js
		.pipe($.rename('all.min.js')) //重命名文件
		.pipe(gulp.dest('dist/js'));
})