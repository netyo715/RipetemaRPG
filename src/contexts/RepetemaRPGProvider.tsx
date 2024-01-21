import { ReactNode } from "react";
import { UserDataProvider } from "./UserDataProvider";
import { DataManagerProvider } from "./DataManagerProvider";
import { BattleManagerProvider } from "./BattleManagerProvider";

export const RepetemaRPGProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <UserDataProvider>
      <DataManagerProvider>
        <BattleManagerProvider>{children}</BattleManagerProvider>
      </DataManagerProvider>
    </UserDataProvider>
  );
};
