import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

    // Extracting headers from req.
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Extracting token from header.
    const token = authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    // Verfying the extracted token.
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }

        req.user = decoded; 
        next();              
    });
};

export default auth;
