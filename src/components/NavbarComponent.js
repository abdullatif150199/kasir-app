import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

function NavbarComponent(props) {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSignOut = () => {
    signOut(auth).then((result) => {
      localStorage.clear();
      navigate("/login");
    });
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar" variant="dark">
        <Container className="container-fluid">
          <Navbar.Brand href="#home">Kasir App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/keranjang" className="nav-link">
                Keranjang
              </Link>
              <Link to="/Sukses" className="nav-link">
                Pesanan
              </Link>
            </Nav>
            <Dropdown>
              <Dropdown.Toggle variant="none border-0 text-white">{user.email}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="text-center me-auto" onClick={handleSignOut}>
                  <i class="fa-solid fa-right-from-bracket"></i> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    value: state.value,
  };
};

export default connect(mapStateToProps)(NavbarComponent);
