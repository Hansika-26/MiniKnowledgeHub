import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion'
import { FaRocket, FaHeart, FaStar, FaPlay, FaPause, FaChevronDown } from 'react-icons/fa'

const FramerMotionExamples = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [selectedCard, setSelectedCard] = useState(null)
  const [likeCount, setLikeCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const controls = useAnimation()
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Animation variants for reusable animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  }

  const handleLike = () => {
    setLikeCount(prev => prev + 1)
  }

  const handleToggleAnimation = async () => {
    if (isPlaying) {
      await controls.stop()
    } else {
      await controls.start({
        rotate: 360,
        scale: [1, 1.2, 1],
        transition: {
          duration: 2,
          repeat: Infinity
        }
      })
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={10} className="mx-auto">
          
          {/* 1. Basic Fade In Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5"
          >
            <h1 className="text-center mb-4">🎭 Framer Motion Examples</h1>
            <p className="text-center text-muted">
              Explore different animation techniques and patterns
            </p>
          </motion.div>

          {/* 2. Staggered List Animation */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="mb-5"
          >
            <h3 className="mb-4">📋 Staggered List Animation</h3>
            <Row>
              {['React Basics', 'JavaScript ES6', 'CSS Animations', 'Node.js'].map((item, index) => (
                <Col md={6} key={index} className="mb-3">
                  <motion.div variants={itemVariants}>
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <h5>{item}</h5>
                        <p className="text-muted">Learn the fundamentals</p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* 3. Hover Animations */}
          <div className="mb-5">
            <h3 className="mb-4">🎯 Hover Effects</h3>
            <Row>
              {[1, 2, 3].map((item) => (
                <Col md={4} key={item} className="mb-3">
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="text-center h-100 shadow-sm">
                      <Card.Body>
                        <motion.div
                          whileHover={{ rotate: 20, scale: 1.2 }}
                          className="mb-3"
                        >
                          <FaStar size={40} className="text-warning" />
                        </motion.div>
                        <h5>Hover Me!</h5>
                        <p className="text-muted">Card {item}</p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>

          {/* 4. Toggle Animation with AnimatePresence */}
          <div className="mb-5">
            <h3 className="mb-4">🔄 Toggle Animation</h3>
            <div className="text-center">
              <Button 
                variant="primary" 
                onClick={() => setIsVisible(!isVisible)}
                className="mb-3"
              >
                {isVisible ? 'Hide' : 'Show'} Content
              </Button>
              
              <AnimatePresence mode="wait">
                {isVisible && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
                      <Card.Body>
                        <h5>✨ Animated Content</h5>
                        <p>This content appears and disappears with smooth animations!</p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 5. Gesture Animations */}
          <div className="mb-5">
            <h3 className="mb-4">👆 Gesture Animations</h3>
            <Row>
              <Col md={6} className="mb-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                  className="text-center p-4 bg-primary text-white rounded"
                  style={{ cursor: 'grab' }}
                >
                  <FaRocket size={30} className="mb-2" />
                  <p className="mb-0">Drag me around! 🚀</p>
                </motion.div>
              </Col>
              
              <Col md={6} className="mb-3">
                <motion.div
                  className="text-center p-4 bg-danger text-white rounded"
                  style={{ cursor: 'pointer' }}
                  onClick={handleLike}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: likeCount > 0 ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ 
                      scale: likeCount > 0 ? [1, 1.5, 1] : 1,
                      color: likeCount > 0 ? '#ff69b4' : '#ffffff'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaHeart size={30} className="mb-2" />
                  </motion.div>
                  <p className="mb-0">Likes: {likeCount} ❤️</p>
                </motion.div>
              </Col>
            </Row>
          </div>

          {/* 6. Controlled Animations */}
          <div className="mb-5">
            <h3 className="mb-4">🎮 Controlled Animations</h3>
            <div className="text-center">
              <motion.div
                animate={controls}
                className="mx-auto mb-3 d-inline-block"
              >
                <FaStar size={60} className="text-warning" />
              </motion.div>
              <br />
              <Button 
                variant={isPlaying ? "danger" : "success"} 
                onClick={handleToggleAnimation}
              >
                {isPlaying ? <FaPause /> : <FaPlay />} 
                {isPlaying ? ' Stop' : ' Start'} Animation
              </Button>
            </div>
          </div>

          {/* 7. Modal Animation */}
          <div className="mb-5">
            <h3 className="mb-4">🪟 Modal Animation</h3>
            <div className="text-center">
              <Button 
                variant="info" 
                onClick={() => setSelectedCard(selectedCard ? null : 'modal')}
              >
                {selectedCard ? 'Close' : 'Open'} Modal
              </Button>
              
              <AnimatePresence>
                {selectedCard && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1000
                    }}
                    onClick={() => setSelectedCard(null)}
                  >
                    <motion.div
                      variants={modalVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ width: '90%', maxWidth: '500px' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Card>
                        <Card.Body className="p-5 text-center">
                          <h4>🎉 Animated Modal</h4>
                          <p>This modal appears with smooth scale and fade animations!</p>
                          <Button 
                            variant="primary" 
                            onClick={() => setSelectedCard(null)}
                          >
                            Close
                          </Button>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 8. Scroll-based Animation */}
          <motion.div style={{ opacity }} className="mb-5">
            <h3 className="mb-4">📜 Scroll-based Animation</h3>
            <Card className="bg-gradient text-white">
              <Card.Body className="p-5 text-center">
                <h4>Scroll to see this fade out!</h4>
                <p>This section's opacity changes based on scroll position.</p>
              </Card.Body>
            </Card>
          </motion.div>

          {/* 9. Complex Sequential Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-5"
          >
            <h3 className="mb-4">⚡ Sequential Animation</h3>
            <motion.div
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ 
                type: "spring",
                damping: 15,
                stiffness: 100,
                delay: 1.5
              }}
            >
              <Card className="bg-success text-white">
                <Card.Body>
                  <h5>Spring Animation</h5>
                  <p className="mb-0">This card slides in with a spring effect after the fade-in completes!</p>
                </Card.Body>
              </Card>
            </motion.div>
          </motion.div>

          {/* 10. Keyframe Animation */}
          <div className="mb-5">
            <h3 className="mb-4">🎬 Keyframe Animation</h3>
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="mx-auto bg-primary"
                style={{ width: '80px', height: '80px' }}
              />
              <p className="mt-3">Complex keyframe animation with multiple properties</p>
            </div>
          </div>

          {/* 11. Text Animation */}
          <div className="mb-5">
            <h3 className="mb-4">📝 Text Animations</h3>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-primary"
            >
              <motion.span
                animate={{ color: ['#0d6efd', '#dc3545', '#198754', '#0d6efd'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Animated Text Colors! 🌈
              </motion.span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center"
            >
              {Array.from("This text appears letter by letter!").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* 12. Layout Animation */}
          <div className="mb-5">
            <h3 className="mb-4">📐 Layout Animations</h3>
            <motion.div layout className="d-flex flex-wrap gap-3 justify-content-center">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  layout
                  whileHover={{ scale: 1.1 }}
                  className="bg-info text-white p-3 rounded"
                  style={{ minWidth: '100px', textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    // This would trigger layout animation when items reorder
                  }}
                >
                  Box {item}
                </motion.div>
              ))}
            </motion.div>
            <p className="text-center mt-3 text-muted">
              Hover over the boxes to see layout animations
            </p>
          </div>

        </Col>
      </Row>
    </Container>
  )
}

export default FramerMotionExamples