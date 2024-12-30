import React from 'react'
import { View, Text } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Colors } from '../../assets/config/Colors'

const AttendanceReportShimmer = (props) => {
    return (
        <SkeletonPlaceholder>
            <View style={{
                width: '100%',
                padding: 0,
                justifyContent: 'center',
                borderRadius: 12,
                borderWidth: props.borderWidth,
                borderColor: Colors.borderColor1,
                alignItems: 'center',
                backgroundColor: Colors.white,
                paddingVertical: 20
            }}>
                <View style={{ borderRadius: 200, width: props.size, height: props.size }} />
            </View>
        </SkeletonPlaceholder>
    )
}

export default AttendanceReportShimmer

AttendanceReportShimmer.defaultProps = {
    borderWidth: 1,
    size: 250
}