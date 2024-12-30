import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';
import { Colors } from '../../../../assets/config/Colors';

const data = [
  
  {x: 'Jan', y: 50},
  {x: 'Feb', y: 100},
  {x: 'Mar', y: 250},
  {x: 'Apr', y: 120},
  {x: 'May', y: 400},
  {x: 'Jun', y: 160},
];

export default function SingleBarChart(props) {
  return (
    <View style={styles.container}>
      <VictoryChart width={props.width} height={props.height} theme={VictoryTheme.material} domainPadding={20}>
        <VictoryBar
          data={props.data}
          x={props.x}
          y={props.y}
          style={{data: {fill: props.barColor}}}
          animate={{
            duration: 2000,
            onLoad: { duration: 1500 }
          }}
          // height={400}
        />
      </VictoryChart>
    </View>
  );
}

SingleBarChart.defaultProps = {
  barColor: '#34acd3',
  data: data,
  x_key_name: 'x',
  y_key_name: 'y',
  width: 350,
  height:200
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth:1,
    borderRadius:12,borderColor:Colors.borderColor1
  },
});
