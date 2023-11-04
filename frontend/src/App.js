import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Update from "./components/Update";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import Signup from "./components/Register";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/add" element={<Create />} />
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
