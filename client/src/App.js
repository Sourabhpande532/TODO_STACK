import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginRegister from "./components/LoginRegister";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import Sidebar from "./components/sidebar/Sidebar";
import Project from "./pages/Project";
import Report from "./pages/Report";

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Toaster
          position='top-right'
          toastOptions={{
            style: {
              fontSize: "1.4rem",
            },
          }}
        />
        <Sidebar />
        <Routes>
          {/* PUBLIC ROUTES */}
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
          <Route path='/report' element={<Report />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
