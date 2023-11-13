export type Status = {
  hp: number;
  atk: number;
  def: number;
  mat: number;
  mdf: number;
  spd: number;
  crt: number;
}

/**
 * 合算したステータスを返す
 * @param statuses 
 * @returns 合計ステータス
 */
export function margeStatus(...statuses: Status[]): Status{
  const retStatus: Status = {
    hp: 0,
    atk: 0,
    def: 0,
    mat: 0,
    mdf: 0,
    spd: 0,
    crt: 0,
  }
  statuses.forEach((status) => {
    retStatus.hp += status.hp;
    retStatus.atk += status.atk;
    retStatus.def += status.def;
    retStatus.mat += status.mat;
    retStatus.mdf += status.mdf;
    retStatus.spd += status.spd;
    retStatus.crt += status.crt;
  });
  return retStatus;
}