import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

export function authMiddleware(req,res,next) {
    const token = req.headers.authorization?.split(' ')[1].trim();
  
    
    if (!token) return res.status(401).json({error: 'no token'});
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(401).json({error: 'invalid token'})
    }
}
