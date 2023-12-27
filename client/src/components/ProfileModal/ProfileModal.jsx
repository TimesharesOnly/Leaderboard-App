import React, { useState } from 'react'; // Import useState
import { Button, Image, Modal } from 'react-bootstrap';
import { AuthState } from '../../context/AuthProvider';
import { Notify } from "../../utils";


const ProfileModal = ({ show, onHide }) => {
  const { auth } = AuthState();

  // New State to handle editing mode
  const [isEditing, setIsEditing] = useState(false);

  // New State to handle updated profile information
  const [updatedProfile, setUpdatedProfile] = useState({
    name: auth.name,
    email: auth.email,
    profilePic: auth.profilePic,
    role: auth.role,
    youtubeVideoId: auth.youtubeVideoId,
  });

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
      setUpdatedProfile({
        ...updatedProfile,
        profilePic: data.filePath, // Use the file path returned by your server
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
          // Optionally, update the global state/context with the new profile data
          Notify("Profile updated successfully", "success");
      } else {
          Notify(data.error, "warn");
      }
    } catch (error) {
      Notify("Internal server error", "error");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <Image
            id="profileModal"
            src={updatedProfile.profilePic}
            alt="Profile image"
            draggable="false"
            roundedCircle
          />
        </div>
        {/* Conditional rendering based on isEditing state */}
        {isEditing ? (
          <div className="text-center mt-3">
            <input
              type="text"
              name="name"
              defaultValue={updatedProfile.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              defaultValue={updatedProfile.email}
              onChange={handleInputChange}
            />
            <input type="file" onChange={handleImageUpload} />
            <input
            type="text"
            name="youtubeVideoId"
            placeholder="YouTube Video ID"
            defaultValue={updatedProfile.youtubeVideoId}
            onChange={handleInputChange}
          />
      </div>
        ) : (
          <div>
            <h4 className="text-center mt-3">{updatedProfile.name}</h4>
            <h4 className="text-center">Email: {updatedProfile.email}</h4>
            <h4 className="text-center">YouTube Video ID: {updatedProfile.youtubeVideoId}</h4>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* Conditionally render Edit/Save and Close buttons */}
        {isEditing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={handleEdit}>Edit</Button>
        )}
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
