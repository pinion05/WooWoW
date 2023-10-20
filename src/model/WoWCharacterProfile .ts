interface SelfLink {
  href: string;
}

interface Links {
  self: SelfLink;
}

interface Gender {
  type: string;
  name: string;
}

interface Faction {
  type: string;
  name: string;
}

interface Key {
  href: string;
}

interface Race {
  key: Key;
  name: string;
  id: number;
}

interface CharacterClass {
  key: Key;
  name: string;
  id: number;
}

interface ActiveSpec {
  key: Key;
  id: number;
}

interface Realm {
  key: Key;
  name: string;
  id: number;
  slug: string;
}

interface GuildFaction {
  type: string;
  name: string;
}

// Nested Guild object interface

interface GuildRealm {
  key: Key;
  name: string;
  id: number;
  slug: string;
}
interface Guild {
  key: Key;
  name: string;
  id: number;
  realm: GuildRealm;
  faction: Faction;
}

// Main Interface

export default interface WoWCharacterProfile {
  _links: Links;
  id: number;
  name: string;
  gender: Gender;
  faction: Faction;
  race: Race;
  character_class: CharacterClass;
  active_spec: ActiveSpec;
  realm: Realm;
  guild: Guild;
  level: number;
  experience: number;
  titles: Links;
  pvp_summary: Links;
  media: Links;
  last_login_timestamp: number;
  average_item_level: number;
  equipped_item_level: number;
  specializations: Links;
  statistics: Links;
  equipment: Links;
  appearance: Links;
  collections: Links;

  is_ghost: boolean;
}
