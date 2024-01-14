import { Button, VStack } from "@yamada-ui/react";
import { useUpdateUserData } from "../../../../contexts/DataManageProvider";

export const Settings: React.FC = () => {
  const { saveGameData } = useUpdateUserData();
  return (
    <VStack>
      <Button onClick={saveGameData}>データを保存する</Button>
    </VStack>
  );
};
