import { Access, CreateNews, Home, News } from './pages';
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PrivateRouteAdmin } from './components';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Access/>}/>
        <Route path="/home" element={<PrivateRoute component={<Home/>}/>}/>
        <Route path="/home/news" element={<PrivateRoute component={<News/>}/>}/>
        <Route path="/home/news/post" element={<PrivateRouteAdmin component={<CreateNews/>} />}/>
      </Routes>
      </div>
  );
}

export default App;
