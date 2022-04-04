const router = require('express').Router();
const {register, login, logout} = require('../services/userService');
const mapErrors = require('../utils/mapper');

router.post('/register', async (req, res) => {
 try {
    if(req.body.password.trim() == '' || req.body.email.trim() == '' || req.body.firstName.trim() == '' || req.body.lastName.trim() == '' ) {
        throw new Error('Email, first name, last name and password are required!');
    }

    const result = await register(req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim().toLowerCase(), req.body.password.trim());
    res.status(201).json(result)

 } catch(err) {
    console.error(err.message);
    const error = mapErrors(err);
    res.status(400).json({message: error})
 }
});

router.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.email.trim(), req.body.password.trim());
        res.json(result);
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})

    }
});

router.get('/logout', (req, res) => {
    
});



module.exports = router;
 