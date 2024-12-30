import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
} from 'victory-native';
import {Colors} from '../../../../assets/config/Colors';
import {FontFamily} from '../../../../assets/fonts/FontFamily';
import {useSelector} from 'react-redux';

const data1 = [
  {x: 'Jan', y: 100},
  {x: 'Feb', y: 250},
  {x: 'Mar', y: 250},
  {x: 'Apr', y: 120},
  {x: 'May', y: 300},
  {x: 'Jun', y: 120},
];

const data2 = [
  {x: 'Jan', y: 70},
  {x: 'Feb', y: 180},
  {x: 'Mar', y: 250},
  {x: 'Apr', y: 120},
  {x: 'May', y: 370},
  {x: 'Jun', y: 160},
];

export default function ComparisonBarChart(props) {
  
  const {isLandscape} = useSelector(state => state.isLandscape);
  const {width, height} = Dimensions.get('window');

  return (
    <View style={{...styles.container}}>
      <VictoryChart
        width={isLandscape ? 450 : width * 0.9}
        height={props.height}
        theme={VictoryTheme.material}>
        <VictoryGroup offset={props.offset} colorScale={'qualitative'}>
          <VictoryBar
            data={props.data1}
            style={{data: {fill: props.firstBarColor}}}
            x={props.x_key_name}
            y={props.y_key_name}
          />
          <VictoryBar
            data={props.data2}
            style={{data: {fill: props.secondBarColor}}}
            x={props.x}
            y={props.y}
          />
        </VictoryGroup>
      </VictoryChart>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{...styles.viewstyle, backgroundColor: props.firstBarColor}}
        />
        <Text
          style={{
            ...styles.TargetText,
            color: props.firstBarColor,
            fontFamily: FontFamily.TTCommonsMedium,
          }}>
          {props.firstTitle}{' '}
        </Text>

        <View style={{paddingHorizontal: 10}} />
        <View
          style={{...styles.viewstyle, backgroundColor: props.secondBarColor}}
        />
        <Text
          style={{
            ...styles.TargetText,
            color: props.secondBarColor,
            fontFamily: FontFamily.TTCommonsMedium,
          }}>
          {props.secondTitle}{' '}
        </Text>
      </View>
      <View style={{marginVertical: 5}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.borderColor1,
    position: 'relative',
  },

  viewstyle: {
    width: 12,
    height: 12,
    backgroundColor: '',
    right: 4,
  },
});

ComparisonBarChart.defaultProps = {
  data1: data1,
  data2: data2,
  firstBarColor: '#34ACD3',
  secondBarColor: '#50B030',
  x_key_name: 'x',
  y_key_name: 'y',
  width: 450,
  height: 250,
  offset: 20,
  firstTitle: 'Target',
  secondTitle: 'Achieved',
  containerHeight: 290,
};
