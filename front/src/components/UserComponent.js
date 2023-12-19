import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserComponent = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({});
    const token = sessionStorage.getItem('token'); 

    useEffect(() => {
         axios.get('http://localhost:3001/api/v2/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [token]);

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        axios.post('http://localhost:3001/api/v2/users', newUser, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setUsers([...users, response.data.user]);
                setNewUser({});
            })
            .catch(error => {
                console.error('Error adding user:', error);
            });
    };

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.nome}</li>
                ))}
            </ul>
            <div>
                <h3>Add User</h3>
                <input type="text" name="nome" placeholder="Name" onChange={handleInputChange} />
                <button onClick={handleAddUser}>Add User</button>
            </div>
        </div>
    );
};

export default UserComponent;
