import { BattleProcess } from "../../features/main_contents/battle_process";
import { AttackEffect, BattleAction, BattleActionType, BattleUnit, Damage } from "../../features/main_contents/battle_unit";
import { getRandomAliveUnit } from "../../utils/battle_process";
import { getRandomValue } from "../../utils/utils";
import { SkillId, SkillType } from "../define/skill";

type ActiveSkillInfo = {
  [key in SkillId]: {
    name: string,
    coolDown: number
    behavior: (action: BattleAction, battle: BattleProcess) => void|AttackEffect
  };
};

export const ACTIVE_SKILL_INFO: ActiveSkillInfo = {
  // ランダムな相手に通常攻撃の2倍ダメージを3回
  [SkillId.TestAttack]: {
    name: "テストアタック",
    coolDown: 10000,
    behavior: (action: BattleAction, battle: BattleProcess) => {
      const actioner = action.actioner;
      battle.sendLog(`${actioner.name}のテストアタック！`);
      const targetTeam = actioner.isAlly ? battle.enemyUnits : battle.allyUnits;
      for (let i = 0; i < 3; i++) {
        const target = getRandomAliveUnit(targetTeam);
        if (target){
          const damageResult = action.causeDamage(new Damage({
            type: BattleActionType.Skill,
            physicalDamage: actioner.battleStatus.atk*2,
            magicDamage: 0,
          }), [target]);
          const causedDamage = damageResult.causedDamages[0];
          battle.sendLog(`${i+1}回目、${target.name}に${causedDamage}ダメージ！`)
        }
      }
    }
  }
};