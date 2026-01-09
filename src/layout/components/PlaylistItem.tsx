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
  padding: "8px",
  alignItems: "center",
  borderRadius: "8px",
  backgroundColor: selected ? theme.palette.action.active : "",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const PlaylistAvatar = styled(Avatar)({
  width: "48px",
  height: "48px",
  borderRadius: "8px",
});

const DefaultAvatar = styled(Avatar)({
  width: "48px",
  height: "48px",
  borderRadius: "8px",
  backgroundColor: "#282828",
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
      <ListItemAvatar>
        {displayImage ? (
          <PlaylistAvatar src={displayImage} alt={name} />
        ) : (
          <DefaultAvatar variant="square">
            <MusicNoteIcon />
          </DefaultAvatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={<PlaylistName>{name}</PlaylistName>}
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

