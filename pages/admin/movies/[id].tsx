import { Container, Rating, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrivateRoute from '../../../components/auth/PrivateRoute';
import AdminLayout from '../../../components/layouts/AdminLayout';
import Spinner from '../../../components/shared/Spinner';
import { movies } from '../../../seed/movie.seeds';
import { iMovie } from '../dashboard';
import styles from './AdminDetails.module.scss';

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

    return (
        <PrivateRoute>
            <AdminLayout>
                {loading ? (
                    <Spinner />
                ) : (
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
                )}
            </AdminLayout>
        </PrivateRoute>
    );
};

export default SingleMovie;
