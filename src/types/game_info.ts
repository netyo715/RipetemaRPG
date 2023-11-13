/**
 * ゲーム情報
 */
export type GameInfo = {
  gold: number;
}

/**
 * 初期状態のゲーム情報
 * @returns 初期状態のゲーム情報
 */
export function getDefaultGameInfo(): GameInfo{
  return {
    gold: 0,
  };
}