import { Button, VStack } from "@yamada-ui/react";
import { useUpdateUserData } from "../../../../contexts/DataManagerProvider";

export const Settings: React.FC = () => {
  const { saveUserData: saveGameData } = useUpdateUserData();
  return (
    <VStack>
      <Button onClick={saveGameData}>データを保存する</Button>
    </VStack>
  );
};
