import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import Home from "@/pageComponents/Home";
import CreatePoll from "@/pageComponents/CreatePoll";
import PollDetail from "@/pageComponents/PollDetail";

const routes = [
  {
    path: "/",
    Component: Home,
    title: "Home",
  },

  {
    path: "/create-poll",
    Component: CreatePoll,
    title: "Create Poll",
  },

  {
    path: "/proposal/:proposalId",
    Component: PollDetail,
    title: "Poll Detail",
  },
];

const AppRoutes: React.FC = () => {
  const lp = useLaunchParams();
  return (
    <AppRoot
      appearance="dark"
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppRoot>
  );
};

export default AppRoutes;
