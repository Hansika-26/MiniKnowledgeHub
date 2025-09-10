import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FaInfoCircle, FaBullseye, FaRocket, FaLightbulb, FaMobile, FaSearch, FaBolt, FaBook, FaPuzzlePiece, FaUsers, FaGift, FaFacebook, FaTwitter, FaLinkedin, FaReact, FaEnvelope } from 'react-icons/fa'
import bannerImage from '../assets/banner.png'

const About = () => {
  useEffect(() => {
    document.title = 'About - Mini Knowledge Hub'
  }, [])

  const features = [
    {
      icon: <FaBullseye size={48} />,
      title: 'Focused Learning',
      description: 'Our carefully curated content ensures you learn the most important concepts efficiently and effectively.'
    },
    {
      icon: <FaRocket size={48} />,
      title: 'Progressive Curriculum',
      description: 'Start from the basics and gradually advance to complex topics with our structured learning path.'
    },
    {
      icon: <FaLightbulb size={48} />,
      title: 'Interactive Content',
      description: 'Engage with hands-on examples, practical exercises, and interactive quizzes to reinforce your learning.'
    },
    {
      icon: <FaMobile size={48} />,
      title: 'Mobile Friendly',
      description: 'Learn anywhere, anytime with our responsive design that works perfectly on all devices.'
    },
    {
      icon: <FaSearch size={48} />,
      title: 'Comprehensive Coverage',
      description: 'From HTML basics to advanced React concepts, we cover everything you need for web development.'
    },
    {
      icon: <FaBolt size={48} />,
      title: 'Fast & Reliable',
      description: 'Built with modern technologies for optimal performance and a smooth learning experience.'
    }
  ]

  const stats = [
    { number: '6+', label: 'Comprehensive Lessons', icon: <FaBook size={32} /> },
    { number: '10+', label: 'Quiz Questions', icon: <FaPuzzlePiece size={32} /> },
    { number: '4+', label: 'Technology Topics', icon: <FaUsers size={32} /> },
    { number: '100%', label: 'Free Content', icon: <FaGift size={32} /> }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Page Header */}
      <section 
        className="hero-section-banner"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-blur-overlay"></div>
        <Container className="position-relative">
          <Row className="align-items-center min-vh-50">
            <Col lg={8} className="mx-auto text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hero-content"
              >
                <h1 className="hero-title"> About Mini Knowledge Hub</h1>
                <p className="hero-subtitle">
                  Empowering the next generation of web developers through interactive learning 
                  and comprehensive educational resources.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <Container className="py-5">
        <Row>
          <Col lg={10} className="mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="section-title">Our Mission</h2>
              <div className="text-center mb-5">
                <p className="lead text-muted">
                  At Mini Knowledge Hub, we believe that quality education should be accessible to everyone. 
                  Our mission is to provide comprehensive, engaging, and practical web development education 
                  that empowers learners to build amazing digital experiences.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <Row className="mb-5">
              {stats.map((stat, index) => (
                <Col md={3} sm={6} className="mb-4" key={index}>
                  <motion.div
                    className="text-center"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="about-icon text-primary">{stat.icon}</div>
                    <h3 className="text-primary-custom fw-bold">{stat.number}</h3>
                    <p className="text-muted">{stat.label}</p>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <section className="section-light py-5">
        <Container>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="section-title">Why Choose Mini Knowledge Hub?</h2>
          </motion.div>

          <Row>
            {features.map((feature, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="h-100"
                >
                  <Card className="feature-card h-100 border-0 shadow-custom">
                    <Card.Body className="text-center p-4">
                      <div className="about-icon text-primary">{feature.icon}</div>
                      <h4 className="text-primary-custom mb-3">{feature.title}</h4>
                      <p className="text-muted">{feature.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* What We Offer Section */}
      <Container className="py-5">
        <Row>
          <Col lg={10} className="mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <h2 className="section-title">What We Offer</h2>
            </motion.div>

            <Row>
              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <Card className="border-0 bg-light-custom h-100">
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="about-icon me-3"><FaBook size={32} /></span>
                        <h4 className="text-primary-custom mb-0">Comprehensive Lessons</h4>
                      </div>
                      <p className="text-muted">
                        Detailed lessons covering essential web development topics including HTML, CSS, 
                        JavaScript, React, and modern development practices. Each lesson includes practical 
                        examples and hands-on exercises.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>

              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <Card className="border-0 bg-light-custom h-100">
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="about-icon me-3"><FaPuzzlePiece size={32} /></span>
                        <h4 className="text-primary-custom mb-0">Interactive Quizzes</h4>
                      </div>
                      <p className="text-muted">
                        Test your knowledge with carefully crafted quizzes that provide instant feedback. 
                        Each question includes detailed explanations to help you understand the concepts better.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>

              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                >
                  <Card className="border-0 bg-light-custom h-100">
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="about-icon me-3"><FaBullseye size={32} /></span>
                        <h4 className="text-primary-custom mb-0">Structured Learning</h4>
                      </div>
                      <p className="text-muted">
                        Our curriculum is designed to take you from beginner to advanced level systematically. 
                        Each lesson builds upon previous knowledge to ensure solid understanding.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>

              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  <Card className="border-0 bg-light-custom h-100">
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="about-icon me-3"><FaUsers size={32} /></span>
                        <h4 className="text-primary-custom mb-0">Modern Technologies</h4>
                      </div>
                      <p className="text-muted">
                        Stay up-to-date with the latest web development technologies and best practices. 
                        Learn industry-standard tools and frameworks used by professional developers.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Technology Stack Section */}
      <section className="section-light-alt py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.9 }}
              >
                <h2 className="section-title">Built With Modern Technologies</h2>
                <p className="lead text-muted mb-5">
                  This portal is built using cutting-edge technologies to provide you with 
                  the best learning experience possible.
                </p>

                <Row>
                  <Col md={3} sm={6} className="mb-4">
                    <div className="about-icon text-primary"><FaReact size={48} /></div>
                    <h5 className="text-primary-custom">React</h5>
                    <p className="text-muted small">Modern UI Library</p>
                  </Col>
                  <Col md={3} sm={6} className="mb-4">
                    <div className="about-icon">🅱️</div>
                    <h5 className="text-primary-custom">Bootstrap</h5>
                    <p className="text-muted small">Responsive Design</p>
                  </Col>
                  <Col md={3} sm={6} className="mb-4">
                    <div className="about-icon">🎭</div>
                    <h5 className="text-primary-custom">Framer Motion</h5>
                    <p className="text-muted small">Smooth Animations</p>
                  </Col>
                  <Col md={3} sm={6} className="mb-4">
                    <div className="about-icon text-primary"><FaBolt size={48} /></div>
                    <h5 className="text-primary-custom">Vite</h5>
                    <p className="text-muted small">Fast Build Tool</p>
                  </Col>
                </Row>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact CTA Section */}
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              <h2 className="section-title">Get In Touch</h2>
              <p className="lead text-muted mb-4">
                Have questions or suggestions? We'd love to hear from you! 
                Reach out to us and let's make learning even better together.
              </p>
              <motion.a
                href="/contact"
                className="btn btn-primary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="me-2" />Contact Us
              </motion.a>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  )
}

export default About