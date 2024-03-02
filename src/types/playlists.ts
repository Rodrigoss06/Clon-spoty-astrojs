export type PlaylistsType = Playlist[]

export interface Playlist {
  collaborative: boolean
  description: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  owner: Owner
  public: boolean
  snapshot_id: string
  tracks: Tracks
  type: string
  uri: string
  primary_color: any
}

export interface ExternalUrls {
  spotify: string
}

export interface Image {
  url: string
  height: any
  width: any
}

export interface Owner {
  external_urls: ExternalUrls2
  href: string
  id: string
  type: string
  uri: string
  display_name: string
}

export interface ExternalUrls2 {
  spotify: string
}

export interface Tracks {
  href: string
  total: number
}
