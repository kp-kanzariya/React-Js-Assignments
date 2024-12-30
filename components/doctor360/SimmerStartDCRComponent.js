import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const SimmerStartDCRComponent = () => {
  return (
    <View style={{...styles.container}}>
      <SkeletonPlaceholder borderRadius={4}>
        <View
          style={{
            // ...styles.container,
            // height: props.Cardheight,
            // backgroundColor: props.backgroundColor,
            // paddingHorizontal:10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              ...styles.img_container,
            }}>
            <Text style={{width: 100, height: 100, borderRadius: 100}}></Text>
          </View>
          <View
            style={{
              ...styles.side_text_btn_container,
              //   left:props.ML
              //   flexDirection:'column'
            }}>
            <Text style={{height: 15, width: 150,borderRadius: 15}}>{/* {props.title} */}</Text>
            <View style={{marginVertical: 10}} />
            <View style={{...styles.btn}}>
              <Text style={{height: 27, width: 80, borderRadius: 10}}></Text>
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SimmerStartDCRComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#e2e2e2',
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
  },
});
