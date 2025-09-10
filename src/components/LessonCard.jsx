import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaBookOpen, FaClock, FaStar } from 'react-icons/fa'

const LessonCard = ({ lesson, featured = false }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/lessons/${lesson.id}`)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-100"
    >
      <Card 
        className={`h-100 lesson-card ${featured ? 'featured-card' : ''}`}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Badge 
              bg={featured ? 'warning' : 'secondary'} 
              className="mb-2"
            >
              {lesson.category}
            </Badge>
            {featured && (
              <Badge bg="success" className="mb-2">
                <FaStar className="me-1" />Featured
              </Badge>
            )}
          </div>
          
          <Card.Title className="lesson-title">
            <FaBookOpen className="me-2 text-primary" />{lesson.title}
          </Card.Title>
          
          <Card.Text className="lesson-description flex-grow-1">
            {lesson.description}
          </Card.Text>
          
          <div className="lesson-meta mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <Badge bg="info" className="me-2">
                {lesson.level}
              </Badge>
              <small className="text-muted">
                <FaClock className="me-1" />{lesson.duration}
              </small>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default LessonCard