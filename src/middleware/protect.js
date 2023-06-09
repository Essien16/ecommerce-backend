const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
        console.log("Please login to continue...")
      res.redirect('/login');
    }
  }; 

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
      
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied' });
      }
      const token = authHeader.split(' ')[1];
      req.token = token;
      
    try{
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = jwt.verify(token, secretKey)
        req.user = user;
        next();
    } catch(error){
        res.status(400).send("Invalid authentication token");
    }
};

const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin){
            return next()
        } else{
            res.status(403).send("You are not an admin.")
        }
    })
};

module.exports = { authenticate, auth, isAdmin};