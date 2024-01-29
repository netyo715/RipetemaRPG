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
import { getRandomMonsterIdsFromMonsterPattern } from "../utilities/battle";
import { MonsterId } from "../data/monster";
import { LOG_LINE_MAX } from "../data/game";

//TODO
type BattleManagerContextProps = {
  startBattle: (area: Area) => void;
  closeBattle: () => void;
  battleLog: string[];
  battleState: BattleState;
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
  const areaRef = useRef<Area>();
  const monsterIdsRef = useRef<MonsterId[]>();
  const [battleLog, updateBattleLog] = useImmer<string[]>([]);
  const [battleState, setBattleState] = useState<BattleState>("closed");

  useEffect(() => {
    // リスタート
    if (
      battleState === "waitingRestart" &&
      battleManagerRef.current?.isClosed &&
      areaRef.current
    ) {
      startBattle(areaRef.current);
    }
  }, [battleState]);

  const startBattle = (area: Area): void => {
    if (battleState === "battling") {
      return;
    }
    setBattleState("battling");
    areaRef.current = area;
    monsterIdsRef.current = getRandomMonsterIdsFromMonsterPattern(
      area.monsterPatterns
    );
    battleManagerRef.current = new BattleManager(
      adventurerData,
      monsterIdsRef.current,
      sendLog,
      restart,
      onEnd
    );
  };

  const closeBattle = (): void => {
    setBattleState("closed");
    if (battleManagerRef.current) {
      battleManagerRef.current.close();
      battleManagerRef.current = undefined;
      updateBattleLog(() => []);
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

  const providerValue: BattleManagerContextProps = {
    startBattle: startBattle,
    closeBattle: closeBattle,
    battleLog: battleLog,
    battleState: battleState,
  };
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
