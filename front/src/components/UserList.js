// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = ({ token, onUserUpdated, onUserDeleted, onUserSelected }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!token) {
            console.error('Token not available.');
            return;
        }

        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.get('http://localhost:3001/api/v2/users', axiosConfig)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [token]);

    const handleEditClick = (userId) => {
        if (onUserUpdated) {
            onUserUpdated(userId);
            const selectedUser = getUserById(userId);
            onUserSelected(selectedUser);
        }
    };

    const handleDeleteClick = (userId) => {
        if (onUserDeleted) {
            onUserDeleted(userId);
        }
    };

    const getUserById = (userId) => {
        return users.find(user => user.id === userId);
    };

    return (
        <div>
            <h2>Lista de Usuários</h2>
            <List>
                {users.map(user => (
                    <Card key={user.id} variant="outlined" style={{ marginBottom: '10px' }}>
                        <CardContent>
                            <Typography variant="h6">
                                {user.login}
                            </Typography>
                            <Typography variant="subtitle1">
                                Nome: {user.nome}
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                onClick={() => handleEditClick(user.id)}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeleteClick(user.id)}
                                style={{ marginLeft: '10px' }}
                            >
                                Excluir
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </div>
    );
};

export default UserList;
