import React from "react";
import { useParams } from "react-router";
import { Box, Typography, Grid, styled, Card, CardMedia, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSearch } from "../../hooks/useSearch";
import SearchResultCard from "./components/SearchResultCard";

const TopResultCard = styled(Card)(({ theme }) => ({
	backgroundColor: "#181818",
	padding: theme.spacing(3),
	borderRadius: "8px",
	cursor: "pointer",
	transition: "background-color 0.3s ease",
	height: "100%",
	position: "relative",
	"&:hover": {
		backgroundColor: "#282828",
	},
	"&:hover .play-button": {
		opacity: 1,
		transform: "translateY(0)",
	},
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
	backgroundColor: "#1db954",
	color: "black",
	position: "absolute",
	bottom: "24px",
	right: "24px",
	opacity: 0,
	transform: "translateY(10px)",
	transition: "all 0.3s ease",
	"&:hover": {
		backgroundColor: "#1ed760",
		transform: "scale(1.05)",
	},
	boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
})) as typeof IconButton;

const SearchWithPage = () => {
	const { keyword } = useParams<{ keyword: string }>();
	const { data: searchResults, isLoading } = useSearch(keyword || "");

	if (isLoading) {
		return <Typography sx={{ p: 4 }}>Loading results...</Typography>;
	}

	const topResult = searchResults?.artists?.items[0] || searchResults?.tracks?.items[0];

	return (
		<Box sx={{ p: 4 }}>
			<Grid container spacing={4}>
				{/* Top Result */}
				<Grid size={{ xs: 12, md: 5 }}>
					<Typography variant="h5" sx={{ color: "white", fontWeight: 700, mb: 2 }}>
						Top result
					</Typography>
					{topResult && (
						<TopResultCard>
							<CardMedia
								component="img"
								image={
									"images" in topResult
										? topResult.images[0]?.url
										: topResult.album?.images[0]?.url
								}
								alt={topResult.name}
								sx={{
									width: "92px",
									height: "92px",
									borderRadius: "images" in topResult ? "50%" : "4px",
									mb: 3,
									boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
								}}
							/>
							<Typography variant="h3" sx={{ color: "white", fontWeight: 700, mb: 1 }}>
								{topResult.name}
							</Typography>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<Typography variant="body2" sx={{ color: "#b3b3b3", fontWeight: 700 }}>
									{"type" in topResult ? topResult.type?.toUpperCase() : "TRACK"}
								</Typography>
							</Box>
							<PlayButton className="play-button" size="large">
								<PlayArrowIcon fontSize="large" />
							</PlayButton>
						</TopResultCard>
					)}
				</Grid>

				{/* Songs */}
				<Grid size={{ xs: 12, md: 7 }}>
					<Typography variant="h5" sx={{ color: "white", fontWeight: 700, mb: 2 }}>
						Songs
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						{searchResults?.tracks?.items.slice(0, 4).map((track) => (
							<Box
								key={track.id}
								sx={{
									display: "flex",
									alignItems: "center",
									p: 1,
									borderRadius: "4px",
									"&:hover": { backgroundColor: "#282828" },
									cursor: "pointer",
								}}
							>
								<img
									src={track.album?.images[0]?.url}
									alt={track.name}
									style={{ width: "40px", height: "40px", borderRadius: "4px", marginRight: "12px" }}
								/>
								<Box>
									<Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
										{track.name}
									</Typography>
									<Typography variant="body2" sx={{ color: "#b3b3b3" }}>
										{track.artists?.map((a) => a.name).join(", ")}
									</Typography>
								</Box>
							</Box>
						))}
					</Box>
				</Grid>

				{/* Artists */}
				<Grid size={12}>
					<Typography variant="h5" sx={{ color: "white", fontWeight: 700, mb: 2, mt: 4 }}>
						Artists
					</Typography>
					<Grid container spacing={3}>
						{searchResults?.artists?.items.slice(0, 5).map((artist) => (
							<Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={artist.id}>
								<SearchResultCard
									image={artist.images[0]?.url}
									title={artist.name}
									subtitle="Artist"
									type="artist"
								/>
							</Grid>
						))}
					</Grid>
				</Grid>

				{/* Albums */}
				<Grid size={12}>
					<Typography variant="h5" sx={{ color: "white", fontWeight: 700, mb: 2, mt: 4 }}>
						Albums
					</Typography>
					<Grid container spacing={3}>
						{searchResults?.albums?.items.slice(0, 5).map((album) => (
							<Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={album.id}>
								<SearchResultCard
									image={album.images[0]?.url}
									title={album.name}
									subtitle={`${album.release_date.split("-")[0]} • ${album.artists[0]?.name}`}
									type="album"
								/>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default SearchWithPage;