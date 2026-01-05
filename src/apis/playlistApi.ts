import { AddItemsToPlaylistRequest, AddItemsToPlaylistResponse, CreatePlaylistRequest, GetCurrentUserPlaylistsRequest, GetCurrentUserPlaylistsResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, GetPlaylistResponse, Playlist } from "../models/playlist"
import api from "../utils/api"

export const getCurrentUserPlaylists = async ({ limit, offset }: GetCurrentUserPlaylistsRequest): Promise<GetCurrentUserPlaylistsResponse> => {
  const response = await api.get("me/playlists", {
    params: { limit, offset },
  });
  return response.data;
}

export const getPlaylist = async (params: GetPlaylistRequest): Promise<GetPlaylistResponse> => {
  const response = await api.get(`playlists/${params.playlist_id}`, {
    params,
  });
  return response.data;
}

export const getPlaylistItems = async (params: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
  const response = await api.get(`playlists/${params.playlist_id}/tracks`, {
    params,
  });
  return response.data;
}

export const createPlaylist = async (user_id: string, params: CreatePlaylistRequest): Promise<Playlist> => {
  const { name, playlistPublic, collaborative, description } = params
  const response = await api.post(`/users/${user_id}/playlists`, {
    name,
    public: playlistPublic,
    collaborative,
    description,
  })
  return response.data
}

export const addItemsToPlaylist = async ({ playlist_id, uris, position }: AddItemsToPlaylistRequest): Promise<AddItemsToPlaylistResponse> => {
  const response = await api.post(`playlists/${playlist_id}/tracks`, {
    uris,
    position,
  });
  return response.data;
}