import React from 'react';
import axios from 'axios';

const DeleteUser = ({ userId, onDeleteUser }) => {
    const handleDeleteUser = () => {
        // Excluir usuário
        axios.delete(`http://localhost:3001/api/v2/users/${userId}`)
            .then(response => {
                onDeleteUser(userId);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div>
            <h2>Excluir Usuário</h2>
            <button onClick={handleDeleteUser}>Excluir Usuário</button>
        </div>
    );
};

export default DeleteUser;
