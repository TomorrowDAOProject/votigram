import { useState } from "react";
import "./App.css";
// import SceneLoading from "./components/SceneLoading";
import { TAB_LIST } from "./constants/navigation";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Discover from "./components/Discover";

const App = () => {
  const [activeTab, setActiveTab] = useState(TAB_LIST.HOME);
  // return <SceneLoading />;

  // return <Navigation activeTab={activeTab} onMenuClick={setActiveTab} />;

  return (
    <>
      {activeTab === TAB_LIST.HOME && <Home />}
      {activeTab === TAB_LIST.DISCOVER && <Discover />}
      <Navigation activeTab={activeTab} onMenuClick={setActiveTab} />
    </>
  );
};

export default App;
