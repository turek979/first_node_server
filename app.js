const http = require('http');

function rqListener(request, response){
    console.log(request.url, request.method, request.headers);
    // process.exit();
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>My first Node.js Page</title></head>');
    response.write('<body><h1>Hello World!</h1></body>');
    response.write('</html>');
    response.end();
}

const server = http.createServer(rqListener);

server.listen(3000);