import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function NestedTableShimmer() {
  return (
    <SkeletonPlaceholder>
      <View style={{height: 200}}></View>
    </SkeletonPlaceholder>
  );
}
