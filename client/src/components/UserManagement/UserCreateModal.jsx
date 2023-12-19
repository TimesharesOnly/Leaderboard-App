import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserCreateModal = ({ show, onHide, onSave }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    profilePic: '',
    youtubeVideoId: '',
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={newUser.role}
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
              value={newUser.profilePic}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>YouTube Video ID</Form.Label>
            <Form.Control
              type="text"
              name="youtubeVideoId"
              value={newUser.youtubeVideoId}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Add other fields as needed */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={() => onSave(newUser)}>Add User</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCreateModal;
