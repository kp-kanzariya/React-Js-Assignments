import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Label from '../shared/Label';
import SingleBarChart from '../shared/Charts/BarChart/SingleBarChart';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';
import FilterDropdown from '../shared/dropdowns/FilterDropdown';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';

const data = [
  {x: 'Jan', y: 50},
  {x: 'Feb', y: 100},
  {x: 'Mar', y: 250},
  {x: 'Apr', y: 120},
  {x: 'May', y: 400},
  {x: 'Jun', y: 160},
];

const RCPASummary = (props) => {
  const {isLandscape} = useSelector(state => state.isLandscape);
  return (
    <View
      style={{
        marginVertical: 5,
        width: isLandscape ? '49%' : '100%',
        // backgroundColor: 'red',
        // flexDirection: isLandscape ? 'row' : 'column',
      }}>
      <Label
       TOP={4}
       Family={FontFamily.TTCommonsMedium}
       Size={14}
        Label="RCPA Summary"
        lastFilterData={[
          {label: 'Doctor', id: 1},
          {label: 'Chemist', id: 2},
          {label: 'Cardio', id: 3},
          {label: 'Ortho', id: 4},
        ]}
      />
      <View style={{marginVertical: 3}} />
      <View>
        {/* <SingleBarChart width={isLandscape ? 550 : 400} /> */}
        <View style={styles.container}>
            <View style={{width:'100%',height:50,top:15}} >
                <FilterDropdown right={130}/>
                <FilterDropdown right={20}/>
            </View>
          <VictoryChart
            width={isLandscape ? 550 : 400}
            theme={VictoryTheme.material}
            domainPadding={20}>
            <VictoryBar
              data={data}
              x={props.x}
              y={props.y}
              style={{data: {fill: '#34acd3'}}}
              animate={{
                duration: 2000,
                onLoad: {duration: 1500},
              }}
              // height={400}
            />
          </VictoryChart>
        </View>
      </View>
    </View>
  );
};

export default RCPASummary;

const styles = StyleSheet.create({
    container:{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth:1,
    borderRadius:12,
    borderColor:Colors.borderColor1,
    position:'relative'
    }
});
SingleBarChart.defaultProps = {
  // barColor: '#34acd3',

  x_key_name: 'x',
  y_key_name: 'y',
};
