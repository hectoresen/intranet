import { Access, Admin, Chat, Home, News, Projects } from './pages';
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
        <Route path="/home/admin" element={<PrivateRouteAdmin component={<Admin/>} />}/>
        <Route path="/home/projects" element={<PrivateRoute component={<Projects/>}/>}/>
        <Route path="/home/chat" element={<PrivateRoute component={<Chat/>}/>}/>
      </Routes>
      </div>
  );
}

export default App;
