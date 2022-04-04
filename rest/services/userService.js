const bcrypt = require('bcrypt');
const User = require('../models/User')

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

    return user;
}

async function login(email, password) {

}

module.exports = {
    register
}