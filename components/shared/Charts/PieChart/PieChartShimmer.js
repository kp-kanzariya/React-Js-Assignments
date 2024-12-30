import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function PieChartShimmer() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <View style={{height: 200}}></View>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
