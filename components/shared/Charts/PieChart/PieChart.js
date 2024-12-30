import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import { FontFamily } from '../../../../assets/fonts/FontFamily';

const data = [
  { x: 'Azithral OS 9 sec.', y: 70 },
  { x: 'Laveta 00.00.01', y: 50 },
  { x: 'Laveta 00.00.01', y: 30 },
  { x: 'Laveta 00.00.01', y: 20 },
  { x: 'Laveta 00.00.01', y: 10 },
];

export default function PieChart(props) {
  const [show, setShow] = React.useState(true);



  return (
    <>


      <VictoryPie
        data={props.data}
        width={props.width}
        colorScale={props.colorArray}
        labelRadius={25}
        style={{
          labels: {
            fill: 'white',
            fontFamily: FontFamily.TTCommonsDemiBold,
            fontSize: props.fontSize,
          },
          data: {
            fillOpacity: 1, stroke: "black", strokeWidth: 0.5
          },
        }}
        labelPosition={({ index }) => ('centroid')}
        labelPlacement={({ index }) => ('parallel')}
      />

    </>
  );
}

PieChart.defaultProps = {
  data: data,
  width: 400,
  height: 300,
  right: 30,
  colorArray: ['red', 'blue'],
  fontSize:10
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 250,
    width: '100%',
    backgroundColor: 'white',
    right: 15,
  },
});
