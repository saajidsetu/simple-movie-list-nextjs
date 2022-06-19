import { Button, Card, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        localStorage.setItem('sflix-auth-token', data.token);
        router.push('/admin/dashboard');
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Card sx={{ p: 3, width: '600px' }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>
                        Login Here
                    </Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" size="large">
                        Login
                    </Button>
                </form>
            </Card>
            <Card sx={{ mt: 1 }}>
                <Typography variant="h6" sx={{ my: 1, width: '600px', p: 2 }}>
                    Login Credentials
                </Typography>
                <Typography variant="body1" sx={{ pl: 2 }}>
                    Email: admin@sflix.com
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pb: 2 }}>
                    Password: 123456
                </Typography>
            </Card>
        </div>
    );
};

export default LoginPage;
