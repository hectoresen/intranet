import React from 'react';
import {Events, Navbar} from '../../components';
import {connect} from 'react-redux';
import { Card, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';


const Home = ({user}) => {
  const navigate = useNavigate();

  const adminProfile = (ev) =>{
    ev.preventDefault();
    navigate('/home/admin');
  }

  return (
    <div className='home'>
      <div className='home__navbar'>
        <Navbar />
      </div>
          {(user.role === "admin")
                    ?
                    <div className='isAdm'>
                      <Button
                          type="submit"
                          margin="10px"
                          variant="contained"
                          color="warning"
                          onClick={adminProfile}
                          sx={{ mt: 3, mb: 2 }}
                          >
                          Administración
                      </Button>
                    </div>

                    :
                    ''
            }
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