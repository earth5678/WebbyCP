// AddUser.js

import React, { useState } from 'react';
import axios from 'axios';

const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';

const AddUser = ({ onAddUser }) => {
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    image: defaultImage, // Set default image URL
    dateOfBirth: '',
    weight: '',
    height: '',
    diabetesType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users', newUserData);
      console.log(response.data);

      setNewUserData({
        name: '',
        email: '',
        password: '',
        image: defaultImage, // Reset to default image URL
        dateOfBirth: '',
        weight: '',
        height: '',
        diabetesType: '',
      });

      if (onAddUser) {
        onAddUser(response.data);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newUserData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={newUserData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={newUserData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={newUserData.dateOfBirth}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Weight:
          <input
            type="text"
            name="weight"
            value={newUserData.weight}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Height:
          <input
            type="text"
            name="height"
            value={newUserData.height}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Diabetes Type:
          <input
            type="text"
            name="diabetesType"
            value={newUserData.diabetesType}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={addUser}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
