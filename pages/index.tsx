import { Container, Grid } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import PublicNavbar from '../components/public/Navbar.public';
import Spinner from '../components/shared/Spinner';

import { iMovie } from './admin/dashboard';

const Home: NextPage = () => {
    const [movies, setMovies] = useState<iMovie[]>([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        const get = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/movies`);
            const data = await res.json();
            setMovies(data);
            setloading(false);
        };
        get();
    }, []);
    return (
        <Fragment>
            <Head>
                <title>sFlix | Home</title>
            </Head>
            <PublicNavbar />
            <Container sx={{ p: 3 }}>
                {loading ? (
                    <Spinner />
                ) : (
                    <Grid container spacing={3}>
                        {movies.map((movie) => (
                            <Grid item key={movie._id}>
                                <MovieCard
                                    title={movie.title}
                                    shortDescription={movie.shortDescription}
                                    image={movie.image}
                                    link={`/movies/${movie._id}`}
                                    year={movie.year}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Fragment>
    );
};

export default Home;
