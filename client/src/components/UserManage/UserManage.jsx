import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import AddUser from './AddUser'; // Import the AddUser component

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    email: '',
    weight: '',
    height: '',
    dateOfBirth: '',
    diabetesType: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  // Function to handle adding a user and refreshing the user list
  const handleAddUser = (addedUserData) => {
    closeAddUserModal();
    fetchData(); // Fetch updated user data
  };

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

  const updateUser = async () => {
    try {
      const url = `http://localhost:8080/api/users/${editingUserId}`;
      const response = await axios.put(url, editedUserData);
      // Handle the response as needed
      console.log(response.data);
      setEditingUserId(null);
      setIsModalOpen(false);
      fetchData(); // Fetch updated user data
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this user?');

    if (!confirmDeletion) {
      return;
    }

    try {
      const url = `http://localhost:8080/api/users/${userId}`;
      const response = await axios.delete(url);
      // Handle the response as needed
      console.log(response.data);
      fetchData(); // Fetch updated user data
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = (user) => {
    setEditingUserId(user._id);
    setEditedUserData({
      name: user.name,
      email: user.email,
      weight: user.weight,
      height: user.height,
      dateOfBirth: user.dateOfBirth,
      diabetesType: user.diabetesType,
    });
    setIsModalOpen(true);
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditedUserData({
      name: '',
      email: '',
      weight: '',
      height: '',
      dateOfBirth: '',
      diabetesType: '',
    });
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({ ...prevData, [name]: value }));
  };

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

  const filteredUsers = users.filter((user) => !user.isAdmin);

  const monthNameToNumber = (monthName) => {
    const months = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12',
    };
    return months[monthName] || monthName;
  };
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      const day = date.getDate().toString().padStart(2, '0');
      const month = monthNameToNumber(
        new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
      );
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };


  return (
    <div>
      <h2>User List</h2>

      <button onClick={openAddUserModal}>Add User</button>
      <Modal
        isOpen={isAddUserModalOpen}
        onRequestClose={closeAddUserModal}
        contentLabel="Add User Modal"
      >
        <AddUser onAddUser={handleAddUser} />
      </Modal>
      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!isLoading && !error && (
        <table>
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>น้ำหนัก</th>
              <th>ส่วนสูง</th>
              <th>วันเกิด</th>
              <th>ประเภทเบาหวาน</th>
              <th>แก้ไขหรือลบ</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td style={{ display: 'flex', alignItems: 'center' }}>
                  {user.image && <img src={user.image} alt="User Avatar" style={{ marginRight: '10px', width: '30px', height: '30px' , borderRadius:'50%' }} />}
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                </td>
                <td>{user.weight}</td>
                <td>{user.height}</td>
                <td>{formatDate(user.dateOfBirth)}</td>
                <td>{user.diabetesType}</td>
                <td>
                  <button onClick={() => editUser(user)}>แก้ไข</button>
                  <button onClick={() => deleteUser(user._id)}>ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelEdit}
        contentLabel="Edit User Modal"
      >
        <h2>Edit User</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedUserData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={editedUserData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Weight:
            <input
              type="text"
              name="weight"
              value={editedUserData.weight}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Height:
            <input
              type="text"
              name="height"
              value={editedUserData.height}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Date of Birth:
            <input
              type="text"
              name="dateOfBirth"
              value={editedUserData.dateOfBirth}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Diabetes Type:
            <input
              type="text"
              name="diabetesType"
              value={editedUserData.diabetesType}
              onChange={handleInputChange}
            />
          </label>
          <br />

          <button type="button" onClick={updateUser}>
            บันทึก
          </button>
          <button type="button" onClick={cancelEdit}>
            ยกเลิก
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserManage;
