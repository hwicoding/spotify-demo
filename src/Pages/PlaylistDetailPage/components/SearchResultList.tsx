import { useInView } from "react-intersection-observer";
import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner/LoadingSpinner";

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
    <StyledTableContainer sx={{ border: "none", boxShadow: "none" }}>
      <TableBody sx={{ width: "100%" }}>
        {list.map((track) => (
          <StyledTableRow key={track.id}>
            <TableCell sx={{ py: 1, px: 2 }}>
              <Box display="flex" alignItems="center">
                <Box mr={2}>
                  <AlbumImage
                    src={track.album?.images?.[0]?.url || "https://community.spotify.com/t5/image/serverpage/image-id/25294i2823039A26A18663/image-size/original?v=mpbl-1&px=-1"}
                    width="40px"
                    height="40px"
                    sx={{ objectFit: "cover" }}
                  />
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={600} noWrap>
                    {track.name}
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.6)" noWrap>
                    {track.artists?.map((a) => a.name).join(", ") || "Unknown Artist"}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" }, color: "rgba(255,255,255,0.6)" }}>
              <Typography variant="body2" noWrap>
                {track.album?.name}
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ pr: 2 }}>
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
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Add
              </Button>
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
      <Box ref={ref} sx={{ height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {isFetchingNextPage && <LoadingSpinner />}
      </Box>
    </StyledTableContainer>
  );
};

export default SearchResultList;

