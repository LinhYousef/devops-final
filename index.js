const http = require('http');
const winston = require('winston');

// Configure Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const PORT = 3000; // Set port to 3000

const server = http.createServer((req, res) => {
  logger.info(`Received request for ${req.url}`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Expose Prometheus metrics endpoint
server.on('request', (req, res) => {
  if (req.url === '/metrics') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Your Prometheus metrics here');
  }
});

