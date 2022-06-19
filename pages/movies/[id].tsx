import { Container, Rating, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { iMovie } from '../admin/dashboard';

import styles from '../../pages/admin/movies/AdminDetails.module.scss';
import Spinner from '../../components/shared/Spinner';
import PublicNavbar from '../../components/public/Navbar.public';

const SingleMovie = () => {
    const [movie, setMovie] = useState<iMovie>({
        title: '',
        _id: '',
        description: '',
        genre: '',
        image: '',
        rating: 1,
        shortDescription: '',
        year: '',
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const id = router.query.id as string;
    // const movie = movies.filter((el) => el._id.toString() === id)[0];

    useEffect(() => {
        if (router.isReady) {
            const get = async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/movies/${id}`);
                const data = await res.json();
                setMovie(data);
                setLoading(false);
            };
            get();
        }
    }, [router]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <PublicNavbar />
            <Container sx={{ pt: 3 }}>
                <div className={styles.holder}>
                    <div className={styles.img}>
                        <img src={movie.image} alt="" />
                    </div>
                    <div className={styles.content}>
                        <Typography variant="h2">
                            {movie.title} ({movie.year})
                        </Typography>
                        <p style={{ textTransform: 'capitalize' }}>
                            <b>Genre:</b> {movie.genre}
                        </p>
                        <div className={styles.ratings}>
                            <span>
                                <b>Rating:</b>
                            </span>
                            <Rating value={movie.rating} precision={0.5} />
                            <span>{movie.rating} / 5</span>
                        </div>
                        <Typography variant="body1">{movie.description}</Typography>
                    </div>
                </div>
            </Container>
        </Fragment>
    );
};

export default SingleMovie;
