// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import * as Svg from 'react-native-svg';

// const ArchChart = () => {
//   return (
//     <View style={styles.container}>
//       <Svg.Svg height="100" width="100">
//         <Svg.Path
//           d="M 10 90
//              A 15 15, 0, 0, 1, 40 90"
//           stroke="black"
//           fill="none"
//           strokeWidth={30}
//         />
//       </Svg.Svg>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default ArchChart;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import { FontSize } from '../../../../assets/fonts/Fonts';

// const dataf = [{y: 100}];
// const datas = [{ y: 100}];

const ArchChartVishwas = props => {
  // const [percentage, setPercentage] = useState(data[0].y)
  // const [percentage2, setPercentage2] = useState(data1[0].y)
  const startAngle = -90;
  const convertIntoPercentage = value => {
    // alert(value)
    if (value == 50) {
      return 0;
    } else if (value < 50) {
      return -(50 - (value - 10));
      // return startAngle + value
    } else if (value > 50) {
      return value - 12;
    } else {
      return 88;
    }
  };
  const percentage = convertIntoPercentage(props.data.firstValue[0].y);
  const percentage1 = convertIntoPercentage(props.data.secondValue[0].y);

  return (
    <View
      style={{
        ...styles.container

      }}>
      <Text style={{...styles.title_txt}}>
        {props.data.title}
      </Text>
      <VictoryPie
        data={props.data.firstValue}
        innerRadius={500}
        padAngle={10}
        startAngle={startAngle}
        endAngle={90}
        colorScale={['#f45831', '#ff2d55', '#5856d6']}
        // style={{labels: {fontSize: 20, fill: 'white'}}}
        labels={({ datum }) => `${datum.y}`}
        labelRadius={({ innerRadius }) => innerRadius + 5}
        labelPosition={({ index }) => (index ? 'centroid' : 'endAngle')}
        style={{
          data: {
            fillOpacity: 0.9, stroke: "#c43a31", strokeWidth: 3
          },
          labels: {
            fontSize: 12,
            fill: '#f45831',
          },
        }}
      />
      <View style={{ position: 'relative', }}>
        <VictoryPie
          data={props.data.secondValue}
          innerRadius={10}
          padAngle={10}
          startAngle={startAngle}
          endAngle={percentage1}
          // width={400}
          height={300}
          style={{
            // data: {
            //   fillOpacity: 0.9, stroke: "#c43a31", strokeWidth: 3
            // },
            labels: {
              fontSize: 12,
              fill: '#fea90d',
            },
          }}
          colorScale={['#fea90d', '#5856d6']}
          // style={{labels: {fontSize: 20, fill: 'white'}}}
          labels={({ datum }) => `${datum.y}`}
          labelRadius={({ innerRadius }) => innerRadius - 15}
          labelPosition={({ index }) => (index ? 'centroid' : 'endAngle')}
        />
      </View>
      {/* <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          // backgroundColor: 'yellow',
          // flexDirection: 'row',
          alignItems: 'center',
          // width: '100%',
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
          <View style={{width: 15, height: 15, backgroundColor: '#f45831'}} />
          <Text style={{fontSize: FontSize.labelText, marginLeft: 10}}>
            {props.data.label1}
          </Text>
        </View>
        <View style={{marginVertical: 2}} />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
          <View style={{width: 15, height: 15, backgroundColor: '#fea90d'}} />
          <Text style={{fontSize: FontSize.labelText, marginLeft: 10}}>
            {props.data.label2}
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default ArchChartVishwas;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // height: 220,
    overflow: 'hidden',
    // width: 370,
    alignSelf: 'center',
    borderRadius: 12,
    // position: 'relative',
  },
  title_txt: {
    position: 'relative', left: 20, top: 10
  }
})

ArchChartVishwas.defaultProps = {
  data: {
    title: 'Dr. Covegage Complience',
    label1: 'Doctor Coverage',
    label2: 'Visit Frequency',
    firstValue: [{ y: 120 }],
    secondValue: [{ y: 60 }],
  },
};
