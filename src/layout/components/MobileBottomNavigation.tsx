import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Library Icon
import { useNavigate, useLocation } from 'react-router';

const MobileBottomNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Map routes to values
    const getValue = (path: string) => {
        if (path === '/') return 0;
        if (path.startsWith('/search')) return 1;
        if (path.startsWith('/playlist') && !path.includes('/playlist/')) return 2; // Exact match for list page logic might need check
        // If we are on detail page, we might want to highlight library or home depending on context,
        // or just not highlight anything if it's deep.
        // For now:
        if (path === '/playlist') return 2;
        return -1;
    };

    const value = getValue(location.pathname);

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: { sm: 'none', xs: 'block' } // Visible only on mobile
            }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    if (newValue === 0) navigate('/');
                    else if (newValue === 1) navigate('/search');
                    else if (newValue === 2) navigate('/playlist');
                }}
                sx={{
                    backgroundColor: '#121212', // Dark background
                    '& .MuiBottomNavigationAction-root': {
                        color: '#b3b3b3',
                        '&.Mui-selected': {
                            color: '#ffffff',
                        },
                    },
                }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Library" icon={<BookmarkIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default MobileBottomNavigation;
