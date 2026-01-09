import { Box, styled, Typography, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import { useState } from "react";
import CreatePlaylistDialog from "../../common/components/CreatePlaylistDialog/CreatePlaylistDialog";

import { getSpotifyAuthUrl } from "../../utils/auth";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const Head = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "8px",

  justifyContent: "space-between",
});
const LibraryHead = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: userProfile } = useGetCurrentUserProfile();
  const { mutate: createPlaylist, isPending } = useCreatePlaylist();

  const handleOpenDialog = () => {
    if (userProfile) {
      setIsDialogOpen(true);
    } else {
      getSpotifyAuthUrl();
    }
  };

  const handleCreatePlaylist = (name: string, description: string) => {
    createPlaylist(
      { name, description },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      }
    );
  };

  return (
    <Head>
      <Box display="flex">
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button onClick={handleOpenDialog}>
        <AddIcon />
      </Button>

      <CreatePlaylistDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreatePlaylist}
        isLoading={isPending}
        initialName={`My Playlist #${Math.floor(Math.random() * 1000)}`}
      />
    </Head>
  );
};

export default LibraryHead;

