export default interface Item {
  item: {
    key: {
      href: string;
    };
    id: number;
  };
  slot: {
    type: string;
    name: string;
  };
  quantity: number;
  quality: {
    type: string;
    name: `일반` | `고급` | `희귀` | `영웅`;
  };
  name?: string; // Optional property
  media: {
    key: {
      href: string;
    };
    id: number; // Optional property
  };
  item_class?: {
    key?: {
      href?: string; // Optional property
    };
    name?: string; // Optional property
    id?: number; // Optional property
  };
  item_subclass?: {
    key?: {
      href?: string; // Optional property
    };
    name?: string;
    id?: number;
  };
  inventory_type?: {
    type: string;
    name: string;
  };
  binding?: {
    type: string;
    name: string;
  };
  armor?: {
    value: number;
    display: {
      display_string: string;
      color: {
        r: number;
        g: number;
        b: number;
        a: number;
      };
    };
  };
  stats?: [
    {
      type: { type: string; name: string };
      value: number;
      display: {
        display_string: string;
        color: { r: number; g: number; b: number; a: number };
      };
    }
  ];
  spells?: [
    {
      spell: { key: { href: string }; name: string; id: number };
      description: String;
    }
  ];
  sell_price: {
    value: number;
    display_strings: {
      header: String;
      gold: String;
      silver: String;
      copper: String;
    };
  };
  requirements: {
    level: {
      value: number;
      display_string: String;
    };
  };
  durability: {
    value: number;
    display_string: String;
  };
  weapon?: {
    damage: {
      min_value: number;
      max_value: number;
      display_string: string;
      damage_class: {
        type: string;
        name: string;
      };
    };
    attack_speed: {
      value: number;
      display_string: string;
    };
    dps: {
      value: number;
      display_string: string;
    };
  };
}
