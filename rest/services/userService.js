const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = 'dsdgfdfgdfgdfgdfg';
const blackList = [];

async function register(firstName, lastName, email, password) {
    const existing = await User.findOne({email: new RegExp(`^${email}$`, 'i')});

    if(existing) {
        throw new Error('Email already exists!');
    }

    const user = new User ({
        email,
        firstName,
        lastName, 
        hashedPassword: await bcrypt.hash(password, 10)
    });

    await user.save();

    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({email: new RegExp(`^${email}$`, 'i')});

    if(!user) {
        throw new Error('Incorrect email or password!');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if(!match) {
        throw new Error('Incorrect email or password!');
    }

    return createSession(user)

}

function logout(token) {
    blackList.push(token);
}

function createSession(user) {
    return {
        email:user.email,
        _id:user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id:user._id
        }, JWT_SECRET)
    };
}


 

module.exports = {
    register,
    login,
    logout
}