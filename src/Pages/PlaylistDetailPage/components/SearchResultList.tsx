import { useInView } from "react-intersection-observer";
import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner/LoadingSpinner";
import AddToPlaylistMenu from "../../../common/components/AddToPlaylistMenu/AddToPlaylistMenu";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  transition: "background-color 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));
const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
  boxShadow: "0 4px 60px rgba(0,0,0,0.5)",
});
interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  onAdd: (trackUri: string) => void;
}
const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onAdd,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, hasNextPage]);

  return (
    <StyledTableContainer sx={{ border: "none", boxShadow: "none", overflowX: "hidden" }}>
      <Table sx={{ tableLayout: "fixed", width: "100%" }}>
        <TableBody>
          {list.map((track) => (
            <StyledTableRow key={track.id}>
              {/* Main content column - takes remaining space */}
              <TableCell sx={{ py: 1, px: 2, width: "auto", overflow: "hidden" }}>
                <Box display="flex" alignItems="center">
                  <Box mr={2} flexShrink={0}>
                    <AlbumImage
                      src={track.album?.images?.[0]?.url || "https://community.spotify.com/t5/image/serverpage/image-id/25294i2823039A26A18663/image-size/original?v=mpbl-1&px=-1"}
                      width="40px"
                      height="40px"
                      sx={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body1" fontWeight={600} noWrap>
                      {track.name}
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.6)" noWrap>
                      {track.artists?.map((a) => a.name).join(", ") || "Unknown Artist"}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              {/* Album column - hidden on mobile */}
              <TableCell sx={{ display: { xs: "none", md: "table-cell" }, color: "rgba(255,255,255,0.6)", width: "30%" }}>
                <Typography variant="body2" noWrap>
                  {track.album?.name}
                </Typography>
              </TableCell>

              {/* Action column - fixed width tailored for content */}
              <TableCell align="right" sx={{ pr: 2, width: { xs: "80px", sm: "120px" } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => track.uri && onAdd(track.uri)}
                    sx={{
                      borderRadius: "20px",
                      color: "white",
                      borderColor: "rgba(255,255,255,0.3)",
                      textTransform: "none",
                      fontWeight: 600,
                      minWidth: "60px",
                      padding: "4px 10px",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Add
                  </Button>
                  {/* Hide menu on very small screens if needed, or keep it compact */}
                  {/* {track.uri && (
                    <AddToPlaylistMenu trackUri={track.uri} trackName={track.name || "Unknown Track"} />
                  )} */}
                </Box>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Box ref={ref} sx={{ height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {isFetchingNextPage && <LoadingSpinner />}
      </Box>
    </StyledTableContainer>
  );
};

export default SearchResultList;

