import React, { useState } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,

} from 'victory-native';
import { Colors } from '../../../../assets/config/Colors';
import { FontFamily } from '../../../../assets/fonts/FontFamily';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from "react-native-chart-kit";
import { YAxis, LineChart, } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { G, Line, } from "react-native-svg";

const dataline = Array.from({ length: 10 }).map(
  (unused, i) => i + (i + 1) * Math.random()
)

const data = [

  { x: 'Jan', y: '0 Lcs' },
  { x: 'Feb', y: '5 Lcs' },
  { x: 'Mar', y: '10 Lcs' },
  { x: 'Apr', y: '15 Lcs' },
  { x: 'May', y: '20 Lcs' },
  { x: 'Jun', y: '30 Lcs' },
];

const doctorData = ['10', '50', '100', '200', '300', '350']


export default function VikramTrendChart(props) {
  const [mailModal, setMailModal] = useState(false);
  const data = [55, 85, 55, 85, 55, 85];
  const datac = [55, 55, 85, 59, 55, 54];
  const axesSvg = { fontSize: 10, fill: 'black' };
  const verticalContentInset = { top: 10, bottom: 10 }
  const xAxisHeight = 30

  const CustomGrid = ({ x, y, data, ticks }) => (
    <G>
      {// Horizontal grid
        ticks.map(tick => (
          <Line key={tick} x1={"0%"} x2={"100%"} y1={y(tick)} y2={y(tick)} stroke={'lightgrey'} />
        ))}
      {// Vertical grid
        dataline.map((value, index) => (
          <Line key={index} y1={"0%"} y2={"100%"} x1={x(value)} x2={x(value)} stroke={"red"} />
        ))}
    </G>
  );
  const data2012 = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

  const data2013 = [
    { quarter: 1, earnings: 15000 },
    { quarter: 2, earnings: 12500 },
    { quarter: 3, earnings: 19500 },
    { quarter: 4, earnings: 13000 }
  ];

  const data2014 = [
    { quarter: 1, earnings: 11500 },
    { quarter: 2, earnings: 13250 },
    { quarter: 3, earnings: 20000 },
    { quarter: 4, earnings: 15500 }
  ];

  const data2015 = [
    { quarter: 1, earnings: 18000 },
    { quarter: 2, earnings: 13250 },
    { quarter: 3, earnings: 15000 },
    { quarter: 4, earnings: 12000 }
  ];

  const data1 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
  const data2 = [-87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18]

  const datamain = [
    {
      data: data1,
      svg: { stroke: '#8800cc' },
    },
    {
      data: data2,
      svg: { stroke: 'green' },
    },
  ]
  return (
    <>
      <View style={styles.container}>
        {/* <View >
    <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
        width={350} height={props.height}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Jan", "Feb 2", "March 3", "April 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryStack>
          <VictoryBar
            data={data2015}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2014}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2013}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2012}
            x="quarter"
            y="earnings"
          />
        </VictoryStack>
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
      </VictoryChart>
  </View> */}
        {/* <View style={{ height: 250, padding: 20, width: "90%", flexDirection: "row" }}>
            <YAxis
                style={{ marginBottom: xAxisHeight }}
                data={datanew}
                contentInset={verticalContentInset}
                yAccessor={({ item }) => item.value}
                xAccessor={({ item }) => item.date}
                svg={{ fill:'#000',fontSize: 10,fontWeight: "bold",}}
                numberOfTicks={5}
                
                // formatLabel={value => `${value} ºC`}
            />
            
            <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={datanew}
                    contentInset={verticalContentInset}
                    yAccessor={({ item }) => item.value}
                    xAccessor={({ item }) => item.date}
                    svg={{ stroke: Colors.MRGREEN,strokeWidth: 2 }}
                    scale={scale.scaleTime}
                    numberOfTicks={10}
                >
                    <CustomGrid belowChart={true} />
                </LineChart>
                <XAxis
                    data={datanew}
                    svg={{ fill: "#000",fontSize: 8,fontWeight: "bold",y: 5,originY: 30,rotation: 20, }}
                    xAccessor={({ item }) => item.date}
                    scale={scale.scaleTime}
                    numberOfTicks={10}
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    contentInset={verticalContentInset}
                    formatLabel={value => moment(value).format("HH:mm")}
                />
             
            </View>
            <YAxis
                style={{ marginBottom: xAxisHeight }}
                data={datanew}
                contentInset={verticalContentInset}
                yAccessor={({ item }) => item.value}
                xAccessor={({ item }) => item.date}
                svg={{ fill:'#000',fontSize: 10,fontWeight: "bold",}}
                numberOfTicks={5}
                formatLabel={value => `${value} ºC`}
            />
        </View> */}

        <VictoryChart width={400} height={props.height} theme={VictoryTheme.material} domainPadding={20}>

          <VictoryBar
            data={props.data}
            x={props.x_key_name}
            y={props.y_key_name}
            barWidth={({ index }) => index * 2 + props.barWidth}
            style={{ data: { fill: props.barColor }, labels: { fill: 'green' } }}
            height={400}
            // width={props.width}
            labels={doctorData}

          />

        </VictoryChart>



        <View style={{ flexDirection: 'row', height: 220, width: '95%' }}>
          {/* <YAxis
              data={data}
              style={{ marginBottom: xAxisHeight }}
              contentInset={verticalContentInset}
              svg={axesSvg}
              // numberOfTicks={ 10 }
              formatLabel={ value => `${value} SR` }
              // formatLabel={ value => '01' +'jan'}
          />  */}
          {/* <View style= {{height: 200}}>
      <LineChart 
        style={{ flex:1 }}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
            <Grid/>
            <VictoryBar
          data={props.data}
          x={props.x_key_name}
          y={props.y_key_name}
          barWidth={({index}) => index * 2 + props.barWidth}
          style={{data: {fill: props.barColor}, labels: { fill: 'green' }}}   
          height={300}
          labels={doctorData}
            
        />
      </LineChart>
      
      </View> */}
          <LineChart
            gridMin={100}
            gridMax={120}
            style={{ flex: 1, width: 300 }}
            data={data}
            contentInset={verticalContentInset}
            curve={shape.curveBasis}
            svg={{ stroke: 'green', strokeWidth: 2 }}
          >

            {/* <Grid/> */}
            <View>
              <VictoryChart width={350} height={props.height} theme={VictoryTheme.material} domainPadding={20}>

                <VictoryBar
                  data={props.data}
                  x={props.x_key_name}
                  y={props.y_key_name}
                  barWidth={({ index }) => index * 2 + props.barWidth}
                  style={{ data: { fill: props.barColor }, labels: { fill: 'green' } }}
                  height={300}
                  labels={doctorData}

                />

              </VictoryChart>

            </View>
          </LineChart>

          <YAxis
            data={data}
            // formatLabel={(value, index) => index}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />

        </View>
        {/* <View style={{ flexDirection: 'row',height:'auto',width:'92%' }}>
              <XAxis
                  style={{ marginHorizontal: -10, height: xAxisHeight,width:'90%',flex:1 }}
                  data={data}
                  formatLabel={(value, index) => index}
                  contentInset={{ left: 10, right: 10 }}
                  // numberOfTicks={ 10 }
                  svg={axesSvg}
              />
          </View> */}
        <View style={{ paddingVertical: 10 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{ ...styles.viewstyle, backgroundColor: props.barColor }}
          />
          <Text style={{ color: props.barColor, fontFamily: FontFamily.TTCommonsMedium, fontSize: 12 }}>
            Contribution{' '}
          </Text>


          <View style={{ paddingHorizontal: 10 }} />
          <View
            style={{ ...styles.viewstyle, backgroundColor: 'green' }}
          />
          <Text style={{ color: 'green', fontFamily: FontFamily.TTCommonsMedium, fontSize: 12 }}>
            Number of Doctor's{' '}
          </Text>
        </View>
        <View style={{ marginVertical: 5 }} />
      </View>
    </>
  );
}

VikramTrendChart.defaultProps = {
  barColor: '#34acd3',
  data: data,
  x_key_name: 'x',
  y_key_name: 'y',
  z_key_name: 'z',
  width: 500,
  barWidth: 25,
  height: 250,
  firstTitle: 'Target',
  secondTitle: 'Achieved',
  containerHeight: 290,
  labelColor: 'red'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12, borderColor: Colors.borderColor1
  },
  viewstyle: {
    width: 12,
    height: 12,
    backgroundColor: '',
    right: 4,
  },
});
