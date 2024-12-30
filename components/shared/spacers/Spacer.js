import { View, Text } from 'react-native'
import React from 'react'

const Spacer = (props) => {
  return (
    <View style={{width:'100%',height:props.h}} />
  )
}

export default Spacer
Spacer.defaultProps={
    h:10
}