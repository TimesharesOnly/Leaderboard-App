import { useState } from "react";
import { Container, Dropdown, DropdownButton, Navbar, Nav, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import IMAGES from "../../assets";
import { AuthState } from "../../context/AuthProvider";
import ProfileModal from "../ProfileModal/ProfileModal";
import "./NavigationBar.css"; 

const NavigationBar = () => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const { auth, setAuth } = AuthState();

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/login");
  };

  const profileIcon = auth && auth.profilePic 
  ? <Image src={auth.profilePic} alt="Profile" roundedCircle style={{ width: '50px', height: '50px' }} />
  : <FontAwesomeIcon icon={faUserCircle} size="2x" style={{ color: 'grey' }} />;

  return (
    <Navbar collapseOnSelect expand="md" variant="light" id="nav">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="Advanced Node Authentication Logo"
            src={IMAGES.logo}
            width="128"
            height="58"
            className="d-inline-block align-top"
          />
          
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
          {auth ? (
            <>
              <div className="user-info">
                <span className="user-name">{auth.name}</span>
                <span className="user-role">{auth.role}</span>
              </div>
              <DropdownButton
                align="end"
                title={profileIcon}
                className="profile-dropdown"
              >
                <Dropdown.Item as="button" onClick={() => setModalShow(true)}>
                  Edit Profile
                </Dropdown.Item>
                <ProfileModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                {auth.role === 'Admin' && (
                  <Dropdown.Item as={Link} to="/usermanagement">
                  User Management
                  </Dropdown.Item>
                )}
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={logoutHandler}>
                  Log out
                </Dropdown.Item>
              </DropdownButton>
            </>
          ) : (
            <Nav.Item>
              <button className="nav-button" onClick={() => navigate("/login")}>Log in</button>
              <button className="nav-button" onClick={() => navigate("/register")}>Register</button>
            </Nav.Item>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
