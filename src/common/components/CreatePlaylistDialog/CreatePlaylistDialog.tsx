import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  styled,
  Box,
  Typography,
} from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#282828",
    color: "white",
    backgroundImage: "none",
    borderRadius: "8px",
    padding: "16px",
    width: "400px",
  },
}));

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "white",
    backgroundColor: "#3e3e3e",
    borderRadius: "4px",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1db954",
    },
  },
  marginBottom: "16px",
});

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "500px",
  padding: "12px 32px",
  fontWeight: 700,
  textTransform: "none",
}));

interface CreatePlaylistDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
  isLoading?: boolean;
  initialName?: string;
}

const CreatePlaylistDialog = ({
  open,
  onClose,
  onCreate,
  isLoading,
  initialName = "",
}: CreatePlaylistDialogProps) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialName);
      setDescription("");
    }
  }, [open, initialName]);

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name, description);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h5" fontWeight={700}>
          Create Playlist
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <StyledTextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Playlist"
            required
            autoFocus
          />
          <StyledTextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add an optional description"
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "16px 24px" }}>
        <ActionButton onClick={onClose} sx={{ color: "white" }}>
          Cancel
        </ActionButton>
        <ActionButton
          variant="contained"
          onClick={handleCreate}
          disabled={!name.trim() || isLoading}
          sx={{
            backgroundColor: "#1db954",
            color: "black",
            "&:hover": { backgroundColor: "#1ed760" },
          }}
        >
          {isLoading ? "Creating..." : "Save"}
        </ActionButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default CreatePlaylistDialog;
