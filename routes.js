// fs is an internal package File System
const fs = require('fs');

function requestHandler(request, response){
    const url = request.url;
    const method = request.method;
    if (url === "/") {
        response.write("<html>");
        response.write("<head><title>Enter Message</title></head>");
        response.write(
          '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        response.write("</html>");
        return response.end();
      }
      if (url === "/message" && method === "POST") {
        const body = [];
        request.on("data", (chunk) => {
          // console.log(chunk);
          body.push(chunk);
        });
        return request.on("end", () => {
          const parsedBody = Buffer.concat(body).toString();
          // console.log(parsedBody);
          const message = parsedBody.split("=")[1];
          fs.writeFile("message.txt", message, (error) => {
            response.statusCode = 302;
            response.setHeader("Location", "/");
            return response.end();
          });
        });
      }
      response.setHeader("Content-Type", "text/html");
      response.write("<html>");
      response.write("<head><title>My first Node.js Page</title></head>");
      response.write("<body><h1>Hello World!</h1></body>");
      response.write("</html>");
      response.end();
};

// Export only one item 
// module.exports = requestHandler;

// Export multiple items
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};

// Alternative way
// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

// Shortcut only supported by node.js
// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';
