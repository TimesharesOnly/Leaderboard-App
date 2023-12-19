import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../context/AuthProvider';
import './UserManagement.css'; // Ensure your CSS file is set up
import UserEditModal from '../../components/UserManagement/UserEditModal';
import UserCreateModal from '../../components/UserManagement/UserCreateModal';
import { Notify } from "../../utils";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const authState = AuthState();  // Use authState to hold the entire object
  const navigate = useNavigate();
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  useEffect(() => {
    // Redirect if not admin
    if (!authState.auth || authState.auth.role !== 'Admin') {
      navigate('/');
      return;
    }

    // Fetch users if admin
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user-management/users', {
          headers: { Authorization: `Bearer ${authState.auth.token}` }
        });
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle errors (e.g., redirect, show message)
      }
    };

    fetchUsers();
  }, [authState, navigate]);

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    setSelectedUser(userToEdit);
    setEditModalShow(true);
  };

  const filteredUsers = users.filter(
    user => user.name.toLowerCase().includes(searchTerm.toLowerCase())
    || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="user-management-container">
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      <UserEditModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        user={selectedUser}
        onSave={handleSave}
      />
  
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user._id)}>Edit</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
