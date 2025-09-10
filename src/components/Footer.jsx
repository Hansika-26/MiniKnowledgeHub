import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebook, FaTwitter, FaLinkedin, FaGraduationCap, FaBookOpen, FaBook, FaQuestionCircle, FaInfoCircle, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="mb-3 footer-logo">
              <div className="logo-container-footer">
                <FaBookOpen className="logo-book-footer" />
                <FaGraduationCap className="logo-hat-footer" />
              </div>
              Mini Knowledge Hub
            </h5>
            <p className="mb-0">
              Empowering minds through interactive learning experiences. 
              Explore our comprehensive lessons and test your knowledge with engaging quizzes.
            </p>
          </Col>
          <Col md={3}>
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/lessons" className="text-white-50 text-decoration-none"><FaBook className="me-2" />Lessons</a></li>
              <li><a href="/quiz" className="text-white-50 text-decoration-none"><FaQuestionCircle className="me-2" />Quiz</a></li>
              <li><a href="/about" className="text-white-50 text-decoration-none"><FaInfoCircle className="me-2" />About</a></li>
              <li><a href="/contact" className="text-white-50 text-decoration-none"><FaEnvelope className="me-2" />Contact</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li><span className="text-white-50">Web Development</span></li>
              <li><span className="text-white-50">React</span></li>
              <li><span className="text-white-50">JavaScript</span></li>
              <li><span className="text-white-50">CSS</span></li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col md={6}>
            <p className="mb-0">
              &copy; 2024 Mini Knowledge Hub. Built with React & Bootstrap.
            </p>
          </Col>
          <Col md={6} className="text-end">
            <div className="social-icons">
              <a href="#" className="text-white-50 me-3 social-icon">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white-50 me-3 social-icon">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white-50 social-icon">
                <FaLinkedin size={20} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer