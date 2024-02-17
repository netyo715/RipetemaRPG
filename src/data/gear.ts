import { Gear } from "../types/gear";

/**
 * 装備ID
 */
export enum GearId {
  骨の剣 = "G000",
  骨の盾 = "G001",
  皮の帽子 = "G002",
  皮の服 = "G003",
  皮のグローブ = "G004",
  皮の靴 = "G005",
  お守り = "G006",
}

/**
 * 装備詳細
 */
// TODO 仮ステータス
export const GEAR_INFO: GearInfo = {
  [GearId.骨の剣]: {
    name: "獣骨の剣",
    gearType: "weapon",
    status: {
      atk: 10,
    },
  },
  [GearId.骨の盾]: {
    name: "骨の盾",
    gearType: "shield",
    status: {
      def: 10,
    },
  },
  [GearId.皮の帽子]: {
    name: "皮の帽子",
    gearType: "head",
    status: {
      def: 5,
      mdf: 5,
    },
  },
  [GearId.皮の服]: {
    name: "皮の服",
    gearType: "body",
    status: {
      hp: 10,
      def: 5,
    },
  },
  [GearId.皮のグローブ]: {
    name: "",
    gearType: "arm",
    status: {
      def: 5,
      crt: 5,
    },
  },
  [GearId.皮の靴]: {
    name: "皮の靴",
    gearType: "leg",
    status: {
      def: 5,
      spd: 5,
    },
  },
  [GearId.お守り]: {
    name: "お守り",
    gearType: "other",
    status: {
      mat: 5,
      mdf: 5,
    },
  },
};

type GearInfo = {
  [gearId in GearId]: Gear;
};
