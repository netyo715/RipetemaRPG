import React from "react";
import { Button } from "@yamada-ui/react";
import { useUpdateUserData } from "../../../../contexts/DataManageProvider";
import { JobId } from "../../../../data/job";
import { GearId } from "../../../../data/gear";

export const Debug: React.FC = () => {
  console.log("render debug");
  const { loadUserData } = useUpdateUserData();
  return (
    <>
      <Button
        onClick={() => loadUserData(debugAdventurerData, [], {}, { gold: 0 })}
      >
        冒険者2人
      </Button>
    </>
  );
};

const debugAdventurerData = [
  {
    index: 0,
    name: "冒険者１",
    currentJobId: JobId.冒険者,
    equippedGear: {
      weapon: GearId.木刀,
      shield: null,
      head: null,
      body: null,
      arm: null,
      leg: null,
      other: null,
    },
    experience: 1,
    level: 90,
    jobInfo: { [JobId.冒険者]: { level: 50, experience: 0 } },
  },
  {
    index: 1,
    name: "冒険者２",
    currentJobId: JobId.戦士,
    equippedGear: {
      weapon: null,
      shield: null,
      head: null,
      body: null,
      arm: null,
      leg: null,
      other: null,
    },
    experience: 1,
    level: 5,
    jobInfo: { [JobId.戦士]: { level: 1, experience: 0 } },
  },
];
