import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginRegister from "./components/LoginRegister";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Toaster
          position='top-right'
          toastOptions={{
            style: {
              fontSize: "1.4rem",
            },
          }}
        />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
