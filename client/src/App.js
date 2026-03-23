import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginRegister from "./components/LoginRegister";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import Sidebar from "./components/sidebar/Sidebar";
import Project from "./pages/Project";
import Report from "./pages/Report";
import { useAuth } from "./context/authContext";

function Layout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const hideSidebar = location.pathname === "/signin";

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      {isAuthenticated && !hideSidebar && <Sidebar />}

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: isAuthenticated && !hideSidebar ? "220px" : "0",
          padding: "20px",
        }}>
        <Routes>
          <Route path='/signin' element={<LoginRegister />} />

          <Route
            path='/'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path='/project'
            element={
              <PrivateRoute>
                <Project />
              </PrivateRoute>
            }
          />

          <Route
            path='/report'
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Layout />
    </BrowserRouter>
  );
}

export default App;
