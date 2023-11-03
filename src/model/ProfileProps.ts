export interface ProfileProps {
  characterName: string;
  playerName: string;
  job:
    | "도적"
    | "magicion"
    | "paladin"
    | "priest"
    | "warlock"
    | "hunter"
    | "druid"
    | "knight";
  level: number;
  isghost: `true` | `false`;
}
