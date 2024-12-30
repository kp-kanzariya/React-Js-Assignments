import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { FontSize } from '../../../assets/fonts/Fonts';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { Colors } from '../../../assets/config/Colors';

const Data = [
  // {id: 0, name: 'Campaign'},
  { id: 1, name: 'eDetailing' },
  { id: 2, name: 'Input' },
  { id: 3, name: 'Survey' },
];

const DcrPreviewSlider = props => {
  const [selected, setSelected] = useState(1);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        height: 45,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.lightgray,

      }}>
      {props.Data.map(item => {
        return (
          <TouchableOpacity
          testID={`StepperDcrPreview-${item.id}`}
            style={{
              backgroundColor: selected == item.id ? Colors.MRGREEN : 'white',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
              overflow: 'hidden',
              height: 45
            }}
            onPress={() => {
              setSelected(item.id);
              props.setSelectedValue(item.name);
            }}>
            <Text
              style={{
                ...styles.textStyle,
                color: selected == item.id ? 'white' : Colors.darkgray,
                fontSize: 16,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default DcrPreviewSlider;

DcrPreviewSlider.defaultProps = {
  setSelectedValue: () => { },
};

const styles = StyleSheet.create({
  textStyle: { fontSize: FontSize.small, fontFamily: FontFamily.TTCommonsMedium },
});
