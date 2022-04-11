const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const { getUser } = require('../storage/storage');

const JWT_SECRET = 'dsdgfdfgdfgdfgdfg';
const blackList = [];

async function register(firstName, lastName, email, password) {
    const existing = await User.findOne({
        email: new RegExp(`^${email}$`, 'i')
    });

    if (existing) {
        throw new Error('Email already exists!');
    }

    const user = new User({
        email,
        firstName,
        lastName,
        hashedPassword: await bcrypt.hash(password, 10)
    });


    await user.save();

    // return {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     _id: user._id,
    //     accessToken: createToken(user)
    // }

    return createSession(user);

}


async function login(email, password) {


    const user = await User.findOne({
        email: new RegExp(`^${email}$`, 'i')
    });

    if (!user) {
        throw new Error('Incorrect email or password!');

    }
    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password!');
    }

    // const token = createToken(user);
    // res.cookie('auth-cookie', token, {
    //     httpOnly: true
    // });

    // const loggedUser = {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     _id: user._id,
    //     accessToken: token
    // }

    // req.user = loggedUser;


    // res.status(200).json(loggedUser);




    // return {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email:user.email,
    //     _id: user._id,
    //     accessToken: createSession(user),
    // }



    return createSession(user);

}

function logout(token) {
    blackList.push(token);
}

async function updateProfile(user) {
    // getUser();
    // const id = req.user._id;
	// 	const { firstName, lastName, email } = req.body;

		const updatedUser = await User.findOneAndUpdate(user)
			 
        return updatedUser;
			
}



// function createToken(user) {
//     const token = jwt.sign({
//         email: user.email,
//         _id: user._id
//     }, JWT_SECRET)

//     return token;

// }


function createSession(user) {

    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email:user.email,
        _id:user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id:user._id
        }, JWT_SECRET)
    };

};



function verifySession(token) {
    if (blackList.includes(token)) {
        throw new Error('Token is invalidated');
    }
    const payload = jwt.verify(token, JWT_SECRET);
  

    return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        _id: payload._id,
        token
    }
}


module.exports = {
    register,
    login,
    logout,
    verifySession,
    updateProfile
}