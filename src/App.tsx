import { Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/home";

const App = () => {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;
