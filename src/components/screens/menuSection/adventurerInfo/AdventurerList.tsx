import { Card, Heading, Text, VStack } from "@yamada-ui/react";
import { useAdventurerData } from "../../../../contexts/UserDataProvider";
import { JOB_NAME } from "../../../../data/job";

export const AdventurerList: React.FC<{
  viewAdventurerDetail: (index: number) => void;
}> = ({ viewAdventurerDetail }) => {
  const adventurerData = useAdventurerData();
  return (
    <VStack p="md">
      {adventurerData.map((adv, index) => {
        return (
          <Card
            p="sm"
            cursor="pointer"
            onClick={() => viewAdventurerDetail(index)}
          >
            <Heading>
              LV {adv.level} {adv.name}
            </Heading>
            <Text>
              LV {adv.jobInfo[adv.currentJobId]!.level}{" "}
              {JOB_NAME[adv.currentJobId]}
            </Text>
          </Card>
        );
      })}
    </VStack>
  );
};
