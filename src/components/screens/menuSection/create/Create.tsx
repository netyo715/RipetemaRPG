import { Card, Container, ScrollArea, Text, VStack } from "@yamada-ui/react";
import { RECIPES } from "../../../../data/recipe";
import { GEAR_INFO } from "../../../../data/gear";
import { ITEM_NAME } from "../../../../data/item";

export const Create: React.FC = () => {
  return (
    <Container h="full" p="sm">
      <ScrollArea type="always" p="sm" innerProps={{ as: VStack }}>
        {RECIPES.map((recipe) => {
          return (
            <Card p="sm">
              <Text>{GEAR_INFO[recipe.product].name}</Text>
              {recipe.materials.map((material) => {
                return (
                  <Text>
                    {ITEM_NAME[material.itemId]} {material.amount}個
                  </Text>
                );
              })}
              <Text>{recipe.price}ゴールド</Text>
            </Card>
          );
        })}
      </ScrollArea>
    </Container>
  );
};
