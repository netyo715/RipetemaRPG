import { ReactNode } from "react";
import { UserDataProvider } from "./UserDataProvider";

export const RepetemaRPGProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  return (
    <UserDataProvider>
      {children}
    </UserDataProvider>
  );
};