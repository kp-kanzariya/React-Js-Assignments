import React from 'react';
import { View, Text,StyleSheet } from 'react-native'
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import { Svg, Circle } from 'react-native-svg';

const size = 200;
const width = 15;
const cropDegree = 90;
const textOffset = width;
const textWidth = size - (textOffset*2);
const textHeight = size*(1 - cropDegree/360) - (textOffset*2);



const outerRadius = 120;
const innerRadius = 60;
const strokeWidth = 30;
const outerStrokeColor = '#f45830';
const innerStrokeColor = '#fea90e';

const getArcCoords = (progress) => {
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (progress / 100) * Math.PI;
  const outerX1 = outerRadius * Math.cos(startAngle);
  const outerY1 = outerRadius * Math.sin(startAngle);
  const outerX2 = outerRadius * Math.cos(endAngle);
  const outerY2 = outerRadius * Math.sin(endAngle);
  const innerX1 = innerRadius * Math.cos(startAngle);
  const innerY1 = innerRadius * Math.sin(startAngle);
  const innerX2 = innerRadius * Math.cos(endAngle);
  const innerY2 = innerRadius * Math.sin(endAngle);
  return {
    outerCoords: `${outerX1},${outerY1} ${outerX2},${outerY2}`,
    innerCoords: `${innerX2},${innerY2} ${innerX1},${innerY1}`,
  };
};

const styles = StyleSheet.create({
  textView: {
    position: 'absolute',
    top: textOffset,
    left: textOffset,
    width: textWidth,
    height: textHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
})

const Speedometer = () => {
  const[percent,setPercent]=React.useState(100);

  return (
   <>
   <View style={{backgroundColor:'#FFF'}}>
   <View style={{justifyContent:'center',alignItems:'center',flex:1,alignContent:'center'}}>
   <View style={{position:'relative'}}>
   <GaugeProgress
   size={300}
   width={35}
   fill={percent}
   rotation={90}
   cropDegree={190}
   tintColor="f45830"
   delay={0}
   backgroundColor="#FFF"
   strokeCap="circle"
   renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />} 
   
      
      >
       
      </GaugeProgress>
      </View>

      <View style={{position:'absolute',top:30,zIndex:9999,right:30}}>
   <GaugeProgress
   size={240}
   width={35}
   fill={percent}
   rotation={90}
   cropDegree={190}
   tintColor="#fea90e"
   delay={0}
   backgroundColor="#FFF"
   strokeCap="circle"
      
      >
       
      </GaugeProgress>
      </View>
   </View>
   </View>
 
   </>
  )
}

export default Speedometer 

