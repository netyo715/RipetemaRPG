import { Gear, GearType } from "../../types/gear";
import { GearId } from "../define/gear";

type GearInfo = {
  [key in GearId]: Gear;
};

export const GEAR_INFO: GearInfo = {
  [GearId.TestGear1]: {
    id: GearId.TestGear1,
    name: "テスト装備武器",
    type: GearType.Weapon,
    status: {
      hp: 0,
      atk: 10,
      def: 0,
      mat: 0,
      mdf: 0,
      spd: 0,
      crt: 0,
    },
    skill: [],
  },
  [GearId.TestGear2]: {
    id: GearId.TestGear2,
    name: "テスト装備盾",
    type: GearType.Weapon,
    status: {
      hp: 0,
      atk: 0,
      def: 10,
      mat: 0,
      mdf: 0,
      spd: 0,
      crt: 0,
    },
    skill: [],
  },
  [GearId.TestGear3]: {
    id: GearId.TestGear3,
    name: "テスト装備頭",
    type: GearType.Weapon,
    status: {
      hp: 0,
      atk: 0,
      def: 5,
      mat: 0,
      mdf: 5,
      spd: 0,
      crt: 0,
    },
    skill: [],
  },
  [GearId.TestGear4]: {
    id: GearId.TestGear4,
    name: "テスト装備体",
    type: GearType.Weapon,
    status: {
      hp: 5,
      atk: 0,
      def: 5,
      mat: 0,
      mdf: 0,
      spd: 0,
      crt: 0,
    },
    skill: [],
  },
  [GearId.TestGear5]: {
    id: GearId.TestGear5,
    name: "テスト装備手",
    type: GearType.Weapon,
    status: {
      hp: 0,
      atk: 0,
      def: 5,
      mat: 0,
      mdf: 0,
      spd: 0,
      crt: 5,
    },
    skill: [],
  },
  [GearId.TestGear6]: {
    id: GearId.TestGear6,
    name: "テスト装備脚",
    type: GearType.Weapon,
    status: {
      hp: 0,
      atk: 0,
      def: 5,
      mat: 0,
      mdf: 0,
      spd: 5,
      crt: 0,
    },
    skill: [],
  },
  [GearId.TestGear7]: {
    id: GearId.TestGear7,
    name: "テスト装備アクセ",
    type: GearType.Weapon,
    status: {
      hp: 0,
      atk: 0,
      def: 0,
      mat: 5,
      mdf: 5,
      spd: 0,
      crt: 0,
    },
    skill: [],
  },
};