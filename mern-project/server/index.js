const bodyParser = require('body-parser');
const cors = require('cors');
const nanoID = require('nanoid');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');

const app = express();

const getSession = require('./lib/getSession');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://dean:password123abc@usersignup-j1kc2.mongodb.net/test?retryWrites=true&w=majority')

app.use(session({
    store: new MongoStore({
        url: 'mongodb+srv://dean:password123abc@usersignup-j1kc2.mongodb.net/test?retryWrites=true&w=majority'
    }),
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true
    }
}));

app.post('/login', (req, res) => {
    // -------------------
    // check login
    // if logged in
    // -------------------
    req.session.userID = nanoID();
    req.session.name = req.body.name;
    req.session.save();
    res.send('message recieved');
})

app.get('/ping', async (req, res) => {
    let loggedIn = await getSession(req.session.userID);

    if (loggedIn) {
        res.send('pong');
    } else {
        res.send('get a session first');
    }
});

app.listen(8080, () => {
    console.log('server running on port 8080');
});