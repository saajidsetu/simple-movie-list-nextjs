import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';

import Link from 'next/link';

const PublicNavbar = () => {
    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
      </IconButton> */}
                <Container sx={{ display: 'flex' }}>
                    <Typography variant="h4" color="primary" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/">sFlix</Link>
                    </Typography>
                    <Button variant="outlined" color="secondary">
                        <Link href="/auth/login">Login as Admin</Link>
                    </Button>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default PublicNavbar;
