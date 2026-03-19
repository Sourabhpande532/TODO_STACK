import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginRegister from "./components/LoginRegister";

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
          <Route path='/' element={<LoginRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
