// Shree Ganesh
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Addcategory from "./components/Addcategory";
import Listcategory from "./components/Listcategory";
import Singlecategory from "./components/Singlecategory";
import Editcategory from "./components/Editcategory";
import Addfood from "./components/Addfood";
import Listfoodmenu from "./components/Listfoodmenu";
import Viewfoodmenu from "./components/Viewfoodmenu";
import Editfoodmenu from "./components/Editfoodmenu";

import Notfound from "./components/Notfound";
import Login from "./components/Login";
import Private from "./components/Private";
import Layout from "./components/global/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Private />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="addcategory" element={<Addcategory />} />
        <Route path="listcategory" element={<Listcategory />} />
        <Route path="listcategory/:id" element={<Singlecategory />} />
        <Route path="editcategory/:id" element={<Editcategory />} />
        <Route path="addfood" element={<Addfood />} />
        <Route path="listfoodmenu" element={<Listfoodmenu />} />
        <Route path="viewfoodmenu/:id" element={<Viewfoodmenu />} />
        <Route path="editfoodmenu/:id" element={<Editfoodmenu />} />
        <Route path="*" element={<Notfound />} />
      </Route>

      <Route path="login" element={<Login />} />
    </Routes>
  );
}
