const router = require('express').Router();
const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/phoneService');
const mapErrors = require('../utils/mapper');


router.get('/', async (req, res) => {
    const data = await api.getAll();
    res.json(data);
});

router.post('/create', isAuth(), async(req, res) => {

    const phone = {
        phoneName: req.body.phoneName,
        phonePrice: req.body.phonePrice,
        description: req.body.description,
        img: req.body.img,
        releaseDate:req.body.releaseDate,
        owner: req.user._id
        // phoneLikes: req.body.phoneLikes,
        // comments: req.body.comments,
        // userId: IUser;
    };
    try {
        const result = await api.create(phone);
        res.status(201).json(result);
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err).join('\n')
        res.status(400).json({message: error})
    }
});

router.get('/details/:id', preload(), async (req, res) => {
    const phone = res.locals.phone;
    // const phone = await api.getById(req.params.id);
    res.json(phone);
});

router.put('/edit/:id', preload(), isAuth(), async (req, res) => {
    const phoneId = req.params.id;
    const phone = {
        phoneName: req.body.phoneName,
        phonePrice: req.body.phonePrice,
        description: req.body.description,
        img: req.body.img,
        releaseDate:req.body.releaseDate
    };

    try {
        const result = await api.update(phoneId, phone);
        res.json(result);
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})
    }
});

router.delete('/delete/:id', isOwner(), async (req, res) => {
    
    try {
        const phoneId = req.params.id;
        await api.deleteById(phoneId);  
        res.status(204).end();
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})
    }
    
});

module.exports = router;