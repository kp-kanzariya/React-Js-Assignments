import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Simmer_DoctorProfileCard = props => {
  return (
    <View style={{...styles.container}}>
      {/* {isDoctor && ( */}
      <View
        style={{
          ...styles.img_background,
        }}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item width={80} height={110} />
        </SkeletonPlaceholder>
      </View>
      {/* )} */}
      <View
        style={{
          ...styles.side_all_text_container,
          width: '75%',
        }}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item width={200} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={150} height={10} />
          <SkeletonPlaceholder.Item marginTop={10} width={150} height={10} />
          <SkeletonPlaceholder.Item marginTop={10} width={150} height={10} />
          <SkeletonPlaceholder.Item marginTop={10} width={150} height={10} />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export default Simmer_DoctorProfileCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    overflow: 'hidden',
  },
  img_background: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'relative',
  },

  side_all_text_container: {
    height: '100%',
    padding: 5,
  },
});
