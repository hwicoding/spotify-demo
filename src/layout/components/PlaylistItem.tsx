import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistItems } from "../../apis/playlistApi";
import { Episode } from "../../models/track";

const PlayListItemContainer = styled(ListItemButton)(({ theme, selected }) => ({
  padding: "8px 12px", // Slightly more horizontal padding
  alignItems: "center",
  borderRadius: "6px", // Slightly tighter radius
  transition: "background-color 0.2s ease", // Smooth transition
  backgroundColor: selected ? "rgba(255, 255, 255, 0.1)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  marginBottom: "4px", // Tiny space between items
}));
const PlaylistAvatar = styled(Avatar)({
  width: "56px", // Larger image
  height: "56px",
  borderRadius: "4px", // Sharp but slightly rounded corners for album art look
  marginRight: "16px",
});

const DefaultAvatar = styled(Avatar)({
  width: "56px",
  height: "56px",
  borderRadius: "4px",
  backgroundColor: "#282828",
  marginRight: "16px",
});

const PlaylistName = styled(Typography)({
  fontWeight: "bold",
  color: "#1db954",
});
interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
  handleClick: (id: string) => void;
  selected?: boolean;
}


const PlaylistItem = ({
  image,
  name,
  artistName,
  id,
  handleClick,
  selected,
}: PlaylistItemProps) => {
  // 이미지가 유효한 URL인지 확인합니다.
  const hasValidImage = !!image && typeof image === 'string' && image.startsWith("http");

  // 플레이리스트 이미지가 없을 때만 첫 번째 트랙의 이미지를 가져오는 전용 쿼리
  // 쿼리 키를 'playlist-thumbnail'로 단일화합니다.
  const { data: trackData } = useQuery({
    queryKey: ["playlist-thumbnail", id],
    queryFn: () => getPlaylistItems({ playlist_id: id, limit: 1 }),
    enabled: !hasValidImage,
    staleTime: 1000 * 60 * 30, // 30분 캐시
  });

  const getDisplayImage = () => {
    // 1. 전달받은 이미지가 있으면 최우선 사용
    if (hasValidImage) return image;

    // 2. 없으면 첫 번째 트랙의 앨범/에피소드 이미지 사용
    const firstItem = trackData?.items?.[0];
    const track = firstItem?.track;
    if (!track) return null;

    if ("album" in track && track.album?.images?.[0]?.url) {
      return track.album.images[0].url;
    }

    if ("images" in track && (track as Episode).images?.[0]?.url) {
      return (track as Episode).images[0].url;
    }

    return null;
  };

  const displayImage = getDisplayImage();

  return (
    <PlayListItemContainer
      onClick={() => handleClick(id)}
      selected={selected || false}
    >
      <ListItemAvatar sx={{ minWidth: 'auto' }}> {/* Remove default minWidth to control spacing manually */}
        {displayImage ? (
          <PlaylistAvatar src={displayImage} alt={name} />
        ) : (
          <DefaultAvatar variant="square">
            <MusicNoteIcon sx={{ color: '#b3b3b3' }} />
          </DefaultAvatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          <PlaylistName
            variant="subtitle1"
            sx={{
              color: selected ? '#1db954' : 'text.primary',
              marginBottom: '4px'
            }}
          >
            {name}
          </PlaylistName>
        }
        secondary={
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {artistName}
          </Typography>
        }
      />
    </PlayListItemContainer>
  );
};

export default PlaylistItem;

