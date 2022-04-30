import React from 'react';
import {Events, Navbar} from '../../components';
import {connect} from 'react-redux';
import { Card, Button } from '@nextui-org/react';
import './Home.scss';

const Home = ({user}) => {

  return (
    <div className='home'>
      <div className='home__navbar'>
        <Navbar />
      </div>
      <div className='home__container'>
        <div className='home__container-header'>
          <div className='home__container-header-text'>
            <h3>Bienvenido, {user.name}!</h3>
          </div>
        </div>
        {/* CONTAINER TODO */}
        <Events/>
      </div>
    </div>
  )
}
const mapStateToProps = (state) =>({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Home);