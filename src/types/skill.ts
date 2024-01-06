import { SkillId } from "../data/define/skill"
import { BattleProcess } from "../features/main_contents/battle_process";
import { BattleAction } from "../features/main_contents/battle_unit";

export type ActiveSkill = {
  id: SkillId;
  name: string;
  coolDown: number;
  behavior: (action: BattleAction, battle: BattleProcess) => void;
}