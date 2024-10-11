import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Auth from "./Pages/Auth";
import Chat from "./Pages/Chat";
import NotFound from "./Pages/404";
import Profile from "./Pages/Profile";
import useAppStore from "./store/slices/store";
import { useEffect, useState } from "react";
import { apiClient } from "./libs/ApiClient";
import { USER_INFO_ROUTE } from "./utils/Constants";

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState();

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to={"/"} />;
  };

  const AuthRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to={"/chat"} /> : children;
  }; 

  useEffect(() => {
    const getUserInfo = async () => {
      if (userInfo) return;

      setLoading(true);
      try {
        const response = await apiClient.get(USER_INFO_ROUTE, {
          withCredentials: true,
        });
        setUserInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loding.....</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path={"/chat"}
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path={"/profile"}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
