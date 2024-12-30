import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme,VictoryScatter ,VictoryLabel} from "victory-native";
import { FontFamily } from "../../../../assets/fonts/FontFamily";

const data = [
    { x: "02 Sep", y: 50 },
    { x: '07 Oct', y: 100 },
    { x: "25 Nov", y: 250 },
    { x: "15 Dec", y: 120 },
    { x: "07 Jan", y: 400 }, 
  ];


//   const StyledLabel = styled(VictoryLabel)`
//   tspan {
//     fill: magenta;
//     font-family: Papyrus, fantasy;
//   }
// `

export default function VisitTrendBar (props){
  
    return (
      <View style={styles.container}>
        <VictoryChart width={props.width} height={props.height} theme={VictoryTheme.material} domainPadding={20}>
          <VictoryBar data={props.data} x={props.x} y={props.y} style={{ data: { fill: props.barColor } }}
             
        // labels={["No", "No", "No", "No","No"]}
        labels={() => ['Yes', 'No', 'Yes']}
        labelComponent={
          <VictoryLabel
            backgroundStyle={{}}
            backgroundPadding={3}
            // textAnchor="end"
            style={[
              {fill: '#d855ea', fontSize: 13, fontFamily: FontFamily.TTCommonsMedium,fontWeight:'500'},
              {fill: '#73c05a', fontFamily: FontFamily.TTCommonsMedium, fontSize: 13,fontWeight:'500'},
              {fill: '#5478ea', fontFamily: FontFamily.TTCommonsMedium, fontSize: 13,fontWeight:'500'},
            ]}
          />
        }
         
         />
      
        </VictoryChart>
      </View>
    );
 
}

VisitTrendBar.defaultProps={
    barColor:"#34ACD3",
    data:data,
    x_key_name:"x",
    y_key_name:"y",
    width:450,
    height:200

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    height:200
  }
});