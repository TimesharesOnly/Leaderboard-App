import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserEditModal = ({ show, onHide, user, onSave, onDelete }) => {
  // Initialize a state for the edited user
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    role: '',
    profilePic: '',
    youtubeVideoId: '',
  });

  useEffect(() => {
    // Update state when the user prop changes
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    // Confirmation before deleting
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
        onDelete(user._id);
        onHide();
    }
};

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control
              type="text"
              name="profilePic"
              value={editedUser.profilePic}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>YouTube Video ID</Form.Label>
            <Form.Control
              type="text"
              name="youtubeVideoId"
              value={editedUser.youtubeVideoId}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Add other fields as needed */}
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer-container">
                <Button variant="danger" onClick={handleDelete}>Delete User</Button>
                <div className="modal-footer-right">
                    <Button variant="primary" onClick={() => onSave(user)}>Save</Button>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                </div>
            </Modal.Footer>
    </Modal>
  );
};

export default UserEditModal;
