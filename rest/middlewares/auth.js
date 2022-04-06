const { verifySession } = require("../services/userService");



//client must handle token
module.exports = () =>(req, res, next) => {
    
    const token = req.headers['x-authorization'];
    // console.log(token);

    
    try {
        if(token) {
            const userData = verifySession(token);
            console.log('Got In');
            req.user = userData;
        }
        next();
    } catch(err) {
        res.status(401).json({message: 'Invalid access token. Please sign in!'})
        
    }

}

  





