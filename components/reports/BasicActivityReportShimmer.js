import {View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';

const BasicActivityReportShimmer = () => {
  const { isLandscape} = useSelector(state => state.isLandscape);

  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection:isLandscape ? 'row' :'column',
        width: '100%',
        alignItems: 'center',
        gap: 10,
        padding: 10,
      }}>
      {[1, 1, 1, 1, 1].map((item, index) => {
        return (
          <View key={index.toString()} style={{flex: 1}}>
            <SkeletonPlaceholder borderRadius={10}>
              <View style={{height: 100, width: 230}}></View>
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </View>
  );
};

export default BasicActivityReportShimmer;
