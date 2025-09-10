import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaRocket, FaPuzzlePiece, FaBook, FaBullseye, FaBrain, FaArrowRight } from 'react-icons/fa'
import LessonCard from '../components/LessonCard'
import AnimatedButton from '../components/AnimatedButton'
import lessonsData from '../data/lessons.json'
import bannerImage from '../assets/banner.png'

const Home = () => {
  const [featuredLessons, setFeaturedLessons] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Set page title
    document.title = 'Home - Mini Knowledge Hub'
    
    // Get featured lessons
    const featured = lessonsData.lessons.filter(lesson => lesson.featured).slice(0, 3)
    setFeaturedLessons(featured)
  }, [])

  const handleGetStarted = () => {
    navigate('/lessons')
  }

  const handleTakeQuiz = () => {
    navigate('/quiz')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
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
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-content"
              >
                <h1 className="hero-title">
                  Welcome to Mini Knowledge Hub
                </h1>
                <p className="hero-subtitle">
                  Discover the world of web development through interactive lessons and engaging quizzes. 
                  Master the skills you need to build amazing websites and applications.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <AnimatedButton
                    onClick={handleGetStarted}
                    className="btn-cta-green"
                    size="lg"
                  >
                    <FaRocket className="me-2" />Start Learning
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline-light"
                    onClick={handleTakeQuiz}
                    size="lg"
                  >
                    <FaPuzzlePiece className="me-2" />Take Quiz
                  </AnimatedButton>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Welcome Section */}
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="section-title">Your Learning Journey Starts Here</h2>
              <p className="lead text-muted mb-5">
                Mini Knowledge Hub is your comprehensive portal for mastering web development. 
                Whether you're a complete beginner or looking to advance your skills, our carefully 
                crafted lessons and interactive quizzes will guide you every step of the way.
              </p>
            </motion.div>
          </Col>
        </Row>

        {/* Features Grid */}
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <motion.div
              className="feature-card bg-light-custom"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="about-icon text-primary"><FaBook size={48} /></div>
              <h4 className="text-primary-custom">Interactive Lessons</h4>
              <p className="text-muted">
                Comprehensive lessons covering HTML, CSS, JavaScript, React, and more. 
                Learn at your own pace with detailed explanations and practical examples.
              </p>
            </motion.div>
          </Col>
          <Col md={4} className="mb-4">
            <motion.div
              className="feature-card bg-light-custom"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="about-icon text-primary"><FaPuzzlePiece size={48} /></div>
              <h4 className="text-primary-custom">Knowledge Quizzes</h4>
              <p className="text-muted">
                Test your understanding with interactive quizzes. Get instant feedback 
                and track your progress as you master new concepts.
              </p>
            </motion.div>
          </Col>
          <Col md={4} className="mb-4">
            <motion.div
              className="feature-card bg-light-custom"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="about-icon text-primary"><FaBullseye size={48} /></div>
              <h4 className="text-primary-custom">Skill Building</h4>
              <p className="text-muted">
                Build practical skills with hands-on projects and real-world examples. 
                Progress from basics to advanced topics systematically.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Featured Lessons Section */}
      <section className="section-light py-5">
        <Container>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="section-title">Featured Lessons</h2>
            <p className="text-center text-muted mb-5">
              Start with these popular lessons recommended by our learning experts
            </p>
          </motion.div>

          <Row>
            {featuredLessons.map((lesson, index) => (
              <Col lg={4} md={6} className="mb-4" key={lesson.id}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <LessonCard lesson={lesson} featured={true} />
                </motion.div>
              </Col>
            ))}
          </Row>

          <motion.div
            className="text-center mt-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={handleGetStarted}
            >
              View All Lessons <FaArrowRight className="ms-2" />
            </AnimatedButton>
          </motion.div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <h2 className="section-title">Ready to Test Your Knowledge?</h2>
              <p className="lead text-muted mb-4">
                Challenge yourself with our comprehensive quiz covering web development fundamentals. 
                Get instant feedback and see how well you understand the concepts.
              </p>
              <AnimatedButton
                variant="success"
                size="lg"
                onClick={handleTakeQuiz}
                className="btn-cta-orange"
              >
                <FaBrain className="me-2" />Take the Quiz Now
              </AnimatedButton>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  )
}

export default Home