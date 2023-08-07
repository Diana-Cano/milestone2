import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import CategoryPage from "./Components/CategoryPage";
import ListPage from "./Components/ListPage";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/:name" element={<CategoryPage/>}/>
        <Route path="/:name/:id" element={<ListPage/>}/>
        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;