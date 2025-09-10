import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FaBook, FaSearch } from 'react-icons/fa'
import LessonCard from '../components/LessonCard'
import lessonsData from '../data/lessons.json'
import bannerImage from '../assets/banner.png'

const Lessons = () => {
  const [lessons, setLessons] = useState([])
  const [filteredLessons, setFilteredLessons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    // Set page title
    document.title = 'Lessons - Mini Knowledge Hub'
    
    // Load lessons
    setLessons(lessonsData.lessons)
    setFilteredLessons(lessonsData.lessons)
  }, [])

  useEffect(() => {
    // Filter lessons based on search term and category
    let filtered = lessons

    if (searchTerm) {
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(lesson => lesson.category === selectedCategory)
    }

    setFilteredLessons(filtered)
  }, [searchTerm, selectedCategory, lessons])

  // Get unique categories
  const categories = ['All', ...new Set(lessons.map(lesson => lesson.category))]

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
                <h1 className="hero-title"><FaBook className="me-3" />Learning Lessons</h1>
                <p className="hero-subtitle">
                  Explore our comprehensive collection of web development lessons. 
                  From beginner basics to advanced concepts, find the perfect lesson for your learning journey.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filters and Search */}
      <Container className="py-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <InputGroup>
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search lessons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredLessons.length > 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-primary-custom mb-0">
                  {filteredLessons.length} {filteredLessons.length === 1 ? 'Lesson' : 'Lessons'} Found
                </h3>
                {searchTerm && (
                  <small className="text-muted">
                    Showing results for "{searchTerm}"
                  </small>
                )}
              </div>
              
              <Row>
                {filteredLessons.map((lesson, index) => (
                  <Col lg={4} md={6} className="mb-4" key={lesson.id}>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    >
                      <LessonCard 
                        lesson={lesson} 
                        featured={lesson.featured}
                      />
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <motion.div
              className="text-center py-5"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="about-icon text-muted"><FaSearch size={48} /></div>
              <h4 className="text-muted">No lessons found</h4>
              <p className="text-muted">
                Try adjusting your search terms or category filter
              </p>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </motion.div>
  )
}

export default Lessons