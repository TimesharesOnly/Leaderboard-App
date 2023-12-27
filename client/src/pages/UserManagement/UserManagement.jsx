import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../context/AuthProvider';
import './UserManagement.css';
import UserEditModal from '../../components/UserManagement/UserEditModal';
import UserCreateModal from '../../components/UserManagement/UserCreateModal';
import { Notify } from "../../utils";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const authState = AuthState();
  const navigate = useNavigate();
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [createModalShow, setCreateModalShow] = useState(false);

  useEffect(() => {
    if (!authState.auth || authState.auth.role !== 'Admin') {
      navigate('/');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user-management/users', {
          headers: { Authorization: `Bearer ${authState.auth.token}` }
        });
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [authState, navigate]);

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    setSelectedUser(userToEdit);
    setEditModalShow(true);
  };

  const handleSave = async (editedUser) => {
    try {
      const response = await fetch(`/api/user-management/users/${editedUser._id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.auth.token}`
        },
        body: JSON.stringify(editedUser)
      });
      const data = await response.json();
      if (data.success) {
        Notify("Profile updated successfully", "success");
        const updatedUsers = users.map(user => user._id === editedUser._id ? { ...user, ...editedUser } : user);
        setUsers(updatedUsers);
        setEditModalShow(false);
        // Notify the user of the successful update
      } else {
        Notify(data.error, "warn");
        
      }
    } catch (error) {
      Notify("Internal server error", "error");
      
    }
  };

  const handleCreate = async (newUser) => {
    try {
      const response = await fetch('/api/user-management/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.auth.token}`
        },
        body: JSON.stringify(newUser)
      });
      const data = await response.json();
      if (data.success) {
        Notify("User created successfully", "success");
        setUsers([...users, data.data]);
        setCreateModalShow(false);
      } else {
        Notify(data.error, "warn");
      }
    } catch (error) {
      Notify("Internal server error", "error");
    }
  };

  const filteredUsers = users.filter(
    user => user.name.toLowerCase().includes(searchTerm.toLowerCase())
    || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <button onClick={() => setCreateModalShow(true)} className="add-user-btn">Add User</button>
      <input
        type="text"
        placeholder="Search users..."
        className="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <UserEditModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        user={selectedUser}
        onSave={handleSave}
      />

      <UserCreateModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
        onSave={handleCreate}
      />

      <div className="user-list">
        {filteredUsers.map((user) => (
          <div className="user-item" key={user._id}>
            <img 
              src={user.profilePic || '/uploads/default-profile-pic.png'} 
              alt={user.name}
              className="user-image" 
            />
            <div className="user-details">
              <h5 className="user-name">{user.name}</h5>
              <p className="user-email">{user.email}</p>
              <p className="user-role">{user.role}</p>
            </div>
            <button onClick={() => handleEdit(user._id)} className="edit-btn">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;