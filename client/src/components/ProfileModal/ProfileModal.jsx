import React, { useState, useRef } from 'react';
import { Button, Image, Modal, Form } from 'react-bootstrap';
import { AuthState } from '../../context/AuthProvider';
import { Notify } from "../../utils";


const ProfileModal = ({ show, onHide }) => {
  const { auth, updateUserProfile } = AuthState();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: auth.name,
    email: auth.email,
    profilePic: auth.profilePic,
    role: auth.role,
    youtubeVideoId: auth.youtubeVideoId,
  });
  const fileInputRef = useRef(null);

  // Function to toggle editing mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({
      ...updatedProfile,
      [name]: value,
    });
  };


  const handleImageChangeClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  // Function to handle image upload
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/images/upload', { // Your server endpoint
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (response.ok) {
      if (auth.profilePic) {
        await fetch('/api/images/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          },
          body: JSON.stringify({ filePath: auth.profilePic })
        });
        
      }
      
      setUpdatedProfile({
        ...updatedProfile,
        profilePic: data.filePath,
         // Use the file path returned by your server
      });
    } else {
      // Handle error
      console.error("Error uploading image:", data.error);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};


  // Function to handle saving changes
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/auth/profile/update`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}` // Send token for authentication
        },
        body: JSON.stringify(updatedProfile)
      });
      const data = await response.json();
      if (data.success) {
          setIsEditing(false);
          updateUserProfile(updatedProfile);
          Notify("Profile updated successfully", "success");
      } else {
          Notify(data.error, "warn");
      }
    } catch (error) {
      Notify("Internal server error", "error");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="profile-modal-content">
        <div className="profile-image-section text-center">
            <Image id="profileModal" src={updatedProfile.profilePic || '/uploads/default-profile-pic.png'} alt="Profile" roundedCircle />
            </div>
          <div className="d-flex justify-content-center">
          <Image /* ... */ />
          {isEditing && (
            <>
              <Button onClick={handleImageChangeClick} className="mt-2">
                Change Profile Image
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: 'none' }} // Hide the input field
              />
            </>
          )}
        </div>
          <div className="profile-info-section">
            {isEditing ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" defaultValue={updatedProfile.name} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" defaultValue={updatedProfile.email} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>YouTube Video ID</Form.Label>
                  <Form.Control type="text" name="youtubeVideoId" defaultValue={updatedProfile.youtubeVideoId} onChange={handleInputChange} />
                </Form.Group>
              </Form>
            ) : (
              <div>
                <h4>{updatedProfile.name}</h4>
                <p>Email: {updatedProfile.email}</p>
                <p>YouTube Video ID: {updatedProfile.youtubeVideoId}</p>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isEditing ? <Button onClick={handleSave}>Save</Button> : <Button onClick={handleEdit}>Edit</Button>}
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;