const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET || 'SoftUni';
const auth = require('./middlewares/auth');
require('dotenv').config();
const connectionKey = process.env.MONGO_URL;
const compression = require("compression");



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
    app.use(compression());

    app.use(express.static(path.join(__dirname, "public")));
    
    

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
        console.log('ERR', err);
        console.error('Database connection failed!');
        process.exit(1);
    }

    // --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "app/dist/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "app", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


}

start();