import { useAdventurerData } from "../../../../contexts/UserDataProvider";

export const AdventurerInfo: React.FC = () => {
  const adventurerData = useAdventurerData();
  return (
    <>
      <p>{adventurerData[0].name}</p>
    </>
  );
};
