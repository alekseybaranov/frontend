// ----------------------------------------------------------------------------
// Системные модули
//

const path = require('path');


// ----------------------------------------------------------------------------
// Сторонние модули
//

// модули сервера express и шаблонизатора handlebars
const express = require(`express`),
      hbs     = require(`express-handlebars`)

// модуль загрузки параметров
//var nconf = require(`nconf`)


// ----------------------------------------------------------------------------
// Собственные модули
//





// ----------------------------------------------------------------------------
// Загружаем параметры последовательно из трёх источников:
// 1. из аргументов командной строки;
// 2. из переменных среды;
// 3. из файла конфигурации "./config.json"
// Если параметр не задан, то устанавливаем значение по умолчанию
//
//nconf.argv().env().file({ file: `config.json` })


// ----------------------------------------------------------------------------
// Используемые каталоги
//

// каталог сервера
//
let serverDir = __dirname.replace(/\\/g, '/').toLowerCase();
console.log('serverDir ==> ', serverDir);

// каталог проекта
//
let baseDir = path.dirname(serverDir)
console.log('baseDir ==> ', baseDir);

// каталог внешних статических  файлов
//
//let publicDir = nconf.get(`publicDir`) || `/public`
//publicDir = __dirname + publicDir
let publicDir = baseDir + `/public`
console.log('publicDir ==> ', publicDir);

// каталог представлений
//
let viewsDir = serverDir + `/views`
console.log('viewsDir ==> ', viewsDir);

// каталог шаблонов
//
//let layoutsDir = nconf.get(`layoutsDir`) || `/views/layouts/`
//layoutsDir = __dirname + layoutsDir
let layoutsDir = serverDir + `/views/layouts`
console.log('layoutsDir ==> ', layoutsDir);

// каталог частичных шаблонов
//
//let partialsDir = nconf.get(`partialsDir`) || `/views/partials/`
//partialsDir = __dirname + partialsDir
let partialsDir = serverDir + `/views/partials`
console.log('partialsDir ==> ', partialsDir);


// порт http-сервера
//
//let port = nconf.get(`port`) // || 3000
let port = process.env.PORT || 3000             // порт по умолчанию - 3000
console.log('port ==>', port);


// ----------------------------------------------------------------------------
// Настраиваем и запускаем express
//
const app = express();

// Устанавливаем порт http-сервера
//
app.set(`port`, port)                           // порт HTTP-сервера

// Подключаем шаблонизатор Handlebars
//
app.set('views', viewsDir)                      // каталог представлений
app.engine(`hbs`, hbs( {
  extname: `hbs`,                               // расширение файлов-шаблонов
  defaultLayout: `main`,                        // основной шаблон
  layoutsDir: layoutsDir,                       // каталог шаблонов
  partialsDir: partialsDir,                     // каталог частичных шаблонов
  helpers: {                                    // механизм "секций"
    section: function(name, options){
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    }
  }
}))
app.set('view engine', 'hbs')

// Подключаем промежуточное ПО обработки статических файлов
//
app.use(express.static(publicDir));             // каталог статических файлов

// -------------------- МАРШРУТИЗАЦИЯ ---------------------

// Пользовательская страница /home
//
app.get('/home', function(req, res) {
  res.render('home');
});

// Пользовательская страница /about
//
app.get('/about', function(req, res) {
  res.render('about');
});

// Пользовательская страница 404
// (промежуточное ПО)
//
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// Пользовательская страница 500
// (промежуточное ПО)
//
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// Запускаем Express
//
app.listen(app.get('port'), function () {
  console.log('Express запущен на http://localhost:' + 
              app.get('port') + 
              '   для завершения нажмите Ctrl+C');
});
