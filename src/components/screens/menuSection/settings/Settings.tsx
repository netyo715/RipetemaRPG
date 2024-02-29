import { Button, Dialog, VStack, useDisclosure } from "@yamada-ui/react";
import { useUpdateUserData } from "../../../../contexts/DataManagerProvider";

export const Settings: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { saveUserData: saveGameData, resetUserData: resetUserData } =
    useUpdateUserData();
  return (
    <VStack p="md">
      <Button onClick={saveGameData} colorScheme="primary">データを保存する</Button>
      <Button onClick={onOpen} colorScheme="danger">
        データをリセットする
      </Button>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        header="データをリセット"
        cancel="リセットしない"
        onCancel={onClose}
        success={{ colorScheme: "danger", children: "リセットする" }}
        onSuccess={() => {
          resetUserData();
          onClose();
        }}
      >
        データをリセットします。この操作は元に戻せません。
      </Dialog>
    </VStack>
  );
};
