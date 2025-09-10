import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { motion } from 'framer-motion'
import { FaHome, FaBook, FaQuestionCircle, FaInfoCircle, FaEnvelope } from 'react-icons/fa'
import logoImage from '../assets/Image.png'

const Navigation = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="custom-navbar">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold fs-3 logo-brand">
              <div className="logo-container">
                <img 
                  src={logoImage} 
                  alt="Mini Knowledge Hub Logo" 
                  className="logo-image"
                  style={{ height: '40px', width: 'auto', marginRight: '10px' }}
                />
              </div>
              <span className="brand-text">Mini Knowledge Hub</span>
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link className="nav-link-custom">
                  <FaHome className="me-2" />Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/lessons">
                <Nav.Link className="nav-link-custom">
                  <FaBook className="me-2" />Lessons
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/quiz">
                <Nav.Link className="nav-link-custom">
                  <FaQuestionCircle className="me-2" />Quiz
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link className="nav-link-custom">
                  <FaInfoCircle className="me-2" />About
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link className="nav-link-custom">
                  <FaEnvelope className="me-2" />Contact
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.header>
  )
}

export default Navigation