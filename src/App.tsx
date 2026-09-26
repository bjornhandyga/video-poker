import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { GamePage } from "./pages/GamePage";
import { PlayersPage } from "./pages/PlayersPage";
import { RulesPage } from "./pages/RulesPage";

/** Rot-komponent med React Router og tre hovedskjermbilder. */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GamePage />} />
          <Route path="regler" element={<RulesPage />} />
          <Route path="spillere" element={<PlayersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
