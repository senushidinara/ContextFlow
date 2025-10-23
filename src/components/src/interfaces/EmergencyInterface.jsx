import React from 'react'
import { motion } from 'framer-motion'

const EmergencyInterface = ({ userMetrics }) => {
  return (
    <motion.div 
      className="emergency-interface"
      initial={{ backgroundColor: '#ff4444' }}
      animate={{ backgroundColor: '#ff4444' }}
      style={{
        minHeight: '100vh',
        padding: '20px',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold'
      }}
    >
      <div className="emergency-header">
        <h1>🚨 Emergency Mode</h1>
        <p>Simplified interface for critical situations</p>
      </div>
      
      <div className="emergency-actions">
        <button className="emergency-btn" style={{
          padding: '15px 30px',
          fontSize: '16px',
          backgroundColor: 'white',
          color: '#ff4444',
          border: 'none',
          borderRadius: '5px',
          margin: '5px'
        }}>
          🚑 Emergency Services
        </button>
        <button className="emergency-btn" style={{
          padding: '15px 30px',
          fontSize: '16px',
          backgroundColor: 'white',
          color: '#ff4444',
          border: 'none',
          borderRadius: '5px',
          margin: '5px'
        }}>
          📞 Contact Help
        </button>
      </div>

      <div className="vital-info" style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '8px'
      }}>
        <h3>Vital Information:</h3>
        <p>Stress Level: {(userMetrics.stressLevel * 100).toFixed(0)}%</p>
        <p>Detected Emotion: {userMetrics.emotion}</p>
      </div>
    </motion.div>
  )
}

export default EmergencyInterface
