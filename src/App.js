import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blocks from "./components/blocks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blocks />} />
      </Routes>
    </Router>
  );
}

export default App;
