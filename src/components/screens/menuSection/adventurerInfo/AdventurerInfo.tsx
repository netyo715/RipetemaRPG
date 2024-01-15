import { useState } from "react";
import { useAdventurerData } from "../../../../contexts/UserDataProvider";
import { VStack } from "@yamada-ui/react";
import { AdventurerList } from "./AdventurerList";
import { AdventurerDetail } from "./AdventurerDetail";

export const AdventurerInfo: React.FC = () => {
  const [isViewList, setIsViewList] = useState<Boolean>(true);
  const [selectedAdventurerIndex, setSelectedAdventuterIndex] =
    useState<number>(0);
  const adventurerData = useAdventurerData();

  const viewAdventurerDetail = (index: number): void => {
    setSelectedAdventuterIndex(index);
    setIsViewList(false);
  };
  return (
    <VStack>
      {isViewList && adventurerData.length > 1 ? (
        // リスト表示は冒険者が複数あるときのみ
        <AdventurerList
        viewAdventurerDetail={viewAdventurerDetail}
        />
      ) : (
        <AdventurerDetail
          index={selectedAdventurerIndex}
          setIsViewList={setIsViewList}
        />
      )}
    </VStack>
  );
};
