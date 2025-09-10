import React from 'react'
import { Button } from 'react-bootstrap'
import { motion } from 'framer-motion'

const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        className={`animated-button ${className}`}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}

export default AnimatedButton