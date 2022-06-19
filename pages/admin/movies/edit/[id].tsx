import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import PrivateRoute from '../../../../components/auth/PrivateRoute';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import { iMovie } from '../../dashboard';

const EditMoviePage = () => {
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState<any | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const get = async () => {
                const id = router.query.id;
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/movies/${id}`);
                const data: iMovie = await res.json();

                setTitle(data.title);
                setShortDescription(data.shortDescription);
                setDescription(data.description);
                setGenre(data.genre);
                setYear(data.year);
                setRating(`${data.rating}`);
            };
            get();
        }
    }, [router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('movieId', router.query.id as string);
        formData.append('title', title);
        formData.append('shortDescription', shortDescription);
        formData.append('description', description);
        formData.append('genre', genre);
        formData.append('year', year);
        formData.append('rating', rating);
        if (image) {
            formData.append('image', image);
        }

        const token = localStorage.getItem('sflix-auth-token');
        if (!token) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/movies`, {
            method: 'PATCH',
            headers: { 'sflix-auth-token': token as string },
            body: formData,
        });
        const data = await res.json();

        router.push('/admin/dashboard');
    };

    return (
        <PrivateRoute>
            <AdminLayout>
                <Card sx={{ p: 3, width: '600px' }}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h6">Update Movie</Typography>
                        <TextField
                            label="Movie Title"
                            margin="normal"
                            fullWidth
                            onChange={(e: any) => setTitle(e.target.value)}
                            value={title}
                        />
                        <TextField
                            label="Short Description"
                            margin="normal"
                            fullWidth
                            value={shortDescription}
                            onChange={(e: any) => setShortDescription(e.target.value)}
                        />
                        <TextField
                            label="Full Description"
                            type="textarea"
                            multiline
                            rows={10}
                            margin="normal"
                            fullWidth
                            value={description}
                            onChange={(e: any) => setDescription(e.target.value)}
                        />
                        <TextField
                            label="Genre"
                            margin="normal"
                            fullWidth
                            value={genre}
                            onChange={(e: any) => setGenre(e.target.value)}
                        />
                        <TextField
                            label="Year"
                            type="number"
                            margin="normal"
                            fullWidth
                            onChange={(e: any) => setYear(e.target.value)}
                            value={year}
                        />
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={rating}
                                label="Rating"
                                onChange={(e: any) => setRating(e.target.value)}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                            </Select>
                        </FormControl>
                        <label htmlFor="poster">Poster Image: </label>
                        <input type="file" id="poster" onChange={(e: any) => setImage(e.target.files[0])} />
                        <br />
                        <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </Card>
            </AdminLayout>
        </PrivateRoute>
    );
};

export default EditMoviePage;
