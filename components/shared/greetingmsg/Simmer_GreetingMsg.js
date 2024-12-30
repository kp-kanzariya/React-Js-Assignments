import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const Simmer_GreetingMsg = (props) => {
    return (
        <View style={{ ...styles.simmer_container }}>



            <View
                style={{
                    ...styles.simmer_side_all_text_container,
                    width: '75%',
                }}>
                <SkeletonPlaceholder borderRadius={4}>
                    <SkeletonPlaceholder.Item width={200} height={10} />
                    <SkeletonPlaceholder.Item
                        marginTop={10}
                        width={150}
                        height={10}
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={10}
                        width={150}
                        height={10}
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={10}
                        width={150}
                        height={10}
                    />

                </SkeletonPlaceholder>
            </View>
        </View>
    )
}

export default Simmer_GreetingMsg

const styles = StyleSheet.create({
    simmer_container: {
        width: '94%',
        height: 110,
        backgroundColor: '#ffffff',
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#e2e2e2',
        overflow: 'hidden',
        // alignSelf:'center'
    },
    simmer_img_background: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        position: 'relative',
    },


    simmer_side_all_text_container: {
        padding: 5,
    },

})