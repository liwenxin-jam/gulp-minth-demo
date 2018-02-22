// 引入 gulp
var gulp = require('gulp');
// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify'),//提示信息
    del = require('del');  //删除文件夹

//删除文件及文件夹，在执行打包的时候，一般都需要先清理目标文件夹，以保证每次打包时，都是最新的文件。
gulp.task('clean', function (cb) {
  del([
    // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
    'dest/**/*',
    // 我们不希望删掉这个文件，所以我们取反这个匹配模式
    '!dest/images/share-weixin.png'
  ], cb);
});

//压缩html
gulp.task('html', function(){
	return gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dest'))
		.pipe(notify({message: 'html task ok'}));
});

//压缩图片
gulp.task('img', function(){
	return gulp.src('src/images/*')
		.pipe(imagemin({
			progressive: true,
	        svgoPlugins: [{removeViewBox: false}],
	        use: [pngcrush()]
		}))
		.pipe(gulp.dest('./dest/images/'))
		.pipe(notify({message: 'img task ok'}));
});

//合并、压缩、重命名css
gulp.task('css', function(){
	return gulp.src('src/css/*.css')
		.pipe(concat('main.css'))
		.pipe(gulp.dest('dest/css'))  // ?
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dest/css'))
		.pipe(notify({message: 'css task ok'}));
});

//检查js
gulp.task('lint', function(){
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(notify({message: 'lint task ok'}));
});

//合并、压缩js文件
gulp.task('js', function(){
	return gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dest/js')) 
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dest/js'))
		.pipe(notify({message: 'js task ok'}));
});

//默认任务
gulp.task('default', function(){
	gulp.run('clean', 'img', 'css', 'lint', 'js', 'html');

	//监听html文件变化
	gulp.watch('src/*.html', function(){
		gulp.run('html');
	});

	//监听css文件变化
	gulp.watch('src/css/*.css', ['css']);

	//监听js文件变化
	gulp.watch('src/js/*.js', ['lint', 'js']);

	//监听images文件变化
	gulp.watch('src/images/*', ['img']);
});