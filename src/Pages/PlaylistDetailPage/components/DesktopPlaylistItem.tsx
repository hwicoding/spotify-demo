import { Box, styled, TableCell, TableRow, Typography } from "@mui/material";
import { PlaylistTrack } from "../../../models/playlist";
import { Episode, Track } from "../../../models/track";
import moment from "moment";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
    padding: "8px 16px",
    color: "rgba(255,255,255,0.7)",
  },
  "&:hover .MuiTableCell-root": {
    color: "#fff",
  },
}));

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };
  return (
    <StyledTableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {!isEpisode(item.track) && item.track.album?.images?.[2] && (
          <img
            src={item.track.album.images[2].url}
            alt=""
            style={{ width: 40, height: 40, borderRadius: "4px" }}
          />
        )}
        <Box>
          <Typography variant="body1" color="#fff" fontWeight={500}>
            {item.track.name || "no name"}
          </Typography>
          {!isEpisode(item.track) && (
            <Typography variant="body2">
              {item.track.artists?.map(a => a.name).join(", ")}
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name}</TableCell>
      <TableCell>
        {item.added_at ? moment(item.added_at).format("YYYY-MM-DD") : "Unknown"}
      </TableCell>
      {isEpisode(item.track) ? (
        <TableCell>N/A</TableCell>
      ) : (
        <TableCell>{moment(item.track.duration_ms).format("mm:ss")}</TableCell>
      )}
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;