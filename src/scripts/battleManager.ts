import { Updater } from "use-immer";
import { AdventurerData } from "../types/game";
import { Area } from "../types/dungeon";
import { BattleUnit } from "../types/battle";
import {
  createBattleUnitFromAdventurer,
  createBattleUnitFromMonsterId,
  getRandomMonsterIdsFromMonsterPattern,
} from "../utilities/battle";

const TURN_INTERVAL = 1000; //TODO

export class BattleManager {
  adventurerData: AdventurerData;
  sendLog: (log: string) => void;
  updateAdventurerData: Updater<AdventurerData>;

  turnHandler?: ReturnType<typeof setTimeout> = undefined;
  area?: Area;
  adventurerUnits: BattleUnit[] = [];
  monsterUnits: BattleUnit[] = [];

  constructor(
    adventurerData: AdventurerData,
    sendLog: (log: string) => void,
    updateAdventurerData: Updater<AdventurerData> // TODO
  ) {
    this.adventurerData = adventurerData;
    this.sendLog = sendLog;
    this.updateAdventurerData = updateAdventurerData; // TODO
  }

  /**
   * 各フレーム毎の処理
   */
  turn() {
    this.turnHandler = setTimeout(this.turn.bind(this), TURN_INTERVAL);
  }

  /**
   * 終了時処理
   */
  onEnd() {
    this.close();
    if (this.area) {
      this.run(this.area);
    }
  }

  /**
   * 戦闘を開始する
   * @param area エリア
   */
  run(area: Area) {
    this.area = area;
    this.adventurerUnits = this.adventurerData.map((adventurer) =>
      createBattleUnitFromAdventurer(adventurer)
    );
    this.monsterUnits = getRandomMonsterIdsFromMonsterPattern(
      area.monsterPatterns
    ).map((monsterId) => createBattleUnitFromMonsterId(monsterId));
    this.turnHandler = setTimeout(this.turn.bind(this), TURN_INTERVAL);
  }

  /**
   * 戦闘を終了する
   */
  close() {
    clearTimeout(this.turnHandler);
  }
}
