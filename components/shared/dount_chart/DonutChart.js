import React from 'react';
import { View, } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { FontSize } from '../../../assets/fonts/Fonts';

const data = [
  { x: 'A', y: 28, labels: 'label1', color: 'red' },
  { x: 'B', y: 18, labels: 'label2', color: 'yellow' },
  { x: 'C', y: 4, labels: 'label3', color: 'blue' },
  // {x: 'D', y: 0, labels: 'label4'},
];
const DonutChart = props => {

  // let colorArr = props?.data?.reduce((arr, i) => {
  //   arr.push(i?.color)
  //   return arr
  // }, [])

  return (
    <View style={{}} >
      <VictoryPie
        data={props.data}
        innerRadius={props.size / 6}
        padAngle={props.segmentsGap}
        cornerRadius={2}
        width={300}

        height={props.size}
        labelRadius={({ innerRadius }) => innerRadius + props.awayFrom}
        colorScale={props.colorArr}
        labels={({ datum }) => `${datum.y}`}
        style={{ labels: { fill: props.labelColor, fontSize: props.labelFont, fontFamily: FontFamily.TTCommonsMedium } }}
      />
    </View>
  );
};

export default DonutChart;
DonutChart.defaultProps = {
  size: 300,
  data: data,
  labelColor: 'white',
  labelFont: 12,
  segmentsGap: 1,
  awayFrom: 5
}
