import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token){
            throw new Error("Authentication failed");
        }else{
          const isverify = jwt.verify(token, process.env.JWT_KEY);
          req.userId = isverify.id;
          next();
        }
    } catch (error) {
        next(error)
    }
};

export default auth;
