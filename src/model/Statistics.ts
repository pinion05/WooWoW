export default interface Statistics {
  _links: {
    self: {
      href: string;
    };
  };
  health: number;
  power: number;
  power_type: {
    key: {
      href: string;
    };
    name: string;
    id: number;
  };
  strength: {
    base: number;
    effective: number;
  };
  agility: {
    base: number;
    effective: number;
  };
  intellect: {
    base: number;
    effective: number;
  };
  stamina: {
    base: number;
    effective: number;
  };
  melee_crit: {
    rating: number;
    rating_bonus: number;
    value: number;
  };
  attack_power: number;

  main_hand_damage_min: number;

  main_hand_damage_max: number;

  main_hand_speed: number;

  main_hand_dps: number;

  off_hand_damage_min: number;

  off_hand_damage_max: number;

  off_hand_speed: number;

  off_hand_dps: number;

  spell_power: number;

  spell_penetration: number;
  spell_crit: {
    rating: number;
    rating_bonus: number;
    value: number;
  };
  mana_regen: number;
  mana_regen_combat: number;
  armor: {
    base: number;
    effective: number;
  };
  dodge: {
    rating: number;
    rating_bonus: number;
    value: number;
  };
  parry: {
    rating: number;
    rating_bonus: number;
    value: number;
  };
  block: {
    rating: number;
    rating_bonus: number;
    value: number;
  };
  ranged_crit: {
    rating: number;
    rating_bonus: number;
    value: number;
  };
  character: {
    key: {
      href: string;
    };
    name: string;

    id: string;

    realm: {
      key: { href: string };
      name: string;

      id: string;

      slug: string;
    };
  };

  spirit: { base: number; effective: number };

  defense: { base: number; effective: number };

  fire_resistance: { base: number; effective: number };

  holy_resistance: { base: number; effective: number };

  shadow_resistance: { base: number; effective: number };

  nature_resistance: { base: number; effective: number };

  arcane_resistance: { base: number; effective: number };
}
