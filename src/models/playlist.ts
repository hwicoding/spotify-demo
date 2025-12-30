import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image } from "./commonType";
import { Track } from "./track";

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

export interface PlaylistTrack {
  added_at: string | null;
  added_by: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local: boolean;
  track: Track;
}