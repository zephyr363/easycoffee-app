import { Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/home";
import MenuScreen from "./pages/menu";
import CardDetailScreen from "./pages/card-detail";

const App = () => {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/menu" element={<MenuScreen />} />
      <Route path="coffees/:id" element={<CardDetailScreen />} />
    </Routes>
  );
}

export default App;
