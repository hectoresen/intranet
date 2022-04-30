import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../redux/actions/auth.actions';
import './Access.scss';

const Access = ({dispatch, user, error}) => {

  const [needToRegister, setNeedToRegister] = useState(false);
  const [formData, setFormData] = useState({name:'', password: ''});
  const navigate = useNavigate();

  const handleInput = (ev) =>{
    const {name, value} = ev.target;
    setFormData({...formData, [name]: value});
  }

  const loginSubmit = (ev) =>{
    ev.preventDefault();
    dispatch(loginUser(formData));
    setFormData({name: '', password: ''});
    navigate('/home');
  }

  const registerSubmit = (ev) =>{
    ev.preventDefault();
    dispatch(registerUser(formData));
    setFormData({name: '', password: ''});
    setNeedToRegister(!needToRegister);
    navigate('/home');
  };

  return (
    <div className='access'>
      {(error) ? <p className='access__error'>Credenciales incorrectas</p> : ''}
      {(!needToRegister)
      ?
      <Container  className="access__form" component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Inicio de sesión
            </Typography>
            <Box component="form" onSubmit={loginSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre de usuario"
                name="name"
                type='text'
                autoFocus
                onChange={handleInput}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={handleInput}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                id="btn"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    <h5 onClick={() =>{
                      setNeedToRegister(!needToRegister)
                      setFormData({name: '', password: ''});
                      }}
                      >Necesito registrarme
                    </h5>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      :
      <Container className="access__form" component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Formulario de registro
            </Typography>
            <Box component="form" onSubmit={registerSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre de usuario"
                name="name"
                type='text'
                autoFocus
                onChange={handleInput}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={handleInput}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarme
              </Button>
            </Box>
          </Box>
        </Container>
      }
    </div>
  )
}

const mapStateToProps = (state) =>({
  user: state.auth.user,
  error: state.auth.error
});

export default connect(mapStateToProps)(Access);