import { BattleProcess } from "../../features/main_contents/battle_process";
import { AttackEffect, BattleAction, BattleActionType, BattleUnit } from "../../features/main_contents/battle_unit";
import { getValueRandom } from "../../utils/utils";
import { SkillId, SkillType } from "../define/skill";

type SkillInfo = {
  [key in SkillId]: {
    name: string,
    skillType: SkillType
    coolDown: number
    behavior: (action: BattleAction, battle: BattleProcess) => void|AttackEffect
  };
};

export const SKILL_INFO: SkillInfo = {
  // ランダムな相手に攻撃力の2倍ダメージを3回
  [SkillId.TestAttack]: {
    name: "テストアタック",
    skillType: SkillType.Active,
    coolDown: 10000,
    behavior: (action: BattleAction, battle: BattleProcess) => {
      const actioner = action.actioner;
      battle.sendLog(`${actioner.name}のテストアタック！`);
      const targetTeam = actioner.isAlly ? battle.enemyUnits : battle.allyUnits;
      for (let i = 0; i < 3; i++) {
        const target = getValueRandom(targetTeam.filter((unit: BattleUnit) => !unit.isDead));
        if (target){
          const damage = action.causeDamage({
            type: BattleActionType.Skill,
            physicalDamage: actioner.battleStatus.atk*2,
            magicDamage: 0,
          }, target);
          battle.sendLog(`${i+1}回目、${target.name}に${damage}ダメージ！`)
        }
      }
    }
  }
};