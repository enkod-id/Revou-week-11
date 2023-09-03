const jwt = require('jsonwebtoken');
//const { JWT_SIGN } = require('../config/jwt.js');

const authenticationMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    console.log(authHeader, 'authHeader')

    if(!authHeader){
        res.status(401).json ({ error: 'Unauthorized' });
    }else{

        try{
            const decodedToken = jwt.verify(token, 'my_sign');
            console.log(decodedToken, 'decodedToken');
            next();
        }catch (error) {
            res.status(400).json({error: error.message})
        }
        
    }
}

module.exports = authenticationMiddleware