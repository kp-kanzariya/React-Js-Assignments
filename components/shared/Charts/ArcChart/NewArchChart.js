import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Speedometer from 'react-native-speedometer-chart';
import { FontFamily } from '../../../../assets/fonts/FontFamily';

export default function NewArchChart(props) {
  return (
    <View style={styles.container}>
      <Speedometer
        value={50}
        totalValue={100}
        size={250}
        outerColor="#f45830"//Total Color
        internalColor="#fea90e"//Achieved value color 
        showText
        text="50.00"
        textStyle={{ color: 'green' }}
        showLabels
        labelStyle={{ color: 'blue' }}
        labelFormatter={number => `${number}%`}
        showPercent
        percentStyle={{ color: 'red' }}
      />
      <View style={{top:10}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 10 }}>

        <View
          style={{ ...styles.viewstyle, backgroundColor: "#f45830" }}
        />
        <Text style={{ ...styles.TargetText, color: "#f45830" }}>
          Doctor Coverage:100
        </Text>

        <View style={{ paddingHorizontal: 5 }} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 10 }}>

        <View
          style={{ ...styles.viewstyle, backgroundColor: "#fea90e" }}
        />
        <Text style={{ ...styles.TargetText, color: "#fea90e" }}>
          Visit Frequency:50%
        </Text>

        <View style={{ paddingHorizontal: 5 }} />
      </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // height: 250,
    // width: 200,
    backgroundColor: "white",
    margin: 5,
    padding: 15,
    fontFamily:FontFamily.TTCommonsMedium,
    borderRadius:20
  },
  viewstyle: {
    width: 12,
    height: 12,
    backgroundColor: '',
    right: 4
  }
});