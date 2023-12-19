// App.js
import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';
import LoginForm from './components/LoginForm';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [authenticated, setAuthenticated] = useState(!!sessionStorage.getItem('token'));
  const [selectedUser, setSelectedUser] = useState(null);

  const baseUrl = "https://api-node-gq73.onrender.com"
  
  useEffect(() => {
    if (authenticated) {
      const token = sessionStorage.getItem('token');
      if (token) {
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
      }
    }
  }, [authenticated]);

  const handleUserAdded = (user) => {
    setUsers([...users, user]);
  };

  const handleUserUpdated = (user) => {
    setUsers(users.map(u => (u.id === user.id ? user : u)));
  };

  const handleLogin = (token) => {
    sessionStorage.setItem('token', token);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUsers([]);
    setSelectedUserId(null);
    setAuthenticated(false);
    setSelectedUser(null);
  };

  const handleUserDeleted = (userId) => {
    const token = sessionStorage.getItem('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.delete(`http://localhost:3001/api/v2/users/${userId}`, axiosConfig)
      .then(response => {
        const deletedUser = response.data.user;
        console.log(`User with ID ${deletedUser.id} deleted successfully.`);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h1>Main Page</h1>
      {authenticated ? (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
            <UserList
              token={sessionStorage.getItem('token')}
              onUserUpdated={handleUserUpdated}
              onUserDeleted={handleUserDeleted}
              onUserSelected={(user) => setSelectedUser(user)}
            />
          </Grid>
          <Grid item xs={3}>
            <AddUser
              onUserAdded={handleUserAdded}
              selectedUser={selectedUser}
            />
          </Grid>
          <Grid item xs={3}>
            {selectedUserId && (
              <UpdateUser
                userId={selectedUserId}
                onUpdateUser={handleUserUpdated}
              />
            )}
          </Grid>
          <Grid item xs={3}>
            {selectedUserId && (
              <DeleteUser
                userId={selectedUserId}
                onDeleteUser={handleUserDeleted}
              />
            )}
          </Grid>
        </Grid>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
