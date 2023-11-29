import { SkillId, SkillType } from "../data/define/skill"
import { BattleProcess } from "../features/main_contents/battle_process";
import { BattleAction } from "../features/main_contents/battle_unit";

export type Skill = {
  id: SkillId;
  type: SkillType;
  name: string;
  coolDown: number;
  behavior: (action: BattleAction, battle: BattleProcess) => void;
}