const http = require('http');

function rqListener(request, response){
    console.log(request);
}

const server = http.createServer(rqListener);

server.listen(3000);