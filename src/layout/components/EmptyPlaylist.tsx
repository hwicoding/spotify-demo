import { Button, Card, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import CreatePlaylistDialog from "../../common/components/CreatePlaylistDialog/CreatePlaylistDialog";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,

    padding: "20px",
    borderRadius: "8px",
}));

const CreatePlaylistButton = styled(Button)({
    marginTop: "20px",
    fontWeight: "700",
});

const EmptyPlaylist = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { mutate: createPlaylist, isPending } = useCreatePlaylist();

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
        <EmptyPlaylistCard>
            <Typography variant="h2" fontWeight={700}>
                Create your first playlist
            </Typography>
            <Typography variant="body2">It's easy, we'll help you</Typography>
            <CreatePlaylistButton
                variant="contained"
                color="secondary"
                onClick={() => setIsDialogOpen(true)}
            >
                Create playlist
            </CreatePlaylistButton>
            <CreatePlaylistDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onCreate={handleCreatePlaylist}
                isLoading={isPending}
                initialName="My Playlist #1"
            />
        </EmptyPlaylistCard>
    );
};

export default EmptyPlaylist;

