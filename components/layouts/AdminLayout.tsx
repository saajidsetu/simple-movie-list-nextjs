import * as React from 'react';
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
import { ListAlt, Movie, MovieCreation } from '@mui/icons-material';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const AdminLayout = (props: any) => {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem('sflix-auth-token');
        router.push('/');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
                color="inherit"
            >
                <Toolbar>
                    {/* <Typography variant="h6" noWrap component="div">
                Movie List
            </Typography> */}
                    <Box flexGrow={1}></Box>
                    <Button variant="outlined" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <Link href="/admin/dashboard">
                        <a>
                            {/* <MovieCreation /> */}
                            <Typography variant="h5">sFlix</Typography>
                        </a>
                    </Link>
                </Toolbar>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => router.push('/admin/movies')}>
                            <ListItemIcon>
                                {' '}
                                <ListAlt />{' '}
                            </ListItemIcon>
                            <ListItemText primary="All Movies" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => router.push('/admin/movies/add')}>
                            <ListItemIcon>
                                {' '}
                                <Movie />{' '}
                            </ListItemIcon>
                            <ListItemText primary="Add Movie" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
};

export default AdminLayout;
