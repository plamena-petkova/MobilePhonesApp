const { getById } = require("../services/phoneService");


module.exports = () => async (req, res, next) => {

    const id = req.params.id; 
    
    try {
        const phone = await getById(id).lean();
        // phone._ownerId = phone.owner;
        res.locals.phone = phone;
        next();
    } catch(err) {
        res.status(404).json({message:'Record not found!'})
    }
    

}


