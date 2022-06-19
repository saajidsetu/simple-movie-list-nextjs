import { Request, Response, Router } from 'express';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email === 'admin@sflix.com' && password === '123456') {
        const token = 'averygoodadmin';

        return res.json({ token });
    } else {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }
});

export default router;
