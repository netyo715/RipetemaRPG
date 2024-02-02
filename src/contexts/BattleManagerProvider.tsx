import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useImmer } from "use-immer";
import {
  useAdventurerData,
  useUpdateAdventurerData,
  useUpdateGameData,
  useUpdateItemData,
} from "./UserDataProvider";
import { BattleManager } from "../scripts/battleManager";
import { Area } from "../types/dungeon";
import { getRandomMonsterIdsFromMonsterPattern } from "../scripts/battle";
import { MonsterId } from "../data/monster";
import { LOG_LINE_MAX } from "../data/game";
import { BattleUnitForView } from "../types/battle";

//TODO
type BattleManagerContextProps = {
  startBattle: (area: Area) => void;
  closeBattle: () => void;
  battleLog: string[];
  battleState: BattleState;
  battleInfo?: {
    area: Area;
    adventurerUnitForViews: BattleUnitForView[];
    monsterUnitForViews: BattleUnitForView[];
  };
};

export type BattleState = "battling" | "waitingRestart" | "closed";

const battleManagerContext = createContext<
  BattleManagerContextProps | undefined
>(undefined);

export const BattleManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const adventurerData = useAdventurerData();
  const updateAdventurerData = useUpdateAdventurerData();
  const updateGearData = useUpdateAdventurerData();
  const updateItemData = useUpdateItemData();
  const updateGameData = useUpdateGameData();

  const battleManagerRef = useRef<BattleManager>();
  const monsterIdsRef = useRef<MonsterId[]>();
  const [battleLog, updateBattleLog] = useImmer<string[]>([]);
  const [battleState, setBattleState] = useState<BattleState>("closed");
  const [area, setArea] = useState<Area | undefined>(undefined);
  const [adventurerUnitForViews, setAdventurerUnitForViews] = useState<
    BattleUnitForView[] | undefined
  >(undefined);
  const [monsterUnitForViews, setMonsterUnitForViews] = useState<
    BattleUnitForView[] | undefined
  >(undefined);

  useEffect(() => {
    // リスタート
    if (
      battleState === "waitingRestart" &&
      battleManagerRef.current?.isClosed &&
      area !== undefined
    ) {
      startBattle(area);
    }
  }, [battleState]);

  const startBattle = (area: Area): void => {
    if (battleState === "battling") {
      return;
    }
    setArea(area);
    monsterIdsRef.current = getRandomMonsterIdsFromMonsterPattern(
      area.monsterPatterns
    );
    battleManagerRef.current = new BattleManager(
      adventurerData,
      monsterIdsRef.current,
      sendLog,
      setAdventurerUnitForViews,
      setMonsterUnitForViews,
      restart,
      onEnd
    );
    setBattleState("battling");
  };

  const closeBattle = (): void => {
    setBattleState("closed");
    if (battleManagerRef.current) {
      battleManagerRef.current.close();
      battleManagerRef.current = undefined;
      updateBattleLog(() => []);
      setArea(undefined);
      setAdventurerUnitForViews(undefined);
      setMonsterUnitForViews(undefined);
      // TODO 他の初期化処理
    }
  };

  /**
   * 戦闘クラスに渡すログ出力関数
   * @param text
   */
  const sendLog = (text: string): void => {
    updateBattleLog((draft) => {
      draft.unshift(text);
      if (draft.length > LOG_LINE_MAX) draft.pop();
      return;
    });
  };

  /**
   * 戦闘
   * @param isWin
   */
  const onEnd = (isWin: boolean): void => {
    // TODO 勝利なら経験値等の処理
    sendLog(`${isWin ? "勝利" : "敗北"}`);
  };

  const restart = (): void => {
    setBattleState("waitingRestart");
  };

  let providerValue: BattleManagerContextProps = {
    startBattle: startBattle,
    closeBattle: closeBattle,
    battleLog: battleLog,
    battleState: battleState,
  };
  if (area && adventurerUnitForViews && monsterUnitForViews) {
    providerValue.battleInfo = {
      area: area,
      adventurerUnitForViews: adventurerUnitForViews,
      monsterUnitForViews: monsterUnitForViews,
    };
  }
  return (
    <battleManagerContext.Provider value={providerValue}>
      {children}
    </battleManagerContext.Provider>
  );
};

export const useBattleManager = (): BattleManagerContextProps => {
  const context = useContext(battleManagerContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
