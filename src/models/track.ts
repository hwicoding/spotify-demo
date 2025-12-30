import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import { ExternalUrls, Restrictions } from "./commonType";

export interface SimplifiedTrack {
  artists: Artist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  restrictions?: Restrictions;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Track extends SimplifiedTrack {
  album: SimplifiedAlbum;
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  popularity: number;
}
