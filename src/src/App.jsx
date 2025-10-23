import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EmotionEngine from './components/EmotionEngine'
import InterfaceAdapter from './components/InterfaceAdapter'
import ContextWebSocket from './services/ContextWebSocket'
import { useEmotionDetection } from './hooks/useEmotionDetection'
import './App.css'

function App() {
  const [currentContext, setCurrentContext] = useState('default')
  const [userMetrics, setUserMetrics] = useState({
    emotion: 'neutral',
    confidence: 0,
    attention: 1.0,
    stressLevel: 0.2
  })
  
  const { emotionData, startDetection, stopDetection } = useEmotionDetection()
  const websocket = ContextWebSocket()

  useEffect(() => {
    startDetection()
    
    websocket.connect((data) => {
      setCurrentContext(data.detectedScenario)
      setUserMetrics(prev => ({
        ...prev,
        ...data.userMetrics
      }))
    })

    return () => {
      stopDetection()
      websocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (emotionData) {
      websocket.sendEmotionData(emotionData)
    }
  }, [emotionData])

  return (
    <div className="contextflow-app">
      <EmotionEngine 
        onEmotionUpdate={setUserMetrics}
        enabled={true}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentContext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <InterfaceAdapter 
            context={currentContext}
            userMetrics={userMetrics}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
