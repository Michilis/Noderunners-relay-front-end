export interface NostrJson {
  names: Record<string, string>;
}

export interface WhitelistCache {
  pubkeys: Set<string>;
  lastUpdated: number;
}