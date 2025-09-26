import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap";
import "./App.css";
import Button from "./components/Button";
import api from "./api";

import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState<any>(null);

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
      const userData = await api.get("/auth/userdata");
      console.log(userData);
      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div>Unofficial Anilist App</div>
      {!userData && <Button onClick={fetchLogin}>Login</Button>}
    </>
  );
}

export default App;
