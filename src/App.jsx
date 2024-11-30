import { BrowserRouter, Route, Routes } from "react-router-dom";
import RemoveBackground from "./Components/RemoveBackground.jsx";
import Navbar from "./Components/Navbar.jsx";
import BatteryStatus from "./Components/BatteryStatus.jsx";
// import RandomUserData from "./Components/RandomUserData.jsx";
import ImageGenerator from "./Components/ImageGenerator.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/clipdropapi" element={<RemoveBackground />} />
          <Route path="/batteryapi" element={<BatteryStatus />} />
          {/* <Route path="/fakerapi" element={<RandomUserData />} /> */}
          <Route path="/unsplashapi" element={<ImageGenerator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
