import { Request, Response, Router } from 'express';
import path from 'path';
import { promisify } from 'util';
import { verifyToken } from '../middlewares/access-control.middleware';
import Movie from '../models/Movie.model';

const router = Router();

// Movie List
router.get('/', async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find({}).sort({ createdAt: -1 });
        res.json(movies);
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// SingleMovie
router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const movie = await Movie.findById(id);
        res.json(movie);
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Add
router.post('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const ALLOWED_EXTENSIONS = /png|jpg|jpeg|webp/;
        const { title, shortDescription, description, genre, rating, year } = req.body;
        const to_update: any = {};

        to_update.title = title;
        to_update.shortDescription = shortDescription;
        to_update.description = description;
        to_update.genre = genre;
        to_update.year = year;
        to_update.rating = rating;

        if (req.files) {
            const ALLOWED_EXTENSIONS = /png|jpg|jpeg|webp/;
            if (!req.files) {
                return res.status(400).json({ message: 'No files received' });
            }
            const image: any = req.files.image;
            // const { imageName } = req.body;
            // const extName = imageName.split('.')[imageName.split('.').length - 1];
            const extName = image.name.split('.')[image.name.split('.').length - 1];

            if (!ALLOWED_EXTENSIONS.test(extName)) {
                return res.status(400).json({ message: 'Only Image files are acceptable' });
            }

            // Save image
            const url = `${path.resolve('server', 'uploads')}/${image.name}`;

            await promisify(image.mv)(url);

            const imageUrl = `${process.env.SERVER_ADDRESS}/uploads/${image.name}`;

            to_update.image = imageUrl;
        } else {
            to_update.image = 'https://cdn.onlinewebfonts.com/svg/img_98811.png';
        }

        const newMovie = new Movie(to_update);
        const saved = await newMovie.save();

        res.json({ msg: 'Movie Added' });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update
router.patch('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const ALLOWED_EXTENSIONS = /png|jpg|jpeg|webp/;
        const { movieId, title, shortDescription, description, genre, rating, year } = req.body;
        const to_update: any = {};

        const movieFound = await Movie.findById(movieId);

        if (!movieFound) {
            return res.status(404).json({ msg: 'Movie not found' });
        }

        to_update.title = title;
        to_update.shortDescription = shortDescription;
        to_update.description = description;
        to_update.genre = genre;
        to_update.year = year;
        to_update.rating = rating;

        if (req.files) {
            const ALLOWED_EXTENSIONS = /png|jpg|jpeg|webp/;
            if (!req.files) {
                return res.status(400).json({ message: 'No files received' });
            }
            const image: any = req.files.image;
            // const { imageName } = req.body;
            // const extName = imageName.split('.')[imageName.split('.').length - 1];
            const extName = image.name.split('.')[image.name.split('.').length - 1];

            if (!ALLOWED_EXTENSIONS.test(extName)) {
                return res.status(400).json({ message: 'Only Image files are acceptable' });
            }

            // Save image
            const url = `${path.resolve('server', 'uploads')}/${image.name}`;

            await promisify(image.mv)(url);

            const imageUrl = `${process.env.SERVER_ADDRESS}/uploads/${image.name}`;

            to_update.image = imageUrl;
        } else {
            to_update.image = movieFound.image;
        }

        const updated = await Movie.findByIdAndUpdate(movieId, to_update);

        res.json({ msg: 'Movie Updated' });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deleted = await Movie.findByIdAndRemove(id);
        res.json({ msg: 'Movie deleted' });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
