import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Badge, Alert, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaQuestionCircle, FaBook, FaClock, FaBullseye } from 'react-icons/fa'
import AnimatedButton from '../components/AnimatedButton'
import lessonsData from '../data/lessons.json'

const LessonDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the lesson by ID
    const foundLesson = lessonsData.lessons.find(l => l.id === parseInt(id))
    
    if (foundLesson) {
      setLesson(foundLesson)
      document.title = `${foundLesson.title} - Mini Knowledge Hub`
    } else {
      document.title = 'Lesson Not Found - Mini Knowledge Hub'
    }
    
    setLoading(false)
  }, [id])

  const handleBackToLessons = () => {
    navigate('/lessons')
  }

  const handleNextLesson = () => {
    const currentIndex = lessonsData.lessons.findIndex(l => l.id === parseInt(id))
    const nextLesson = lessonsData.lessons[currentIndex + 1]
    
    if (nextLesson) {
      navigate(`/lessons/${nextLesson.id}`)
    }
  }

  const handlePreviousLesson = () => {
    const currentIndex = lessonsData.lessons.findIndex(l => l.id === parseInt(id))
    const previousLesson = lessonsData.lessons[currentIndex - 1]
    
    if (previousLesson) {
      navigate(`/lessons/${previousLesson.id}`)
    }
  }

  const handleTakeQuiz = () => {
    // Navigate to quiz with lesson context
    navigate(`/quiz?lesson=${id}&category=${lesson?.category}`)
  }

  // Format content for better display
  const formatContent = (content) => {
    // Split content by paragraphs and handle markdown-like formatting
    const paragraphs = content.split('\n\n')
    
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        // Bold headers
        return (
          <h3 key={index} className="text-primary-custom mt-4 mb-3">
            {paragraph.slice(2, -2)}
          </h3>
        )
      } else if (paragraph.includes('**')) {
        // Bold text within paragraphs
        const parts = paragraph.split('**')
        return (
          <p key={index} className="mb-3">
            {parts.map((part, partIndex) => 
              partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
            )}
          </p>
        )
      } else if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
        // Code blocks
        return (
          <pre key={index} className="bg-light p-3 rounded">
            <code>{paragraph.slice(3, -3)}</code>
          </pre>
        )
      } else if (paragraph.includes('`')) {
        // Inline code
        const parts = paragraph.split('`')
        return (
          <p key={index} className="mb-3">
            {parts.map((part, partIndex) => 
              partIndex % 2 === 1 ? <code key={partIndex}>{part}</code> : part
            )}
          </p>
        )
      } else if (paragraph.trim().startsWith('-')) {
        // Lists
        const listItems = paragraph.split('\n').filter(item => item.trim())
        return (
          <ul key={index} className="mb-3">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex}>{item.replace(/^-\s*/, '')}</li>
            ))}
          </ul>
        )
      } else if (paragraph.trim().match(/^\d+\./)) {
        // Numbered lists
        const listItems = paragraph.split('\n').filter(item => item.trim())
        return (
          <ol key={index} className="mb-3">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex}>{item.replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ol>
        )
      } else {
        // Regular paragraphs
        return <p key={index} className="mb-3">{paragraph}</p>
      }
    })
  }

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    )
  }

  if (!lesson) {
    return (
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Alert variant="warning" className="text-center">
            <h4>Lesson Not Found</h4>
            <p>The lesson you're looking for doesn't exist or has been moved.</p>
            <AnimatedButton variant="primary" onClick={handleBackToLessons}>
              ← Back to Lessons
            </AnimatedButton>
          </Alert>
        </motion.div>
      </Container>
    )
  }

  const currentIndex = lessonsData.lessons.findIndex(l => l.id === parseInt(id))
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < lessonsData.lessons.length - 1

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Lesson Header */}
      <section className="lesson-header">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-3">
                  <Badge bg="light" text="dark" className="me-2">
                    {lesson.category}
                  </Badge>
                  <Badge bg="info" className="me-2">
                    {lesson.level}
                  </Badge>
                  {lesson.featured && (
                    <Badge bg="warning" text="dark">
                      ⭐ Featured
                    </Badge>
                  )}
                </div>
                <h1 className="display-4 fw-bold mb-3">{lesson.title}</h1>
                <p className="lead mb-4">{lesson.description}</p>
                <div className="d-flex align-items-center text-white-50">
                  <span className="me-4"><FaBook className="me-2" />{lesson.duration}</span>
                  <span><FaBullseye className="me-2" />{lesson.level} Level</span>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Lesson Content */}
      <Container className="py-5">
        <Row>
          <Col lg={10} className="mx-auto">
            {/* Back Button */}
            <motion.div
              className="back-button"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatedButton
                variant="outline-primary"
                onClick={handleBackToLessons}
              >
                <FaArrowLeft className="me-2" />Back to Lessons
              </AnimatedButton>
            </motion.div>

            {/* Lesson Content */}
            <motion.div
              className="lesson-content"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {formatContent(lesson.content)}
            </motion.div>

            {/* Test Your Knowledge Section */}
            <motion.div
              className="mt-5"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="bg-light-custom border-0 shadow-custom">
                <Card.Body className="p-4 text-center">
                  <div className="mb-3">
                    <FaQuestionCircle className="text-primary" size={48} />
                  </div>
                  <h3 className="text-primary-custom mb-3">Test Your Knowledge</h3>
                  <p className="text-muted mb-4">
                    Ready to put what you've learned to the test? Take our interactive quiz 
                    to reinforce your understanding of <strong>{lesson.title}</strong> concepts.
                  </p>
                  <AnimatedButton
                    variant="success"
                    size="lg"
                    onClick={handleTakeQuiz}
                    className="btn-cta-green"
                  >
                    <FaQuestionCircle className="me-2" />Take Quiz for This Lesson
                  </AnimatedButton>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div
              className="mt-5 pt-4 border-top"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Row className="align-items-center">
                <Col md={4}>
                  {hasPrevious && (
                    <AnimatedButton
                      variant="outline-secondary"
                      onClick={handlePreviousLesson}
                      className="w-100"
                    >
                      ← Previous Lesson
                    </AnimatedButton>
                  )}
                </Col>
                <Col md={4} className="text-center">
                  <AnimatedButton
                    variant="primary"
                    onClick={handleBackToLessons}
                  >
                    All Lessons
                  </AnimatedButton>
                </Col>
                <Col md={4} className="text-end">
                  {hasNext && (
                    <AnimatedButton
                      variant="outline-secondary"
                      onClick={handleNextLesson}
                      className="w-100"
                    >
                      Next Lesson →
                    </AnimatedButton>
                  )}
                </Col>
              </Row>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  )
}

export default LessonDetail