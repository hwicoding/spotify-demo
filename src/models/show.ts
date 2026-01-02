import { ExternalUrls, Image } from "./commonType";

export interface SimplifiedShow {
    available_markets: string[];
    copyrights: { text: string; type: string }[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
}

export interface Show extends SimplifiedShow { }
