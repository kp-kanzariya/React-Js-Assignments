import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../assets/config/Colors';
import { FontFamily } from '../../../assets/fonts/FontFamily';

const NoData = (props) => {
  return (
    <View style={{ ...styles.container, width: props.width, maxWidth: '80%', height: props.height }} >
      <Text style={styles.textStyle} >{props.msg}</Text>
    </View>
  )
}

export default NoData;
NoData.defaultProps = {
  width: 'auto',
  msg: 'No Data',
  height: 'auto',
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.MRGREEN,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontFamily: FontFamily.TTCommonsDemiBold
  }
})