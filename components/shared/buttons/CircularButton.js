import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from './ButtonRoot'

const CircularButton = (props) => {
  return (
    <View style={{ position: 'absolute', ...props }} >
      <CustomButton width={60} height={60} borderRadius={100} icon={props.icon} {...props} />
    </View>
  )
}

export default CircularButton

CircularButton.defaultProps = {
  icon: ''
}