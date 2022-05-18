import replace from "gulp-replace"; // Пошук і заміна
import plumber from "gulp-plumber"; // обробка помилок
import notify from "gulp-notify"; // повідомлення(підказки)
import browsersync from "browser-sync"; // Локальний сервер
import newer from "gulp-newer"; // перевірка оновлень
import ifPlugin from "gulp-if"; // умова if

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin,
}