import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import { AlertWarning } from '../shared/alerts/Alert';

const Data = [
  { id: 0, month: 'December 2022' },
  { id: 1, month: 'December 2022' },
  { id: 2, month: 'December 2022' },
];

const ExpenseMonthFilter = props => {

  return (
    <View
      style={{
        ...styles.mainContainer,
      }}>
      {Object.keys(props.allowedMonths)?.map(item => {
        return (
          <TouchableOpacity
            style={{
              ...styles.TouchalbleOpacityCss,
              backgroundColor: props.selected == item ? Colors.MRGREEN : 'white',
            }}
            onPress={() => {
              props.setSelected(item);
              // props.setSelectedValue(item);
            }}>
            <Text
              style={{
                ...styles.textStyle,
                color: props.selected == item ? 'white' : Colors.darkgray,
              }}>
              {props.allowedMonths[item]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ExpenseMonthFilter;

ExpenseMonthFilter.defaultProps = {
  setSelected: () => { },
};

const styles = StyleSheet.create({
  textStyle: { fontSize: FontSize.labelText, fontFamily: FontFamily.TTCommonsMedium },
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    // height: 32,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightgray,
  },
  TouchalbleOpacityCss: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    overflow: 'hidden',
    // height: 32,
  },
});
