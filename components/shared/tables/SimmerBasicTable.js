import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
const SimmerBasicTable = props => {
  const {isLandscape} = useSelector(state => state.isLandscape);

  let myLoop = []; // Declaring an array

  for (let a = 0; a <= props.dataLength; a++) {
    // For loop here
    myLoop.push(
      <>
        <View
          style={{
            flexDirection: 'row',
            width: props.width,
            backgroundColor: '#fff',
            height:props.height
          }}>
          <View style={{padding: 5}}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                width={isLandscape ? props.SkeletonWidthLandscape : props.SkeletonWidth}
                height={isLandscape ? props.skelHeightScape : props.skelHeight}
                borderRadius={5}
              />
            </SkeletonPlaceholder>
          </View>
          <View style={{padding: 5}}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                width={isLandscape ? props.SkeletonWidthLandscape : props.SkeletonWidth}
                height={isLandscape ? props.skelHeightScape : props.skelHeight}
                borderRadius={5}
              />
            </SkeletonPlaceholder>
          </View>
          <View style={{padding: 5}}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                width={isLandscape ?props.SkeletonWidthLandscape : props.SkeletonWidth}
                height={isLandscape ? props.skelHeightScape : props.skelHeight}
                borderRadius={5}
              />
            </SkeletonPlaceholder>
          </View>
          <View style={{padding: 5}}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                width={isLandscape ? props.SkeletonWidthLandscape : props.SkeletonWidth}
                height={isLandscape ? props.skelHeightScape : props.skelHeight}
                borderRadius={5}
              />
            </SkeletonPlaceholder>
          </View>
        </View>
      </>,
    );
  }

  return <>{myLoop}</>;
};

export default SimmerBasicTable;
