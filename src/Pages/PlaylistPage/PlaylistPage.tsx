import React from 'react';
import { Box } from '@mui/material';
import LibraryHead from '../../layout/components/LibraryHead';
import Library from '../../layout/components/Library';

const PlaylistPage = () => {
    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            // On mobile, give it some padding so it doesn't get hidden behind bottom nav or top bars if any
            pb: { xs: '60px', sm: 0 },
            p: 2
        }}>
            <LibraryHead />
            <Box sx={{ flex: 1, overflowY: 'auto', mt: 2 }}>
                <Library />
            </Box>
        </Box>
    );
};
export default PlaylistPage;