import { ReactNode } from "react";
import { UserDataProvider } from "./UserDataProvider";
import { DataManageProvider } from "./DataManageProvider";

export const RepetemaRPGProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  return (
    <UserDataProvider>
      <DataManageProvider>
        {children}
      </DataManageProvider>
    </UserDataProvider>
  );
};