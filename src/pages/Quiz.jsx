import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, ProgressBar, Alert } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaPuzzlePiece, FaCheckCircle, FaTimesCircle, FaRocket, FaBook, FaTrophy, FaClock, FaChartBar, FaGift, FaFlag, FaArrowLeft } from 'react-icons/fa'
import AnimatedButton from '../components/AnimatedButton'
import quizData from '../data/quiz.json'
import lessonsData from '../data/lessons.json'

const Quiz = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [lessonContext, setLessonContext] = useState(null)

  const { quiz } = quizData
  const totalQuestions = quiz.questions.length

  useEffect(() => {
    document.title = 'Quiz - Mini Knowledge Hub'
    
    // Check if this quiz is accessed from a specific lesson
    const searchParams = new URLSearchParams(location.search)
    const lessonId = searchParams.get('lesson')
    const category = searchParams.get('category')
    
    if (lessonId) {
      const lesson = lessonsData.lessons.find(l => l.id === parseInt(lessonId))
      if (lesson) {
        setLessonContext({
          lesson,
          category: category || lesson.category
        })
        document.title = `${lesson.title} Quiz - Mini Knowledge Hub`
      }
    }
  }, [location])

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmitQuiz()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctAnswers = 0
    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })
    
    setScore(correctAnswers)
    setShowResults(true)
  }

  const handleRestartQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const handleBackToLesson = () => {
    if (lessonContext) {
      navigate(`/lessons/${lessonContext.lesson.id}`)
    } else {
      navigate('/lessons')
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100
    
    if (percentage >= 90) {
      return { message: "Excellent!", variant: "success", description: "You have mastered these concepts!" }
    } else if (percentage >= 70) {
      return { message: "Great job!", variant: "primary", description: "You have a solid understanding of the material." }
    } else if (percentage >= 50) {
      return { message: "Good effort!", variant: "warning", description: "Keep practicing to improve your skills." }
    } else {
      return { message: "Keep learning!", variant: "danger", description: "Review the lessons and try again." }
    }
  }

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Quiz Introduction */}
        <section className="hero-section">
          <Container>
            <Row>
              <Col lg={8} className="mx-auto text-center">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="hero-title">
                    <FaPuzzlePiece className="me-3" />
                    {lessonContext ? `${lessonContext.lesson.title} Quiz` : 'Knowledge Quiz'}
                  </h1>
                  <p className="hero-subtitle">
                    {lessonContext 
                      ? `Test your understanding of ${lessonContext.lesson.title} concepts with this interactive quiz. Apply what you've learned and see how well you've mastered the material.`
                      : 'Test your understanding of web development concepts with our interactive quiz. Get instant feedback and see how well you\'ve mastered the material.'
                    }
                  </p>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>

        <Container className="py-5">
          <Row>
            <Col lg={8} className="mx-auto">
              {/* Back to Lesson Button */}
              {lessonContext && (
                <motion.div
                  className="mb-4"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <AnimatedButton
                    variant="outline-primary"
                    onClick={handleBackToLesson}
                  >
                    <FaArrowLeft className="me-2" />Back to {lessonContext.lesson.title}
                  </AnimatedButton>
                </motion.div>
              )}
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="shadow-custom">
                  <Card.Body className="p-5 text-center">
                    <div className="about-icon text-primary mb-4"><FaTrophy size={48} /></div>
                    <h2 className="text-primary-custom mb-4">
                      {lessonContext ? `${lessonContext.lesson.title} Quiz` : quiz.title}
                    </h2>
                    <p className="lead text-muted mb-4">
                      {lessonContext 
                        ? `Challenge yourself with questions specifically designed to test your knowledge of ${lessonContext.lesson.title}.`
                        : quiz.description
                      }
                    </p>
                    
                    <div className="row mb-4">
                      <div className="col-md-4 mb-3">
                        <div className="bg-light-custom p-3 rounded">
                          <h5 className="text-primary-custom mb-2">📊 Questions</h5>
                          <p className="mb-0">{totalQuestions} questions</p>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="bg-light-custom p-3 rounded">
                          <h5 className="text-primary-custom mb-2"><FaClock className="me-2" />Duration</h5>
                          <p className="mb-0">~{Math.ceil(totalQuestions * 1.5)} minutes</p>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="bg-light-custom p-3 rounded">
                          <h5 className="text-primary-custom mb-2"><FaGift className="me-2" />Scoring</h5>
                          <p className="mb-0">Instant feedback</p>
                        </div>
                      </div>
                    </div>

                    <AnimatedButton
                      variant="primary"
                      size="lg"
                      onClick={handleStartQuiz}
                      className="btn-cta-green"
                    >
                      <FaRocket className="me-2" />Start Quiz
                    </AnimatedButton>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    )
  }

  if (showResults) {
    const scoreInfo = getScoreMessage()
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Container className="py-5">
          <Row>
            <Col lg={10} className="mx-auto">
              <motion.div
                className="quiz-results slide-up"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-5">
                  <div className="score-display">{percentage}%</div>
                  <Alert variant={scoreInfo.variant} className="d-inline-block">
                    <h4 className="mb-2">{scoreInfo.message}</h4>
                    <p className="mb-0">{scoreInfo.description}</p>
                  </Alert>
                  <p className="lead">
                    You answered <strong>{score}</strong> out of <strong>{totalQuestions}</strong> questions correctly.
                  </p>
                </div>

                {/* Detailed Results */}
                <h3 className="text-primary-custom mb-4"><FaChartBar className="me-2" />Detailed Results</h3>
                {quiz.questions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer
                  
                  return (
                    <motion.div
                      key={question.id}
                      className="mb-4"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className={`question-card ${isCorrect ? 'border-success' : 'border-danger'}`}>
                        <Card.Body>
                          <div className="d-flex align-items-start justify-content-between mb-3">
                            <span className="question-number">Question {index + 1}</span>
                            <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'}`}>
                              {isCorrect ? (<><FaCheckCircle className="me-1" />Correct</>) : (<><FaTimesCircle className="me-1" />Incorrect</>)}
                            </span>
                          </div>
                          
                          <h5 className="mb-3">{question.question}</h5>
                          
                          <div className="mb-3">
                            {question.options.map((option, optionIndex) => {
                              let optionClass = 'quiz-option'
                              
                              if (optionIndex === question.correctAnswer) {
                                optionClass += ' correct'
                              } else if (optionIndex === userAnswer && !isCorrect) {
                                optionClass += ' incorrect'
                              }
                              
                              return (
                                <div key={optionIndex} className={optionClass}>
                                  <strong>{String.fromCharCode(65 + optionIndex)}.</strong> {option}
                                  {optionIndex === question.correctAnswer && (
                                    <FaCheckCircle className="ms-2" />
                                  )}
                                  {optionIndex === userAnswer && !isCorrect && (
                                    <FaTimesCircle className="ms-2" />
                                  )}
                                </div>
                              )
                            })}
                          </div>
                          
                          <Alert variant="info" className="mb-0">
                            <strong>Explanation:</strong> {question.explanation}
                          </Alert>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  )
                })}

                <div className="text-center mt-5">
                  <AnimatedButton
                    variant="primary"
                    size="lg"
                    onClick={handleRestartQuiz}
                    className="me-3"
                  >
                    <FaRocket className="me-2" />Take Quiz Again
                  </AnimatedButton>
                  {lessonContext ? (
                    <AnimatedButton
                      variant="outline-primary"
                      size="lg"
                      onClick={handleBackToLesson}
                    >
                      <FaBook className="me-2" />Back to {lessonContext.lesson.title}
                    </AnimatedButton>
                  ) : (
                    <AnimatedButton
                      variant="outline-primary"
                      size="lg"
                      onClick={() => navigate('/lessons')}
                    >
                      <FaBook className="me-2" />Back to Lessons
                    </AnimatedButton>
                  )}
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    )
  }

  const currentQ = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Container className="py-5 quiz-container">
        <Row>
          <Col lg={10} className="mx-auto">
            {/* Progress Bar */}
            <motion.div
              className="mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Progress</span>
                <span className="text-muted">
                  {currentQuestion + 1} of {totalQuestions}
                </span>
              </div>
              <ProgressBar now={progress} className="mb-4" style={{ height: '8px' }} />
            </motion.div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="question-card">
                  <Card.Body className="p-4">
                    <span className="question-number">
                      Question {currentQuestion + 1}
                    </span>
                    <h4 className="mb-4">{currentQ.question}</h4>
                    
                    <div className="mb-4">
                      {currentQ.options.map((option, index) => (
                        <div
                          key={index}
                          className={`quiz-option ${
                            selectedAnswers[currentQ.id] === index ? 'selected' : ''
                          }`}
                          onClick={() => handleAnswerSelect(currentQ.id, index)}
                        >
                          <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              className="d-flex justify-content-between mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                {currentQuestion > 0 && (
                  <Button
                    variant="outline-secondary"
                    onClick={handlePreviousQuestion}
                  >
                    ← Previous
                  </Button>
                )}
              </div>
              
              <div>
                <AnimatedButton
                  variant="primary"
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQ.id] === undefined}
                >
                  {currentQuestion === totalQuestions - 1 ? (<><FaFlag className="me-2" />Finish Quiz</>) : 'Next →'}
                </AnimatedButton>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  )
}

export default Quiz