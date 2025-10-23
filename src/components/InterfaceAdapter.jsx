import React from 'react'
import EmergencyInterface from './interfaces/EmergencyInterface'
import CreativeInterface from './interfaces/CreativeInterface'
import AnalyticalInterface from './interfaces/AnalyticalInterface'
import FocusInterface from './interfaces/FocusInterface'
import DefaultInterface from './interfaces/DefaultInterface'

const InterfaceAdapter = ({ context, userMetrics }) => {
  
  const getInterfaceComponent = () => {
    switch (context) {
      case 'emergency':
        return EmergencyInterface
      case 'creative':
        return CreativeInterface
      case 'analytical':
        return AnalyticalInterface
      case 'focused':
        return FocusInterface
      default:
        return DefaultInterface
    }
  }

  const InterfaceComponent = getInterfaceComponent()

  return (
    <div className={`interface-adapter context-${context}`}>
      <InterfaceComponent userMetrics={userMetrics} />
    </div>
  )
}

export default InterfaceAdapter
