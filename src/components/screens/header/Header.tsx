import { HStack, Heading, Tag } from "@yamada-ui/react";
import { GAME_VERSION } from "../../../data/game";

export const Header: React.FC = () => {
  return (
    <HStack h="48px" w="full" boxShadow="sm" px="xl" bg="white">
      <Heading>Repetema RPG</Heading>
      <Tag colorScheme="blackAlpha">version {GAME_VERSION}</Tag>
    </HStack>
  );
};
