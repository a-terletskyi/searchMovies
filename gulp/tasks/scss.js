import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; // Сжимаємо css файл
import webpcss from "gulp-webpcss"; // Вивід webP зображення
import autoprefixer from "gulp-autoprefixer"; // Добавлення вендорних префіксів
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Групування медіа запитів

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { soursemaps: app.isDev })
        .pipe(app.plugins.plumber(app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })))
        .pipe(sass({ outputStyle: 'expanded', }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
        .pipe(app.plugins.if(app.isBuild, autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true,
        })))
        .pipe(app.plugins.if(app.isBuild, webpcss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
        })))
        // Не стиснута копія css:  .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.if(app.isBuild, cleanCss()))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}