import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Colors } from '../../assets/config/Colors'

const RcpaValuePerscriberCardShimmer = () => {
    return (
        <SkeletonPlaceholder>
            <View style={{
                width: '100%',
                padding: 40,
                justifyContent: 'space-between',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: Colors.borderColor1,
                alignItems: 'center',
                backgroundColor: Colors.white,
                minHeight: 300
            }}>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 30 }} >
                        <View style={{ width: 50, height: 50, marginBottom: 10 }} />
                        <View style={{ width: 120, height: 20 }} />
                    </View>
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                        <View style={{ width: 50, height: 50, marginBottom: 10 }} />
                        <View style={{ width: 120, height: 20 }} />
                    </View>
                </View>
            </View>
        </SkeletonPlaceholder>
    )
}

export default RcpaValuePerscriberCardShimmer