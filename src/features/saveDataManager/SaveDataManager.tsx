import { ReactNode, useContext, useEffect, useState } from "react";
import { DispatchContext } from "../../contexts/Master";

export default function SaveDataManager({children}: {children: ReactNode}){
  const masterDataDispatcher = useContext(DispatchContext)!;
  const [_, setAutoSaveInterval] = useState<NodeJS.Timer|null>(null);
  
  useEffect(() => {
    try{
      const localDataString = localStorage.getItem("repetemaRPGData");
      if(localDataString===null) return () => {};
      
      // TODO 生のJSONじゃなくする
      const localData = JSON.parse(localDataString);
      const convertedLocalData = localData;

      masterDataDispatcher({
        type: "initialize",
        data: convertedLocalData,
      }); 
      return () => {};
    }catch{
      console.error("load save error");
      return () => {};
    }finally{
      setAutoSaveInterval(setInterval(saveData, 15000));
    }
  }, []);

  const saveData = () => {
    masterDataDispatcher({
      type: "saveToLocalStorage",
    });
  };

  return <>{children}</>;
}