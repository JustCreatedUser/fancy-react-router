import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      <Header key="header" />
      <main>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/projects" element={<h1>Projects</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
