import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListAlt, Movie } from '@mui/icons-material';
import MovieCard from '../../components/MovieCard';
import AdminLayout from '../../components/layouts/AdminLayout';
import { CircularProgress, Grid } from '@mui/material';
import Spinner from '../../components/shared/Spinner';
import PrivateRoute from '../../components/auth/PrivateRoute';
// import { movies } from '../../seed/movie.seeds';

const drawerWidth = 240;

export interface iMovie {
    _id: string;
    title: string;
    shortDescription: string;
    description: string;
    image: string;
    year: string;
    genre: string;
    rating: number;
}

export default function PermanentDrawerLeft() {
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
        <PrivateRoute>
            <AdminLayout>
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
                                    link={`/admin/movies/${movie._id}`}
                                    year={movie.year}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </AdminLayout>
        </PrivateRoute>
    );
}
