import React, { useEffect, useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as blazeface from '@tensorflow-models/blazeface'
import { emotionClassifier } from '../services/EmotionClassifier'

const EmotionEngine = ({ onEmotionUpdate, enabled = true }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [model, setModel] = useState(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const detectionInterval = useRef()

  useEffect(() => {
    if (enabled) {
      initializeModels()
    } else {
      stopDetection()
    }

    return () => stopDetection()
  }, [enabled])

  const initializeModels = async () => {
    try {
      await tf.ready()
      const faceModel = await blazeface.load()
      setModel(faceModel)
      
      await setupCamera()
      startDetection()
    } catch (error) {
      console.error('Error initializing models:', error)
    }
  }

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      })
      videoRef.current.srcObject = stream
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const startDetection = () => {
    if (!model || !videoRef.current) return
    
    setIsDetecting(true)
    detectionInterval.current = setInterval(async () => {
      await detectEmotion()
    }, 1000) // Detect every second
  }

  const stopDetection = () => {
    setIsDetecting(false)
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current)
    }
  }

  const detectEmotion = async () => {
    if (!model || !videoRef.current) return

    try {
      const predictions = await model.estimateFaces(videoRef.current, false)
      
      if (predictions.length > 0) {
        const emotionResult = await emotionClassifier.classify(videoRef.current)
        
        onEmotionUpdate({
          emotion: emotionResult.emotion,
          confidence: emotionResult.confidence,
          attention: calculateAttention(predictions[0]),
          stressLevel: calculateStressLevel(emotionResult, predictions[0])
        })
      }
    } catch (error) {
      console.error('Error detecting emotion:', error)
    }
  }

  const calculateAttention = (facePrediction) => {
    // Calculate attention based on head pose and eye landmarks
    const landmarks = facePrediction.landmarks
    // Simplified attention calculation
    return Math.random() // Replace with actual calculation
  }

  const calculateStressLevel = (emotion, facePrediction) => {
    // Calculate stress based on facial tension and emotion
    if (emotion.emotion === 'angry' || emotion.emotion === 'fear') {
      return 0.8
    } else if (emotion.emotion === 'happy') {
      return 0.1
    }
    return 0.3
  }

  return (
    <div className="emotion-engine" style={{ display: 'none' }}>
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef} />
    </div>
  )
}

export default EmotionEngine
