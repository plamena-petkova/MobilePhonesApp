const { verifySession } = require("../services/userService");
const {getUser} = require('../storage/storage');

module.exports = () =>(req, res, next) => {

    const token = getUser().accessToken;
    
    try {
        if(token) {
            const userData = verifySession(token);
            req.user = userData;
        }
        
    } catch(err) {
        res.status(401).json({message: 'Invalid access token. Please sign in!'})
        
    }
    next();

}

  





