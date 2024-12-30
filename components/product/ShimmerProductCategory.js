import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ShimmerProductCategory = () => {
  return (
    <>
        <View style={{ margin:10 }}>
            <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item width={120} height={150} />
            </SkeletonPlaceholder>
        </View> 
    </>
  )
}

export default ShimmerProductCategory

const styles = StyleSheet.create({})