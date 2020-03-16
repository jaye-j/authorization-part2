
const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(sessions(
    {
        secret: 'my dog',
        cookie: {secure: false}
    }
));

app.get('/', (req, res) => {
    
    req.session.testGreeting = 'Hello world';

    req.session.testGreeting;

    res.send('testing');

});

app.get('/test', (req, res) => {
    
    res.send(req.session.testGreeting);
});

app.listen(3001, () => {
    console.log('listening on 3001');
});