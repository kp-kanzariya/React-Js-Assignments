import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import useResponsiveDimensions from '../../../hooks/useResponsiveDimensions';

// const refRBSheet = useRef();
export default function RightRBSheet(props) {
  const { isLandscape } = useSelector(state => state.isLandscape);
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [rbsheetWidth] = useResponsiveDimensions({
    mobile: ['60%', '95%'],
    tab: ['40%', '75%'],
  });
  return (
    <>
      <RBSheet
        ref={props.refRBSheet}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '100%',
            backgroundColor: themecolor.RB2,
            width: rbsheetWidth,
            alignSelf: 'flex-end',
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: 1 }} />

          <View
            style={{
              ...styles.RBNEWVIEW,
              // backgroundColor:'red',
              flex: 1
            }}>
            <ScrollView showsVerticalScrollIndicator={false}  >
              {props.content}
            </ScrollView>
          </View>
        </View>
        <View style={styles.PV30} />
      </RBSheet>
    </>
  );
}
const styles = StyleSheet.create({
  RBNEWVIEW: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
});
RightRBSheet.defaultProps = {
  content: (
    <View>
      <Text>Please use content prop to put component inside the sheet</Text>
    </View>
  ),
};
