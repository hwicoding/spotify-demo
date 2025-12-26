import { ExternalUrls, Image } from "./commonType";

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    type: string;
    uri: string;
}