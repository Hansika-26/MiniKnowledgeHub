import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Alert, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaCommentDots, FaPhone, FaComments, FaUsers, FaQuestionCircle, FaBug, FaBookOpen, FaRocket, FaPaperPlane } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import AnimatedButton from '../components/AnimatedButton'
import bannerImage from '../assets/banner.png'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Contact - Mini Knowledge Hub'
  }, [])

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // EmailJS configuration with your credentials
    const serviceId = 'service_m0okajn'  // Your Service ID
    const templateId = 'template_d2eei15'  // Your Template ID
    const publicKey = 'ikE4ovmKcrRL6IIxk'  // Your Public Key

    // Template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      to_name: 'Kaumini Hasik',
      to_email: 'kauminihasik2002@gmail.com',  // Your receiving email
      subject: `Message from ${formData.name} <${formData.email}>`,
      sender_info: `${formData.name} (${formData.email})`,
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message,
      timestamp: new Date().toLocaleString()
    }

    // Debug: Log the parameters being sent
    console.log('Sending EmailJS with parameters:', templateParams)
    console.log('Using Service ID:', serviceId)
    console.log('Using Template ID:', templateId)
    console.log('Using Public Key:', publicKey)

    try {
      // Initialize EmailJS with your public key
      emailjs.init(publicKey)
      
      // Send email using EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      console.log('EmailJS Success:', response)
      
      // Success: Show success message and reset form
      setShowSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setErrors({})  // Clear any previous errors
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      
      // Show detailed error message
      let errorMessage = 'Failed to send message. Please try again later.'
      if (error.text) {
        errorMessage = `Error: ${error.text}`
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`
      }
      
      setErrors({ submit: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <FaEnvelope size={32} />,
      title: 'Email Us',
      description: 'Send us your questions or feedback',
      value: 'kauminihasik2002@gmail.com'
    },
    {
      icon: <FaComments size={32} />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Available 24/7'
    },
    {
      icon: <FaUsers size={32} />,
      title: 'Social Media',
      description: 'Follow us for updates',
      value: '@miniknowledgehub'
    }
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
            <Col lg={8} className="ms-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hero-content"
              >
                <h1 className="hero-title"><FaEnvelope className="me-3" />Get In Touch</h1>
                <p className="hero-subtitle">
                  Have questions, suggestions, or feedback? We'd love to hear from you! 
                  Send us a message and we'll get back to you as soon as possible.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form Section */}
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto">
            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <Alert variant="success" className="success-message">
                  <div className="d-flex align-items-center">
                    <span className="me-3 text-success" style={{ fontSize: '2rem' }}><FaEnvelope /></span>
                    <div>
                      <h5 className="mb-1">Thank you for your message!</h5>
                      <p className="mb-0">
                        We've received your message and will get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </Alert>
              </motion.div>
            )}

            {/* Contact Form */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="shadow-custom">
                <Card.Body className="p-5">
                  <h2 className="text-primary-custom mb-4 text-center">Send Us a Message</h2>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>
                            <FaUser className="me-2" /><strong>Name *</strong>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            isInvalid={!!errors.name}
                            className="form-control-lg"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>
                            <FaEnvelope className="me-2" /><strong>Email Address *</strong>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            isInvalid={!!errors.email}
                            className="form-control-lg"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FaCommentDots className="me-2" /><strong>Message *</strong>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        isInvalid={!!errors.message}
                        className="form-control-lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.message}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Minimum 10 characters required
                      </Form.Text>
                    </Form.Group>
                    
                    {/* Error message for submission failures */}
                    {errors.submit && (
                      <Alert variant="danger" className="mb-3">
                        {errors.submit}
                      </Alert>
                    )}
                    
                    <div className="text-center">
                      <AnimatedButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="px-5 btn-cta-green"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="me-2" />Send Message
                          </>
                        )}
                      </AnimatedButton>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Contact Information */}
      <section className="section-light py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="section-title">Other Ways to Reach Us</h2>
              </motion.div>

              <Row>
                {contactInfo.map((info, index) => (
                  <Col md={4} className="mb-4" key={index}>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    >
                      <Card className="feature-card h-100 border-0 shadow-custom">
                        <Card.Body className="text-center p-4">
                          <div className="about-icon text-primary">{info.icon}</div>
                          <h4 className="text-primary-custom mb-3">{info.title}</h4>
                          <p className="text-muted mb-2">{info.description}</p>
                          <p className="fw-bold text-dark">{info.value}</p>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <Container className="py-5">
        <Row>
          <Col lg={10} className="mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h2 className="section-title">Frequently Asked Questions</h2>
            </motion.div>

            <Row>
              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <Card className="border-0 bg-light-custom h-100">
                    <Card.Body className="p-4">
                      <h5 className="text-primary-custom mb-3"><FaQuestionCircle className="me-2" />How can I suggest new lesson topics?</h5>
                      <p className="text-muted mb-0">
                        We love hearing your suggestions! Use the contact form above to share 
                        your ideas for new lessons or topics you'd like to see covered.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>

              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <Card className="border-0 bg-light-custom h-100">
                    <Card.Body className="p-4">
                      <h5 className="text-primary-custom mb-3"><FaBug className="me-2" />How do I report a bug or issue?</h5>
                      <p className="text-muted mb-0">
                        If you encounter any technical issues or bugs, please describe the 
                        problem in detail using our contact form, and we'll investigate promptly.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>

              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <Card className="border-0 bg-light-custom h-100">
                    <Card.Body className="p-4">
                      <h5 className="text-primary-custom mb-3"><FaBookOpen className="me-2" />Can I contribute content?</h5>
                      <p className="text-muted mb-0">
                        We welcome contributions from the community! Reach out to us if you're 
                        interested in creating lessons or quiz questions.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>

              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <Card className="border-0 bg-light-custom h-100">
                    <Card.Body className="p-4">
                      <h5 className="text-primary-custom mb-3"><FaRocket className="me-2" />How fast is your response time?</h5>
                      <p className="text-muted mb-0">
                        We typically respond to all inquiries within 24 hours. For urgent 
                        technical issues, we aim to respond within a few hours.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </motion.div>
  )
}

export default Contact