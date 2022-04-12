const router = require('express').Router();
const {register, login, logout, updateProfile} = require('../services/userService');
const mapErrors = require('../utils/mapper');
const {getUser, setUser, clearUser } = require('../storage/storage');
 

router.post('/register', async (req, res) => {
 try {
    if(req.body.password.trim() == '' || req.body.email.trim() == '' || req.body.firstName.trim() == '' || req.body.lastName.trim() == '' ) {
        throw new Error('Email, first name, last name and password are required!');
    }



    const result = await register(req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim().toLowerCase(), req.body.password.trim());
    setUser(result);
    res.status(201).json(result)

 } catch(err) {
    console.error(err.message);
    const error = mapErrors(err);
    res.status(400).json({message: error})
 }
});

router.post('/login', async (req, res) => {

    try {
        const user = await login(req.body.email.trim(), req.body.password.trim()); 

        setUser(user);
        
        res.json(user);
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})

    }
});

router.post('/logout', (req, res) => {
    clearUser();
    logout(getUser().accessToken);
    res.status(204).end();

});


router.get('/profile', (req, res) => {

    try {
        const user = getUser(); 
        res.json(user);
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})

    }

router.put('/profile/:userId', async (req, res) => {
    try{
        // const id = getUser();
        // const id = req.body.user._id;
        // console.log(req.body._id);
        // const id = req.body._id;
    const id = req.user._id;
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    
        const result = await updateProfile(id, user);
        res.json(result);
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})

    }
})

})


module.exports = router;
 