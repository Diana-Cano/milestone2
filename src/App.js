import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Categories from "./components/Categories";
import CategoryPage from "./components/CategoryPage";
import ListPage from "./components/ListPage";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [categories, setCategories] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/categories`)
      const data = await response.json()
      setCategories(data);
    }
    fetchCategoryData();
    const fetchListData = async () => {
      const response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/lists/category/all`)
      const data = await response.json()
      setLists(data);
    }
    fetchListData();
  }, []);

  let categoryRoutes = categories.map((category, index) => {
    return (
      <Route key={index} path={`/${category.name}`} element={<CategoryPage category={category}/>}/>
    )
  });

  let listRoutes = lists.map((list, index) => {
    return (
      <Route key={index} path={`/:category/${list.list_id}`} element={<ListPage list={list}/>}/>
    )
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Categories categories={categories}/>}/>
        {categoryRoutes}
        {listRoutes}
        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;