const router = require('express').Router();
const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/phoneService');
const mapErrors = require('../utils/mapper');
const {getUser} = require('../storage/storage');
const {like} = require('../services/phoneService')

router.get('/', async (req, res) => {
    const data = await api.getAll();
    res.json(data);
});

router.post('/create', isOwner(), async(req, res) => {

    const phone = {
        phoneName: req.body.phoneName,
        phonePrice: req.body.phonePrice,
        description: req.body.description,
        img: req.body.img,
        releaseDate:req.body.releaseDate,
        owner: req.user._id,
        likes: req.body.likes,
        rating: req.body.rating
        // comments: req.body.comments,
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

router.put('/details/:id', preload(), isAuth(), async (req, res) => {
    const phoneId = req.params.id;
    const phone = {
        phoneName: req.body.phoneName,
        phonePrice: req.body.phonePrice,
        description: req.body.description,
        img: req.body.img,
        releaseDate:req.body.releaseDate,
        likes: req.body.likes,
        rating: req.body.rating
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


router.get('/details/:id/likes', isAuth(), async (req, res) => {

    const id = req.params.id;
    const userId = getUser()._id;

    try {
        const phone = await like(id, userId);
        res.json(phone.rating)
        
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({message: error})
    }

});

module.exports = router;