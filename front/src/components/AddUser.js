// AddUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const AddUser = ({ onUserAdded, selectedUser }) => {
    const [user, setUser] = useState({
        login: '',
        senha: '',
        nome: '',
        email: '',
        roles: '',
        numero: '',
    });

    const isEditing = !!selectedUser;

    useEffect(() => {
        if (isEditing) {
            setUser(selectedUser);
        } else {
            setUser({
                login: '',
                senha: '',
                nome: '',
                email: '',
                roles: '',
                numero: '',
            });
        }
    }, [selectedUser, isEditing]);

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleUserAction = () => {
        const apiUrl = isEditing
            ? `http://localhost:3001/api/v2/users/${user.id}`
            : 'http://localhost:3001/api/v2/users';

        const httpMethod = isEditing ? 'put' : 'post';

        axios[httpMethod](apiUrl, user)
            .then((response) => {
                onUserAdded(response.data.user);
                setUser({
                    login: '',
                    senha: '',
                    nome: '',
                    email: '',
                    roles: '',
                    numero: '',
                });
            })
            .catch((error) => {
                console.error(`Error ${isEditing ? 'updating' : 'adding'} user:`, error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <StyledPaper elevation={3}>
                <Typography component="h2" variant="h5">
                    {isEditing ? 'Atualizar Usuário' : 'Adicionar Usuário'}
                </Typography>
                <StyledForm noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        value={user.login}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type="password"
                        id="senha"
                        value={user.senha}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="nome"
                        label="Nome"
                        id="nome"
                        value={user.nome}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        id="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="roles"
                        label="Roles"
                        id="roles"
                        value={user.roles}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="numero"
                        label="Número"
                        id="numero"
                        value={user.numero}
                        onChange={handleInputChange}
                    />
                    <StyledButton
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleUserAction}
                    >
                        {isEditing ? 'Atualizar Usuário' : 'Adicionar Usuário'}
                    </StyledButton>
                </StyledForm>
            </StyledPaper>
        </Container>
    );
};

export default AddUser;
