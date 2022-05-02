import { Access, Home, News } from './pages';
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from './components';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Access/>}/>
        <Route path="/home" element={<PrivateRoute component={<Home/>}/>}/>
        <Route path="/home/news" element={<PrivateRoute component={<News/>}/>}/>
      </Routes>
      </div>
  );
}

export default App;
