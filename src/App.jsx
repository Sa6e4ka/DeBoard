import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Registration from "./pages/Board";
import CreateAdd from "./pages/Create";
import Messenger from "./pages/Messanger";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/create" element={<CreateAdd />} />
        <Route path="/messenger" element={<Messenger />} />
      </Routes>
    </Router>
  );
}
