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

const Access = ({dispatch, user, error, ...props}) => {

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

  return (
    <div className='access'>
      <img className='accimg' src="https://media.discordapp.net/attachments/964479986855706624/972916767867416606/Blue_Gradient_Programmer_LinkedIn_Banner.png?width=782&height=235"></img>
      {(error) ? <p className='access__error'>Credenciales incorrectas</p> : ''}
      {(props.Denied) ? <p className='access__error'>Debes iniciar sesión para acceder</p> : ''}
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
              Iniciar sesión
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
                      Un administrador le dará acceso a nuestra plataforma
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    </div>
  )
}

const mapStateToProps = (state) =>({
  user: state.auth.user,
  error: state.auth.error
});

export default connect(mapStateToProps)(Access);