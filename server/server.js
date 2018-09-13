'use strict'

const http = require('http');
const fs = require('fs');

const server = http.createServer(function(request, response) {
  console.log(request.method, request.url);
  if (request.url == '/style.css') {
    const css = fs.readFileSync('./public/style.css', 'utf8');
    response.end(css);
  } else {
    const text = fs.readFileSync('./public/index.html', 'utf8');
    response.end(text);
  }
});

console.log('port = ', process.env.PORT);


server.listen(process.env.PORT || 3000);
console.log('Server started!');
