import { View, Text } from 'react-native'
import React from 'react'
import Speedometer from 'react-native-speedometer-chart';

export default function ArchChartSpeedometer(props) {
  return (
    <View >
        <View >
     <Speedometer outerColor="#d3d3d3"
    internalColor="#f45830" value={50} totalValue={100}/>
      </View>
       <View>
     <Speedometer  outerColor="#d3d3d3"
    internalColor="#fea90e"  value={50} totalValue={100}/>
     </View>
    </View>
  )
}