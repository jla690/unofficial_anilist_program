import { useState } from "react";
import "bootstrap";
import "./App.css";
import api from "./api";
import { useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search";
import Lists from "./components/Lists";

interface UserData {
  about: string;
  id: number;
  bannerImage: string;
  name: string;
  avatar: {
    medium: string;
  };
}

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchLogin = async () => {
    const currPath = window.location.href;
    console.log(currPath);
    try {
      const loginResponse = await api.get("/auth/login");
      const url = loginResponse.data["url"];
      window.location.href = url;
      const callbackResponse = await api.get("/auth/callback", {
        params: { redirect: currPath },
      });
      console.log(callbackResponse);
    } catch (error) {
      console.log(error);
    }
  };

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

  console.log(userData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={userData}></Home>}></Route>
        <Route
          path="/search"
          element={<Search user={userData}></Search>}
        ></Route>
        <Route path="/lists" element={<Lists user={userData}></Lists>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
