import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/LoginRegister";


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginRegister/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
