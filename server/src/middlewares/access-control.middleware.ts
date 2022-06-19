import { NextFunction, Request, Response } from 'express';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = <string>req.headers['sflix-auth-token'];
        if (!token) {
            return res.status(401).send('Access denied');
        }
        if (token === 'averygoodadmin') {
            next();
        } else {
            return res.status(401).send('Access denied');
        }
    } catch (err: any) {
        console.log('Token Error');
        return res.status(401).send('Access denied');
    }
};
