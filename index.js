const http = require('http');
const express = require('express');

const PORT = 3000;

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send("Hello Y'all");
});

server.listen(PORT, () => {
    console.log(`Aw yiss. Go to: http://localhost:${PORT}`)
});