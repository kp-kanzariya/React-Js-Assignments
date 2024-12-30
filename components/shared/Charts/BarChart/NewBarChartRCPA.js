import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import { Svg } from 'react-native-svg';
import { useSelector } from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';
import { Colors } from '../../../../assets/config/Colors';
import { FontFamily } from '../../../../assets/fonts/FontFamily';

const data = [
  
  {x: 'Jan', y: '0 Lcs'},
  {x: 'Feb', y: '5 Lcs'},
  {x: 'Mar', y:'10 Lcs'},
  {x: 'Apr', y: '15 Lcs'},
  {x: 'May', y: '20 Lcs'},
  {x: 'Jun', y: '30 Lcs'},
];

const doctorData = ['10','50','100','200','300','350']
const {width, height} = Dimensions.get('screen');

export default function NewBarChartRCPA(props) {
  const {isLandscape} = useSelector(state => state.isLandscape);
  return (
    <>
    <View style={{justifyContent:'center',alignSelf:'center',width:'100%',padding:10}}>
<Svg viewBox={"0 0 width, height"}  preserveAspectRatio="none" width="0%">
      {/* <View style={{width:'100%',justifyContent:'center',alignSelf:'center',left:isLandscape?40:null}}> */}
      <VictoryChart width={isLandscape?width*0.5:width} height={props.height} theme={VictoryTheme.material} domainPadding={20}>
       <VictoryBar
         data={props.data}
         x={props.x_key_name}
         y={props.y_key_name}
         barWidth={({index}) => index * 2 + props.barWidth}
         style={{data: {fill: props.barColor}, labels: { fill: 'green' }}}   
         height={400}
         labels={doctorData}
       />
     </VictoryChart>
     </Svg>
      {/* </View> */}
      <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'center',alignSelf:'center',}}>
      <View
          style={{...styles.viewstyle, backgroundColor: props.barColor}}
        />
        <Text style={{color: props.barColor,fontFamily:FontFamily.TTCommonsMedium,fontSize:12}}>
          Contribution{' '}
        </Text>


        <View style={{paddingHorizontal: 10}} />
        <View
          style={{...styles.viewstyle, backgroundColor: 'green'}}
        />
        <Text style={{ color:'green',fontFamily:FontFamily.TTCommonsMedium,fontSize:12}}>
          Number of Doctor's{' '}
        </Text>
      </View>
      <View style={{marginVertical:5}} />
    </View>
    </>
  );
}

NewBarChartRCPA.defaultProps = {
  barColor: '#34acd3',
  data: data,
  x_key_name: 'x',
  y_key_name: 'y',
  z_key_name:'z',
  // width:  400,
  height:250,
  barWidth: 20,
  firstTitle: 'Target',
  secondTitle: 'Achieved',
  containerHeight: 290,
  labelColor:'red'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth:1,
    borderRadius:12,
    borderColor:Colors.borderColor1,
    alignSelf:'center',
    width:'100%'
  },
  viewstyle: {
    width: 12,
    height: 12,
    backgroundColor: '',
    right: 4,
  },
});