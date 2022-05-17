import { Access, Admin, Chat, Home, News, Projects } from './pages';
import { Routes, Route } from "react-router-dom";
import { Navbar, PrivateRoute, PrivateRouteAdmin } from './components';
import {connect} from 'react-redux';
import './App.scss';
import { useEffect } from 'react';
import { checkUserSession } from './redux/actions/auth.actions';

function App({user, dispatch}) {

  useEffect(() =>{
    dispatch(checkUserSession());
  }, []);
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
};

const mapStateToProps = (state) =>({
  user: state.auth.user
})

export default connect(mapStateToProps)(App);
