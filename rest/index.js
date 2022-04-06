const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET || 'SoftUni';
const auth = require('./middlewares/auth');

// const cors = require('./middlewares/cors');
const cors = require('cors');

const catalogController = require('./controllers/catalog')
const usersController = require('./controllers/users');


start();

async function start() {
    
    try {
        await mongoose.connect('mongodb://localhost:27017/phones', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database ready');
    } catch(err) {
        console.error('Database connection failed!');
        process.exit(1);
    }

    const app = express();
    app.use(express.json());//parser
    // app.use(cors());

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
    

    
    

    app.get('/', (req, res)=> res.json({message:'Rest service operational'}))
    app.listen(3000, () => console.log('Rest service listening on port 3000'))

}