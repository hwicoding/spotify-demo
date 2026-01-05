import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Image } from "./commonType";
import { Episode, Track } from "./track";

export interface GetCurrentUserPlaylistsRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  };
  public: boolean | null;
  snapshot_id: string;
  type: string;
  uri: string;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks: {
    href: string;
    total: number;
  };
}

export interface Playlist extends BasePlaylist {
  tracks: ApiResponse<PlaylistTrack>;
  followers?: {
    href: string | null;
    total: number;
  };
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export type GetPlaylistResponse = Playlist;


export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  offset?: number;
  limit?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode;
}

export interface CreatePlaylistRequest {
  name: string;
  playlistPublic?: boolean;
  collaborative?: boolean;
  description?: string;
}

export interface AddItemsToPlaylistRequest {
  playlist_id: string;
  uris: string[];
  position?: number;
}

export interface AddItemsToPlaylistResponse {
  snapshot_id: string;
}
