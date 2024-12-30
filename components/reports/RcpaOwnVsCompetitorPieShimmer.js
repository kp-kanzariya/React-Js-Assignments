import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Colors } from '../../assets/config/Colors'

const RcpaOwnVsCompetitorPieShimmer = () => {
    return (
        <SkeletonPlaceholder>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // flexDirection: 'row',
                // height: 250,
                width: '100%',
                backgroundColor: 'white',
                // right: 15,
                overflow: 'hidden',
                marginTop: 5,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: Colors.borderColor1,
                paddingVertical: 10,
                minHeight: 300
            }}>

            </View>
        </SkeletonPlaceholder>
    )
}

export default RcpaOwnVsCompetitorPieShimmer