const express = require('express');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const http = require('http');

app.prepare().then(async () => {
  const server = express();
  const httpServer = http.createServer(server);

  // Scheduler
  const scheduler = async () => {
    try {
      await axios.post(`${process.env.BASE_URL}/api/scheduler`);
    } catch (error) {
      console.log(error);
    }
  };

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    scheduler();
  });
});
