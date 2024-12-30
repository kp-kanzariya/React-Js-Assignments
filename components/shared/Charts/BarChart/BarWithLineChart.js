import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Colors } from '../../../../assets/config/Colors';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
  VictoryScatter,
  VictoryAxis,
  VictoryGroup,
} from 'victory-native';
import { FontFamily } from '../../../../assets/fonts/FontFamily';
import { Svg } from 'react-native-svg';

const data = [
  { x: 'Jan 2022', y: '5' },
  { x: 'Feb 2023', y: '10' },
  { x: 'March 2022', y: '15' },
  { x: 'April 2022', y: '20' },
  // {x: 'May 2023', y: '35'},
  // {x: 'Feb 2023', y: '10'},
  // {x: 'March 2023', y: '5'},
  // {x: 'April 2023', y: '14'},
  // {x: 'May 2023', y: '5'},
  // {x: 'June 2023', y: '27'},
  // {x: 'July 2023', y: '35'},
  // {x: 'Aug 2023', y: '10'},
];

const data1 = [
  { x: 'May 2023', y: '45' },
  { x: 'June 2023', y: '50' },
  { x: 'July 2023', y: '55' },
  { x: 'Aug 2023', y: '60' },
  { x: 'Jan 2023', y: '30' },
  { x: 'Feb 2023', y: '20' },
  { x: 'March 2023', y: '5' },
  { x: 'April 2023', y: '14' },
  // {x: 'May 2023', y: '5'},
  // {x: 'June 2023', y: '27'},
  // {x: 'July 2023', y: '35'},
  // {x: 'Aug 2023', y: '10'},
];

const data2 = [
  { x: 'Sep 2022', y: '45' },
  { x: 'Oct 2023', y: '50' },
  { x: 'Nov 2023', y: '55' },
  { x: 'Dec 2023', y: '60' },
  // {x: 'Jan 2023', y: '30'},
  // {x: 'Feb 2023', y: '20'},
  // {x: 'March 2023', y: '5'},
  // {x: 'April 2023', y: '14'},
  // {x: 'May 2023', y: '5'},
  // {x: 'June 2023', y: '27'},
  // {x: 'July 2023', y: '35'},
  // {x: 'Aug 2023', y: '10'},
];

export default function BarWithLineChart(props) {


  return (
    <View>
      <ScrollView horizontal>
        <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'flex-start' }}>
          {/* <Svg viewBox={"0 0 width, height"} preserveAspectRatio="none" width="100%"> */}
          <VictoryChart


            height={200}
            width={props.getLength > 6 ? 800 : 450}
            responsive={true}
            domainPadding={{ x: 25, y: 10 }}
            theme={VictoryTheme.material}
          >
            <VictoryGroup offset={25} colorScale={'qualitative'}>
              <VictoryBar
                renderInPortal={false}
                data={props.data2}
                x={props.x}
                y={props.y}
                labels={({ datum }) => datum._y > 999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y > 9999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y}

                style={{ data: { fill: props.barColor } }}
                barWidth={({ index }) => 25}
              />
              <VictoryBar
                renderInPortal={false}
                data={props.data}
                // x={props.x_key_name}
                // y={props.y_key_name}
                labels={({ datum }) => datum._y > 999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y > 9999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y}


                style={{ data: { fill: props.secondbarColor } }}
                barWidth={({ index }) => 25}
              />
            </VictoryGroup>
            <VictoryLine
              renderInPortal={false}
              data={props.data1}
              // labels={({ datum }) => datum._y > 999 ? `${parseInt(datum._y / 1000).toFixed(1)}k` : datum._y > 9999 ? `${parseInt(datum._y / 1000).toFixed(1)}k` : datum._y}

              // labels={({datum}) => datum.y}

              style={{
                data: { stroke: '#50B030', strokeWidth: 1 },
                labels: {},
              }}
            />
            <VictoryScatter
              renderInPortal={false}
              data={props.data1}
              // labels={({datum}) => datum.y}
              labels={({ datum }) => datum._y > 999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y > 9999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y}
              // labels={["10","20","30","40","50","60"]}
              style={{
                // data: {stroke: '#50B030', strokeWidth: 1},
                labels: { color: 'green' },
              }}
            />
          </VictoryChart>
          {/* </Svg> */}
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', bottom: 20 }}>
        <View
          style={{ ...styles.viewstyle, backgroundColor: props.barColor, borderRadius: 2 }}
        />
        <Text
          style={{
            ...styles.TargetText,
            color: props.firstBarColor,
            fontFamily: FontFamily.TTCommonsMedium,
          }}>
          {props.firstTitle}{' '}
        </Text>
        <View style={{ paddingHorizontal: 10 }} />
        <View
          style={{ ...styles.viewstyle, backgroundColor: props.secondbarColor, borderRadius: 2 }}
        />
        <Text
          style={{
            ...styles.TargetText,
            color: props.secondBarColor,
            fontFamily: FontFamily.TTCommonsMedium,
          }}>
          {props.secondTitle}{' '}
        </Text>
        <View style={{ paddingHorizontal: 10 }} />
        <View
          style={{ ...styles.viewstyle, backgroundColor: 'green', borderRadius: 2 }}
        />
        <Text
          style={{
            ...styles.TargetText,
            color: "green",
            fontFamily: FontFamily.TTCommonsMedium,
          }}>
          {props.thirdTitle}{' '}
        </Text>
      </View>
    </View>
  );
}

BarWithLineChart.defaultProps = {
  barColor: '#34ACD3',
  secondbarColor: 'blue',
  x_key_name: 'x',
  y_key_name: 'y',
  width: 450,
  barWidth: 15,
  height: 200,
  firstTitle: 'Own',
  secondTitle: 'Competitor',
  thirdTitle: 'Prescribers',
  data: data,
  data1: data1,
  data2: data2
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    // height: 200,
  },
  viewstyle: {
    width: 12,
    height: 12,
    backgroundColor: '',
    right: 4,
  },
});
