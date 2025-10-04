import { useState, useEffect } from "react";

import "./App.css";
import api from "./api";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Lists from "./components/Lists";
import type { User } from "./types";
import MediaDetail from "./components/MediaDetail";

function App() {
  const [userData, setUserData] = useState<User | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/userdata");
      setUserData(response.data["user"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={userData}></Home>}></Route>
        <Route
          path="/search"
          element={<Search user={userData}></Search>}
        ></Route>
        <Route path="/lists" element={<Lists user={userData}></Lists>}></Route>
        <Route
          path="/media_detail/:media_id"
          element={<MediaDetail user={userData}></MediaDetail>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
