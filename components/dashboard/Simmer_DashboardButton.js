import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';
import useResponsiveDimensions from '../../hooks/useResponsiveDimensions';
const Simmer_DashboardButton = () => {
    const [skeletonWidth] = useResponsiveDimensions({ mobile: [110, 110], tab: [125, 125] })
    return (

        <SkeletonPlaceholder borderRadius={12}>
            {/* <SkeletonPlaceholder.Item width={120} height={110} /> */}
            <View style={{ width: skeletonWidth, height: 110, margin: 3 }} >

            </View>
        </SkeletonPlaceholder>

    )
}

export default Simmer_DashboardButton;
