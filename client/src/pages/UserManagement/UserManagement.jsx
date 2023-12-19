import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import './UserManagement.css'; // Ensure your CSS file is set up

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not admin
    if (!auth || auth.role !== 'Admin') {
      navigate('/');
      return;
    }

    // Fetch users if admin
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user-management/users', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle errors (e.g., redirect, show message)
      }
    };

    fetchUsers();
  }, [auth, navigate]);

  const handleEdit = (userId) => {
    // Implement edit logic or redirect to an edit page
    console.log('Edit user:', userId);
  };

  const filteredUsers = users.filter(
    user => user.name.toLowerCase().includes(searchTerm.toLowerCase())
    || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => setSearchTerm(e.target.value)}
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
