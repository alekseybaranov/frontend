// ----------------------------------------------------------------------------
// Системные модули

const path = require('path');


// ----------------------------------------------------------------------------
// Сторонние модули

// модули сервера express и шаблонизатора handlebars
const express = require(`express`),
      hbs     = require(`express-handlebars`)

// модуль загрузки параметров
//var nconf = require(`nconf`)


// ----------------------------------------------------------------------------
// Собственные модули





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

// каталог сервера
let serverDir = __dirname.replace(/\\/g, '/').toLowerCase();
console.log('serverDir ==> ', serverDir);

// каталог проекта
let baseDir = path.dirname(serverDir)
console.log('baseDir ==> ', baseDir);

// каталог внешних статических  файлов
//let publicDir = nconf.get(`publicDir`) || `/public`
//publicDir = __dirname + publicDir
let publicDir = baseDir + `/public`
console.log('publicDir ==> ', publicDir);

// каталог представлений
let viewsDir = serverDir + `/views`
console.log('viewsDir ==> ', viewsDir);

// каталог шаблонов
//let layoutsDir = nconf.get(`layoutsDir`) || `/views/layouts/`
//layoutsDir = __dirname + layoutsDir
let layoutsDir = serverDir + `/views/layouts`
console.log('layoutsDir ==> ', layoutsDir);

// каталог частичных шаблонов
//let partialsDir = nconf.get(`partialsDir`) || `/views/partials/`
//partialsDir = __dirname + partialsDir
let partialsDir = serverDir + `/views/partials`
console.log('partialsDir ==> ', partialsDir);


// порт сервера
//let port = nconf.get(`port`) // || 3000
let port = process.env.PORT || 3000
console.log('port ==>', port);


// ----------------------------------------------------------------------------
// Запускаем express
//
const app = express();
app.set(`port`, port)                           // порт HTTP-сервера
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

// Промежуточное ПО обработки статических файлов
app.use(express.static(publicDir));             // каталог статических файлов

console.log(app);



app.get('/home', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('about');
});


// Пользовательская страница 404
// (промежуточное ПО)
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// Пользовательская страница 500
// (промежуточное ПО)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express запущен на http://localhost:' + 
              app.get('port') + '   для завершения нажмите Ctrl+C');
});




// 

/*


const http = require('http');
const fs = require('fs');


function serveStaticFile(res, path, contentType, responseCode) {
  if (!responseCode) responseCode = 200;

  console.log('filepath ==> ' + path);


  fs.readFile(path, function (err, data) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Error');
    } else {
      res.writeHead(responseCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}


const httpServer = http.createServer(function(req, res) {

  console.log('');
  console.log('request method ==> ' + req.method);
  console.log('request url ==> ' + req.url);

  // Приводим URL к единому виду, путём удаления
  // строки запроса, необязательной косой черты
  // в конце строки и приведения к нижнему регистру
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  console.log('path ==> ' + path);

  // Обрабатываем запрос

  if (path == '') {
    serveStaticFile(res, './public/index.html', 'text/html');

  } else if (path == '/main.js') {
    serveStaticFile(res, './public/main.js', 'application/javascript');
  
  } else if (path == '/main.css') {
    serveStaticFile(res, './public/main.css', 'text/css');
  
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }

  */

  /*
  if (req.url == '/main.css') {
    const css = fs.readFileSync('./public/main.css', 'utf8');
    res.end(css);
  } else if(req.url == '/main.js') {
    const text = fs.readFileSync('./public/main.js', 'utf8');
    res.end(text);
  } else {
    const text = fs.readFileSync('./public/index.html', 'utf8');
    res.end(text);
  }
});
*/

/*
console.log('port ==> ', process.env.PORT);

httpServer.listen(process.env.PORT || 3000);

console.log('Server started!');
*/

