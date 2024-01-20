const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
require('dotenv').config();
const path = require("path");
const connectionKey = process.env.MONGO_URL;
const cookieSecret = process.env.COOKIESECRET;


const cors = require('cors');

const catalogController = require('./controllers/catalog')
const usersController = require('./controllers/users');

async function start() {    
    
    const app = express();
    app.use(express.json());//parser

    app.use(cors({
        origin: ['http://localhost:4200'],
        "methods": "GET,PUT,POST,DELETE",
        "headers": ["Content-Type", "X-Authorization"],
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        credentials: true
    }));
    app.use(cookieParser(cookieSecret))
    app.use(auth());
    app.use('/data', catalogController);
    app.use('/auth', usersController);
    app.use(express.static('static'));


    app.get('/', (req, res)=> res.json({message:'Rest service operational'}))
    app.listen(3000, () => console.log('Rest service listening on port 3000'))
    app.listen(process.env.PORT)


    try {
        await mongoose.connect(connectionKey, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database ready');
    } catch(err) {
        console.error('Database connection failed!', err);
        process.exit(1);
    }

  
// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "app/dist/app")));

app.get("/*", (req, res) =>
res.sendFile(path.join(__dirname1 + "app/dist/app/index.html"))
  );


// --------------------------deployment------------------------------

}

start();