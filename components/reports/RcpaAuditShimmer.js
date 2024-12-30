import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Colors } from '../../assets/config/Colors'

const RcpaAuditShimmer = () => {
    return (
        <SkeletonPlaceholder>
            <View style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.borderColor1,
                minHeight: 300,
            }}>

            </View>
        </SkeletonPlaceholder>
    )
}

export default RcpaAuditShimmer