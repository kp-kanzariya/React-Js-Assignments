import * as React from "react"
import { StyleSheet, Text, View } from 'react-native'
import { Svg, Circle } from 'react-native-svg';

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

function ArchChart(props) {

  const [progress, setProgress] = React.useState(0);

  const handlePress = () => {
    const newProgress = progress + 10;
    setProgress(newProgress > 100 ? 0 : newProgress);
  };

  const getStrokeOffset = (progress) => {
    const circumference = 2 * Math.PI * outerRadius;
    const offset = (100 - progress) * circumference / 100;
    return `${offset} ${circumference}`;
  };


  return (
    <View style={{ ...styles.container }}>
      <Svg width={outerRadius * 2} height={outerRadius}
        onPress={handlePress}
      >
        <Circle
          cx={outerRadius}
          cy={outerRadius}
          r={outerRadius - strokeWidth / 2}
          stroke={outerStrokeColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={outerRadius}
          cy={outerRadius}
          r={innerRadius + strokeWidth / 2}
          stroke={innerStrokeColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

      </Svg>
    </View>

  )
}

const styles = StyleSheet.create({
container:{
  width: 250, height: 160, backgroundColor: '#FFF', justifyContent: "center", alignItems: 'center'
}
})


ArchChart.defaultProps = {
  width: 300,
  height: 200
}

export default ArchChart
