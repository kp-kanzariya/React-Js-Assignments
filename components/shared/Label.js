import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import FilterDropdown from './dropdowns/FilterDropdown';
import ButtonRoot from './buttons/ButtonRoot';
import { useSelector } from 'react-redux';
// const DropDownOption=[
//   {label: 'Doctor', id: 1},
//   {label: 'Chemist', id: 2},
//   {label: 'Cardio', id: 3},
//   {label: 'Ortho', id: 4},
// ]
export default function Label(props) {
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);

  return (
    <View style={{ ...styles.DropDownMainView, flexDirection: 'row' }}>
      <Text
        style={{
          ...styles.LabelText,
          color: Colors.black,
          left: props.LEFT,
          fontSize: props.Size,
          top: props.TOP,
          fontFamily: props.Family,
          width: props.WIDTHTEXT,
          flexWrap: props.WRAP
        }}>
        {props.Label}
      </Text>
      <View style={{ marginVertical: 5 }} />
      <View style={{}} >
        {props.lastFilterData && (
          <FilterDropdown
            onValueChange={props.onValueChange1}
            defaultSelected={props.defaultSelected1}
            options={props.lastFilterData}
            right={props.lastPosition}
            paddingVertical={props.PV}
            topp={props.TPSS}
          />
        )}
        {props.secondLastFilterData && (
          <FilterDropdown
            onValueChange={props.onValueChange2}
            backgroundColor={Colors.MRMTP}
            defaultSelected={props.defaultSelected2}
            options={props.secondLastFilterData}
            right={props.secondLastPosition}
            paddingVertical={props.PVL}
            topp={props.TPSS}
          />
        )}
        {props.btn && (
          <ButtonRoot TOPSS={props.TOPSB} padding={5} title={props.btnTitle} onPress={props.onPressBtn} width={props.btnWidth} height={props.btnHeight} borderRadius={props.btnRadius} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  LabelText: {
    fontSize: 13,
    // fontFamily: FontFamily.TTCommonsMedium,
    color: Colors.black,
  },
  DropDownMainView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 1,
  },
});

Label.defaultProps = {
  lastFilterData: false,
  secondLastFilterData: false,
  lastPosition: 0,
  secondLastPosition: 100,
  btn: false,
  btnTitle: '+ Add',
  onPressBtn: () => { },
  btnWidth: 'auto',
  btnHeight: 25,
  btnRadius: 20,
  fontSize: 10,
  Family: FontFamily.TTCommonsMedium,
  color: Colors.black,
};
