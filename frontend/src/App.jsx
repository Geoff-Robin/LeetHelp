import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "@/pages/LandingPage";
import { ThemeProvider } from "./context/ThemeProvider";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
