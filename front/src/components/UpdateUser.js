import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUser = ({ userId, onUpdateUser, token }) => {
    const [userData, setUserData] = useState({
        login: '',
        senha: '',
        nome: '',
        email: '',
        roles: '',
        numero: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/v2/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again.');
                setLoading(false);
            });
    }, [userId, token]);

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateUser = () => {
        axios.put(`http://localhost:3001/api/v2/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                onUpdateUser(response.data.user);
            })
            .catch(error => {
                console.error('Error updating user:', error);
                setError('Error updating user. Please try again.');
            });
    };

    return (
        <div>
            {loading && <p>Loading user data...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <>
                    <h2>Atualizar Usuário</h2>
                    <div>
                        <label>Login:</label>
                        <input
                            type="text"
                            name="login"
                            value={userData.login}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            value={userData.senha}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={userData.nome}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Roles:</label>
                        <input
                            type="text"
                            name="roles"
                            value={userData.roles}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Número:</label>
                        <input
                            type="text"
                            name="numero"
                            value={userData.numero}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={handleUpdateUser}>Atualizar Usuário</button>
                </>
            )}
        </div>
    );
};

export default UpdateUser;
