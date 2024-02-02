import {
  CloseButton,
  Divider,
  Flex,
  HStack,
  Heading,
  ScrollArea,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useAdventurerData } from "../../../../contexts/UserDataProvider";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { JOB_NAME, getJobRequiredExperience } from "../../../../data/job";
import { getAdventurerStatus } from "../../../../scripts/adventurer";
import { getRequiredExperience } from "../../../../data/adventurer";
import { GEAR_INFO } from "../../../../data/gear";

export const AdventurerDetail: React.FC<{
  index: number;
  setIsViewList: Dispatch<SetStateAction<Boolean>>;
}> = ({ index, setIsViewList }) => {
  const adventurerData = useAdventurerData();
  const adv = adventurerData[index];
  const job = adv.jobInfo[adv.currentJobId]!;
  const status = getAdventurerStatus(adv);
  return (
    <Flex direction="column" h="full" gap="md">
      <HStack flexShrink="0">
        <Heading>{adv.name}</Heading>
        <Spacer />
        {adventurerData.length > 1 && (
          <CloseButton onClick={() => setIsViewList(true)} />
        )}
      </HStack>
      <ScrollArea p="md" type="always" innerProps={{ as: VStack, minH: 0 }}>
        <SpacingRow>
          <Text>レベル</Text>
          <Text>{adv.level}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>次のレベルまで</Text>
          <Text>あと {getRequiredExperience(adv.level) - adv.experience}</Text>
        </SpacingRow>
        <Divider variant="solid" />
        <SpacingRow>
          <Text>職業</Text>
          <Text>{JOB_NAME[adv.currentJobId]}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>レベル</Text>
          <Text>{job.level}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>次のレベルまで</Text>
          <Text>
            あと{" "}
            {getJobRequiredExperience(adv.currentJobId, job.level) -
              job.experience}
          </Text>
        </SpacingRow>
        <Divider variant="solid" />
        <Text>装備</Text>
        <SpacingRow>
          <Text>武器</Text>
          <Text>
            {adv.equippedGear.weapon
              ? GEAR_INFO[adv.equippedGear.weapon].name
              : "なし"}
          </Text>
        </SpacingRow>
        <SpacingRow>
          <Text>盾</Text>
          <Text>
            {adv.equippedGear.shield
              ? GEAR_INFO[adv.equippedGear.shield].name
              : "なし"}
          </Text>
        </SpacingRow>
        <SpacingRow>
          <Text>頭</Text>
          <Text>
            {adv.equippedGear.head
              ? GEAR_INFO[adv.equippedGear.head].name
              : "なし"}
          </Text>
        </SpacingRow>
        <SpacingRow>
          <Text>体</Text>
          <Text>
            {adv.equippedGear.body
              ? GEAR_INFO[adv.equippedGear.body].name
              : "なし"}
          </Text>
        </SpacingRow>
        <SpacingRow>
          <Text>腕</Text>
          <Text>
            {adv.equippedGear.arm
              ? GEAR_INFO[adv.equippedGear.arm].name
              : "なし"}
          </Text>
        </SpacingRow>
        <SpacingRow>
          <Text>脚</Text>
          <Text>
            {adv.equippedGear.leg
              ? GEAR_INFO[adv.equippedGear.leg].name
              : "なし"}
          </Text>
        </SpacingRow>
        <SpacingRow>
          <Text>その他</Text>
          <Text>
            {adv.equippedGear.other
              ? GEAR_INFO[adv.equippedGear.other].name
              : "なし"}
          </Text>
        </SpacingRow>
        <Divider variant="solid" />
        <Text>ステータス</Text>
        <SpacingRow>
          <Text>HP</Text>
          <Text>{status.hp}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>ATK</Text>
          <Text>{status.atk}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>DEF</Text>
          <Text>{status.def}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>MAT</Text>
          <Text>{status.mat}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>MDF</Text>
          <Text>{status.mdf}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>SPD</Text>
          <Text>{status.spd}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>HST</Text>
          <Text>{status.hst}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>CRT</Text>
          <Text>{status.crt}</Text>
        </SpacingRow>
        <SpacingRow>
          <Text>HAT</Text>
          <Text>{status.hat}</Text>
        </SpacingRow>
      </ScrollArea>
    </Flex>
  );
};

const SpacingRow: React.FC<{ children: ReactNode[] }> = ({ children }) => {
  return (
    <HStack mx="md" m="0">
      {children[0]}
      <Spacer />
      {children.slice(1)}
    </HStack>
  );
};
