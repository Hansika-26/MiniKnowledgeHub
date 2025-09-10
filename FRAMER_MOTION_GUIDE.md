# 🎭 Framer Motion Guide for Mini Knowledge Hub

This guide covers practical Framer Motion examples and techniques used in your Mini Knowledge Hub project.

## 📚 Table of Contents

1. [Basic Setup](#basic-setup)
2. [Animation Types](#animation-types)
3. [Common Patterns](#common-patterns)
4. [Performance Tips](#performance-tips)
5. [Examples from Your Project](#examples-from-your-project)

## 🚀 Basic Setup

First, make sure you have Framer Motion installed:
```bash
npm install framer-motion
```

Import in your components:
```jsx
import { motion, AnimatePresence } from 'framer-motion'
```

## 🎨 Animation Types

### 1. **Basic Motion Component**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content here
</motion.div>
```

### 2. **Hover & Tap Animations**
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click me!
</motion.button>
```

### 3. **Drag Animations**
```jsx
<motion.div
  drag
  dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
  whileDrag={{ scale: 1.1 }}
>
  Drag me around!
</motion.div>
```

### 4. **Stagger Animations**
```jsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div variants={container} initial="hidden" animate="visible">
  {items.map((item, index) => (
    <motion.div key={index} variants={item}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### 5. **AnimatePresence for Enter/Exit**
```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      Content that can appear/disappear
    </motion.div>
  )}
</AnimatePresence>
```

## 🔧 Common Patterns

### **Page Transitions**
```jsx
// In your page component
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Page content */}
</motion.div>
```

### **Loading Animations**
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
>
  ⭐
</motion.div>
```

### **Success/Error Feedback**
```jsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 500, damping: 30 }}
  className="success-message"
>
  Success! ✅
</motion.div>
```

### **Card Hover Effects**
```jsx
<motion.div
  whileHover={{ 
    y: -10,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
  }}
  transition={{ duration: 0.3 }}
  className="card"
>
  Card content
</motion.div>
```

### **Progressive Disclosure**
```jsx
const [expanded, setExpanded] = useState(false)

<motion.div
  layout
  onClick={() => setExpanded(!expanded)}
>
  <motion.h3 layout>Title</motion.h3>
  {expanded && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      Additional content
    </motion.div>
  )}
</motion.div>
```

## ⚡ Performance Tips

### 1. **Use transform properties** (x, y, scale, rotate)
```jsx
// ✅ Good - uses transform
<motion.div animate={{ x: 100 }} />

// ❌ Avoid - triggers layout
<motion.div animate={{ left: "100px" }} />
```

### 2. **Layout animations for position changes**
```jsx
<motion.div layout>
  {/* Content that might change position */}
</motion.div>
```

### 3. **Optimize with willChange**
```jsx
<motion.div
  style={{ willChange: "transform" }}
  whileHover={{ scale: 1.1 }}
>
  Optimized hover
</motion.div>
```

## 🎯 Examples from Your Project

### **Hero Section Animation (Home.jsx)**
```jsx
<motion.div
  initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <h1 className="hero-title">Welcome to Mini Knowledge Hub</h1>
</motion.div>
```

### **Lesson Cards with Stagger (Lessons.jsx)**
```jsx
{filteredLessons.map((lesson, index) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
    key={lesson.id}
  >
    <LessonCard lesson={lesson} />
  </motion.div>
))}
```

### **Success Message (Contact.jsx)**
```jsx
{showSuccess && (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Alert variant="success">Message sent!</Alert>
  </motion.div>
)}
```

### **Navigation Animation (Navigation.jsx)**
```jsx
<motion.header
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.5 }}
>
  <Navbar>...</Navbar>
</motion.header>
```

## 🎪 Advanced Techniques

### **Gesture Recognition**
```jsx
<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  onDragEnd={(event, info) => {
    if (info.offset.x > 100) {
      // Swiped right
    }
  }}
>
  Swipe me!
</motion.div>
```

### **Scroll-triggered Animations**
```jsx
import { useScroll, useTransform } from 'framer-motion'

const { scrollY } = useScroll()
const opacity = useTransform(scrollY, [0, 300], [1, 0])

<motion.div style={{ opacity }}>
  Fades out on scroll
</motion.div>
```

### **Complex Keyframe Animations**
```jsx
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
  }}
/>
```

### **Controlled Animations**
```jsx
import { useAnimation } from 'framer-motion'

const controls = useAnimation()

const handleClick = async () => {
  await controls.start({ scale: 1.2 })
  await controls.start({ scale: 1 })
}

<motion.div animate={controls} onClick={handleClick}>
  Click for controlled animation
</motion.div>
```

## 🎨 CSS Integration

You can combine Framer Motion with CSS for powerful effects:

```css
.animated-card {
  transform-origin: center;
  transition: box-shadow 0.3s ease;
}

.animated-card:hover {
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
```

```jsx
<motion.div
  className="animated-card"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Combined CSS and Framer Motion
</motion.div>
```

## 🚀 Quick Start Checklist

- [ ] Install `framer-motion`
- [ ] Import `motion` components
- [ ] Start with basic `initial`, `animate`, `transition`
- [ ] Add hover effects with `whileHover`
- [ ] Use `AnimatePresence` for conditional rendering
- [ ] Implement stagger animations for lists
- [ ] Add page transitions
- [ ] Optimize with transform properties

Visit `/examples` in your application to see all these techniques in action!

## 📖 Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Motion Examples](https://www.framer.com/motion/examples/)
- [Animation Principles](https://www.framer.com/motion/guide/)

---

*This guide is specifically tailored for your Mini Knowledge Hub project. All examples are ready to use in your React components!*