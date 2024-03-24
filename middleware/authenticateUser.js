import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }

    jwt.verify(token, process.env.SECRET_key, (err, user) => {
        if (err || !user) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};

export default authenticate;