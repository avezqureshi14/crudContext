import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Update from './components/Update';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <div className="App">
          <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/add' element={<Create/>} />
              <Route path="/update/:id" element={<Update />}></Route>
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </BrowserRouter>
    </div>  
  );
}

export default App;
