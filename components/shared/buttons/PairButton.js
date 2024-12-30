import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CustomButton from './ButtonRoot';

const PairButton = props => {
  return (
    <View
      style={{
      ...styles.container
      }}>
      <View style={{ width: props.width }}>
        <CustomButton title={props.titleFirst} onPress={props.onPressFirst} color={props.firstBtnColor} />
      </View>
      <View style={{ width: props.width }}>
        <CustomButton title={props.titleSecond} onPress={props.onPressSecond} color={props.secondBtnColor} />
      </View>
    </View>
  );
};

export default PairButton;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width:'48%',
    // flex: 1,
    alignContent: 'flex-start',
    // backgroundColor:'red'
  },
});


PairButton.defaultProps = {
  titleFirst: 'Previous',
  titleSecond: 'Next',
  onPressFirst: () => { },
  onPressSecond: () => { },
  firstBtnColor: 'blue',
  secondBtnColor: 'blue'
};
