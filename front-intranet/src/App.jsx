import { Access, Home } from './pages';
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from './components';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Access/>}/>
        <Route path="/home" element={<PrivateRoute component={<Home/>}/>}/>
      </Routes>
      </div>
  );
}

export default App;
