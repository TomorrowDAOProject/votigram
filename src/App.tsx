import { useState } from "react";
import "./App.css";
// import SceneLoading from "./components/SceneLoading";
import { TAB_LIST } from "./constants/navigation";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import ForYou from "./components/ForYou";

const App = () => {
  const [activeTab, setActiveTab] = useState(TAB_LIST.HOME);
  // return <SceneLoading />;

  // return <Navigation activeTab={activeTab} onMenuClick={setActiveTab} />;

  return (
    <>
      {activeTab === TAB_LIST.HOME && <Home />}
      {activeTab === TAB_LIST.FOR_YOU && <ForYou />}
      <Navigation activeTab={activeTab} onMenuClick={setActiveTab} />
    </>
  );
};

export default App;
