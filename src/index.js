const http = require('http');
const port = 3000;
const getUsers = require('./modules/users');
const hostname = 'http://127.0.0.1'


const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://${hostname}`);

    const query = url.searchParams;
    if (query.has("hello")) {
    const name = query.get("hello");

    if (name) {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/plain');
      response.write(`Hello, ${name}!`);
      response.end();
      return;
    }

    response.statusCode = 400;
    response.setHeader('Content-Type', 'text/plain');
    response.write("Enter a name");
    response.end();
    return;
  } else if (request.url  === "/users") {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.write(getUsers());
    response.end();
    return;
  } else if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.write("Hello, World!");
    response.end();
  } else {
    response.statusCode = 500;
    response.end();
    return;
  }
 });
    // Написать обработчик запроса:
    // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
    // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
    // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
    // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
    // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500



server.listen(port,  () => {
    console.log(`Сервер запущен по адресу http://127.0.0.1:${port}`);
})