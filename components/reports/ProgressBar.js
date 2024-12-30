import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { FontFamily } from '../../assets/fonts/FontFamily';
const ProgressBar = props => {
  return (
    <ProgressCircle
      percent={props.fillPercent}
      radius={props.size}
      borderWidth={props.circleWidth}
      color={props.color}
      shadowColor={props.shadowColor}
      bgColor="#fff">
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: props.fontSize,
            fontFamily: FontFamily.Popinssemibold,
            color: props.color,
            // top: props.circleTitle ? 5 : 0,
          }}>
          {props.percentage}
          {props.perIcon && '%'}
        </Text>
        {props.circleTitle && (
          <>
            <Text
              style={{ ...styles.circle_title, fontSize: props.circleTitleSize }}>
              {props.circleTitle}
            </Text>
          </>
        )}
      </View>
    </ProgressCircle>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  circle_title: {
    fontSize: 11,
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
    top: -10,
  },
});

ProgressBar.defaultProps = {
  percentage: 0,
  circleTitle: false,
  size: 100,
  circleWidth: 20,
  fontSize: 40,
  perIcon: false,
  color: '#49dc66',
  shadowColor: 'lightgrey',
  fillPercent: 100,
  // circleTitleSize: 15
};
