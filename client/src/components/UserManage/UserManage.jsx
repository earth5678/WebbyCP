import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="user-info-cell">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={user.image}
            alt={`Avatar for ${user.name}`}
            style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '10px' }}
          />
          <div>
            <p style={{ marginBottom: '1px', fontWeight: 'bold' }}>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </td>
      <td>{user.dateOfBirth}</td>
      <td>{user.diabetesType}</td>
      <td>
        <button onClick={() => onEdit(user)}>Edit</button>
      </td>
      <td>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </td>
    </tr>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (user) => {
    // Implement edit logic here
    console.log('Edit user:', user);
  };

  const handleDelete = async (userId) => {
    // Implement delete logic here
    console.log('Delete user with ID:', userId);
    // You can make an API call to delete the user
    // Update the users state accordingly
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
          <th>Diabetes Type</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  );
};


export default UserList;
