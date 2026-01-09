import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography, Box, styled, CircularProgress, Divider } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddIcon from '@mui/icons-material/Add';
import useGetCurrentUserPlaylists from '../../../hooks/useGetCurrentUserPlaylists';
import useAddItemsToPlaylist from '../../../hooks/useAddItemsToPlaylist';
import useCreatePlaylist from '../../../hooks/useCreatePlaylist';
import { useToast } from '../Toast/ToastContext';
import CreatePlaylistDialog from '../CreatePlaylistDialog/CreatePlaylistDialog';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(40, 40, 40, 0.95)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    minWidth: '220px',
    maxHeight: '450px',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    borderRadius: '4px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
  },
}));

const StyledMenuItem = styled(MenuItem)({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  gap: '12px',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

interface AddToPlaylistMenuProps {
  trackUri: string;
  trackName: string;
}

const AddToPlaylistMenu = ({ trackUri, trackName }: AddToPlaylistMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const { showToast } = useToast();

  const { data: playlistsData, isLoading: playlistsLoading } = useGetCurrentUserPlaylists({ limit: 50 });
  const { mutate: addItems } = useAddItemsToPlaylist();
  const { mutate: createPlaylist, isPending: isCreating } = useCreatePlaylist();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToPlaylist = (playlistId: string, playlistName: string) => {
    addItems(
      { playlist_id: playlistId, uris: [trackUri] },
      {
        onSuccess: () => {
          showToast(`Added to ${playlistName}`);
          handleClose();
        },
        onError: () => {
          showToast('Failed to add track', 'error');
        },
      }
    );
  };

  const handleCreateAndAdd = (name: string, description: string) => {
    createPlaylist(
      { name, description },
      {
        onSuccess: (newPlaylist) => {
          addItems(
            { playlist_id: newPlaylist.id, uris: [trackUri] },
            {
              onSuccess: () => {
                showToast(`Created ${name} and added track`);
                setIsDialogOpen(false);
                handleClose();
              },
              onError: () => {
                showToast('Playlist created but failed to add track', 'warning');
                setIsDialogOpen(false);
                handleClose();
              }
            }
          );
        },
        onError: () => {
          showToast('Failed to create playlist', 'error');
        }
      }
    );
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: 'rgba(255,255,255,0.5)',
          '&:hover': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' }
        }}
      >
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Add to playlist
          </Typography>
        </Box>

        <StyledMenuItem onClick={() => {
          setIsDialogOpen(true);
          handleClose();
        }}>
          <AddIcon sx={{ color: '#1db954', fontSize: 20 }} />
          <Typography variant="body2" fontWeight={600} sx={{ color: '#1db954' }}>
            New playlist
          </Typography>
        </StyledMenuItem>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {playlistsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress size={24} sx={{ color: '#1db954' }} />
          </Box>
        ) : (
          playlistsData?.pages.flatMap(page => page.items).map((playlist) => (
            <StyledMenuItem
              key={playlist.id}
              onClick={() => handleAddToPlaylist(playlist.id, playlist.name)}
            >
              <PlaylistAddIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 20 }} />
              <Typography variant="body2" sx={{
                maxWidth: '200px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {playlist.name}
              </Typography>
            </StyledMenuItem>
          ))
        )}
      </StyledMenu>

      <CreatePlaylistDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreateAndAdd}
        isLoading={isCreating}
        initialName={`${trackName} Playlist`}
      />
    </>
  );
};

export default AddToPlaylistMenu;
