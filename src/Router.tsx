import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/home-index";
import { History } from "./pages/History/history-index";
import { DefaultLayout } from "./layouts/DefaultLayout/default-layout-index";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
