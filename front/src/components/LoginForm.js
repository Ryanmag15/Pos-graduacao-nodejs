import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  marginTop: (theme) => theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledForm = styled('form')({
  width: '100%', 
  marginTop: (theme) => theme.spacing(1),
});

const StyledButton = styled(Button)({
  margin: (theme) => theme.spacing(3, 0, 2),
});

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    login: '',
    senha: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      // Se houver um token na sessionStorage, realiza o login
      onLogin(token);
    }
  }, [onLogin]);

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('http://localhost:3001/api/apiSeg/login', credentials);

      const { token } = response.data;

      // Salva o token na sessionStorage
      sessionStorage.setItem('token', token);

      // Chama a função onLogin com o token
      onLogin(token);
    } catch (error) {
      if (error.response) {
        console.log('Server Error:', error.response.data);
      } else if (error.request) {
        console.log('No Response from Server:', error.request);
      } else {
        console.log('Request Setup Error:', error.message);
      }
      setError('Erro ao tentar fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <StyledForm onSubmit={(e) => e.preventDefault()}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Username"
            name="login"
            value={credentials.login}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Password"
            type="password"
            id="senha"
            value={credentials.senha}
            onChange={handleInputChange}
          />
          {loading ? (
            <CircularProgress style={{ marginTop: '16px' }} />
          ) : (
            <StyledButton
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </StyledButton>
          )}
          {error && (
            <Typography variant="body2" color="error" align="center" style={{ marginTop: '8px' }}>
              {error}
            </Typography>
          )}
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default LoginForm;
