const http = require('http');
const url = require('url');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

let filename = '';

const server = http.createServer((req, res) => {
  let query = url.parse(req.url, true);

  if (query.pathname == '/') {
    filename = './index.html';
  } else {
    filename = '.' + query.pathname + '.html';
  }

  console.log("The filename: " + filename)
  fs.readFile(filename, function(err, data) {
    if (err) {
      fs.readFile('./404.html', function(errErr, errData) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        if (errErr) {
          return res.end('404.html load also failed');
        }
        res.write(errData);
        return res.end();
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
