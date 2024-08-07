import { ThemeContextProvider } from "./context/ThemeContext";
import { useState, useEffect } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { checkAuth } from "./api/authApi";
import Header from "./components/Header";
import Search from "./components/Search";
import Result from "./components/Result";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await checkAuth();
        setIsAuthenticated(data.isAuthenticated);
        setUser(data.user);
      } catch (e) {
        console.error("Error checking authentication:", e);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <ThemeContextProvider>
      <Router>
        <Header
          isAuthenticated={isAuthenticated}
          user={user}
          setIsAuthenticated={setIsAuthenticated}
          setUser={setUser}
        />{" "}
        <Routes>
          <Route
            path="/"
            element={<Search isAuthenticated={isAuthenticated} />}
          />
          <Route path="/result" element={<Result />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
