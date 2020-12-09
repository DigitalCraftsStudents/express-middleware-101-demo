const http = require('http');
const express = require('express');
const morgan = require('morgan');

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const logger = morgan('tiny');

// app.use a piece of middleware
// app.use(logger);
app.use((req, res, next) => {
    console.log('🦄 you got a request for', req.url, req.method);
    next();
});
app.use('/blah', (req, res, next) => {
    console.log('this is from the /blah middleware');
    // hand off to the next function in the pancake stack
    next();
});
app.use('/', (req, res, next) => {
    // A piece of middleware can modify the req and/or res
    req.stuff = '💥';
    // The way you'll use this 90% of the time:
    // req.session
    // Each visitor (browser) on your site will have their own
    // session.
    /*
        req.session.user = {
            id: 12345,
            username: 'radishmouse',
            needsPasswordReset: true
        }
    */
    next();
});

// In express EVERYTHING is middleware.

// app.VERB(PATH) <- express matches both
app.get('/', (req, res) => {
    console.log('Here is your stuff: ', req.stuff);
    res.send("Hello Y'all");
});

app.get('/blah', (req, res) => {
    console.log('Here is your stuff: ', req.stuff);
    res.send("blah blah");
});

server.listen(PORT, () => {
    console.log(`Aw yiss. Go to: http://localhost:${PORT}`)
});