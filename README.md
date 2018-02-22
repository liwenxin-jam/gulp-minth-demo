---
title:  gulp实现js、css、img合并和压缩
author: 黎文欣
tags: 工具
categories:
  - gulp
blogexcerpt: 文字摘要
date: 2017-05-06 22:15:39
thumbnail:
---
人都是喜欢偷懒的，而偷懒也是进步的源泉。没有人喜欢做机械化的工作，都想着一键生成或搞掂。之前写过一篇关于借助gulp实现图片压缩功能和合并雪碧图，而这篇主要讲的是gulp实现js、css、img合并和压缩。

- 因为是基于gulp，肯定是需要安装gulp环境，至于是安装的全局环境还是局部依赖，就看个人喜好。
```js
//如果你之前有全局安装过一个版本的 gulp，请执行一下 npm rm --global gulp 来避免和 gulp-cli 冲突
npm install --global gulp-cli
//基于项目局部安装依赖，需要先基于npm init -y初始化
npm install --save-dev gulp
```

- 实现此功能需要安装的gulp工具有如下，需要各位自行下载依赖，分别有gulp-htmlmin、gulp-imagemin、imagemin-pngcrush、gulp-minify-css、gulp-jshint、gulp-uglify、gulp-concat、gulp-rename、gulp-notify、jshint、del等。在根目录创建一个gulpfile.js文件，文件内容如下：
```js
//npm install gulp-htmlmin gulp-imagemin imagemin-pngcrush gulp-minify-css gulp-jshint gulp-uglify gulp-concat gulp-rename gulp-notify jshint@2.x gulp del --save-dev //安装依赖方式

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
        .pipe(gulp.dest('dest/css')) 
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
```

- 调用测试
```js
gulp  //省略task名称，默认会去查找default任务
gulp clean //清理打包文件夹
gulp default  //有监听各种文件夹内容变化
```

如果需要上面栗子源码可以从本人github[gulp-minth-demo](https://github.com/liwenxin-jam/gulp-minth-demo "gulp-minth-demo")上下载，注意相关依赖包没有上传，需要自己下载再测试。

- 参考文献
1、[gulp 实现 js、css,img 合并和压缩](http://blog.csdn.net/u013063153/article/details/52628471)