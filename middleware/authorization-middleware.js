const jwt = require ('jsonwebtoken');

const authorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader){
        res.status(401).json({ error: 'Unauthorized'})
    } else {
        const token = authHeader.split(' ')[1]

        try{
            const decodedToken = jwt.verify(token, 'my_sign')
            if (decodedToken.role === 'admin'){
                next()
            }else if (decodedToken.role === 'superadmin'){
                next()
            }else{
                res.status(401).json({ error: 'Unauthorized'});
            }
        } catch{
            res.status(400).json({ error: error.messages});
        }
    }
}

module.exports =  authorizationMiddleware