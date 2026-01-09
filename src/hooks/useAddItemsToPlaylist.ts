import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemsToPlaylist } from "../apis/playlistApi";
import { AddItemsToPlaylistRequest } from "../models/playlist";

const useAddItemsToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddItemsToPlaylistRequest) => addItemsToPlaylist(params),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["playlist-detail", variables.playlist_id] }),
        queryClient.invalidateQueries({ queryKey: ["playlist-items", variables.playlist_id] }),
        queryClient.invalidateQueries({ queryKey: ["playlist-thumbnail", variables.playlist_id] }),
        queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] }),
      ]);
    },
  });
};

export default useAddItemsToPlaylist;
