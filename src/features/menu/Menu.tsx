import { ReactNode, useState, Children, isValidElement } from "react";
import Debug from "./menu_contents/debug/Debug";
import "./Menu.css";
import CharctersTab from "./menu_contents/characters/Characters";

export default function Menu() {
  return (
    <MenuWrapper>
      <TabContent tabName="キャラクター"><CharctersTab/></TabContent>
      <TabContent tabName="デバッグ"><Debug/></TabContent>
      <TabContent tabName="テストタブ"><p>あいうえお</p></TabContent>
    </MenuWrapper>
  );
}

function MenuWrapper({children}: {children: ReactNode}){
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return(
    <div className="Menu">
      <div className="Menu_tab-list">
        {Children.map(children, (child, index) => (
          <div
            className={index === activeTabIndex ? "Menu_tab selected" : "Menu_tab"}
            onClick={() => setActiveTabIndex(index)}
          >
            {isValidElement(child) && child.props.tabName}
          </div>
        ))}
      </div>
      <div className="Menu_tab-content">
        {Children.toArray(children).filter(
          (_, index) => index === activeTabIndex
        )}
      </div>
    </div>
  )
}

type TabContentProps = {
  tabName: string;
  children: React.ReactNode;
}

function TabContent({tabName, children}: TabContentProps){
  return <div>{children}</div>
}