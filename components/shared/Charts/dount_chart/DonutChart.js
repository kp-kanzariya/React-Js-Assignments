import React from 'react';
import {View, } from 'react-native';
import {VictoryPie, VictoryLabel} from 'victory-native';
import { FontFamily } from '../../../../assets/fonts/FontFamily';

const data = [
  { y: '100', labels: 'label1'},
  { y: '18', labels: 'label2',color:'yellow'},
  { y: '4', labels: 'label3',color:'blue'},
  // {x: 'D', y: 0, labels: 'label4'},
];

const DonutChart = (props) => {
 let colorArr = props.data.reduce((arr,i)=>{
  arr.push(i.color)
  return arr
 },[])

 return (
    <View style={{}} >
      <VictoryPie
        data={props.data}
        innerRadius={props.size / 5.7}
        padAngle={1/2}
        cornerRadius={2}
        width={300}
        height={props.size}
        labelRadius={({innerRadius}) => innerRadius + props.valuePosition}
        colorScale={colorArr}
        labels={({datum}) => `${datum.y}${props?.percent}`}
        style={{labels: {fill: props.labelColor, fontSize: props.labelFont, fontFamily:FontFamily.TTCommonsDemiBold}}}
      />
    </View>
  );
};

export default DonutChart;
DonutChart.defaultProps={
  size:300,
  data:data,
  labelColor:'white',
  labelFont:12,
  percent:'',
  valuePosition:2
}
