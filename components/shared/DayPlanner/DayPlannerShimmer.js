import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { Colors } from '../../../assets/config/Colors';
import { FlatList } from 'react-native';

const timeData = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM"
]

function RenderTime({ item }) {
    return (
        <>
            <View style={{ ...styles.render_time_cont }}>
                <Text style={{ ...styles.render_time_txt, fontFamily: FontFamily.TTCommonsMedium, color: Colors.black }}  >{item}</Text>
                <View style={{ ...styles.render_time_line_view }}>
                    <View style={{ ...styles.line, width: '53%', alignSelf: 'flex-start', }} />
                </View>
            </View>
            <View style={{ height: 10 }} />
        </>
    )

}


function RenderList({ item, index }) {
    return (
        <>
            <View style={{ backgroundColor: "#fff", flex: 1 }}>
                <SkeletonPlaceholder >
                    <View style={{
                        justifyContent: 'flex-start',
                        alignSelf: 'center',
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        flexDirection: "row"
                    }}>

                        <View style={{ flexDirection: "column", marginLeft: 5 }}>
                            <View style={{ width: 300, height: 15, marginTop: 5 }} />
                            <View style={{ width: 220, height: 10, marginTop: 20, marginBottom: 5 }} />
                            <View style={{ width: 180, height: 10, marginTop: 3 }} />
                        </View>
                    </View>
                </SkeletonPlaceholder>
            </View>
            <View style={{ height: 10 }}></View>

        </>
    )
}


export default function DayPlannerShimmer(props) {
    return (
        <View style={styles.card}>
            <Text style={{ ...styles.TextStyles, fontSize: 14 }}>Day Planned</Text>
            <View style={{ ...styles.line, top: 10 }} />
            <View style={{ marginVertical: 20 }} />

            <View style={styles.flat_list_cont} >

                <View style={styles.flat_list_down_cont}>
                    <FlatList
                        data={timeData}
                        renderItem={({ item, index }) => (<RenderTime item={item} index={index} timeData={timeData} />)}
                        scrollEnabled={false}
                    />

                </View>
                <View style={styles.draggable_flatlist}>
                    {
                        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'].map((item, index) => {
                            return <RenderList item={item} key={index} />
                        })
                    }


                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: 'auto',
    },
    line: {
        borderBottomColor: '#E9E8E8',
        borderBottomWidth: 1
    },
    screen: {
        marginTop: 24,
        flex: 1,
        backgroundColor: '#212121',
    },
    item: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TextStyles: { fontFamily: FontFamily.TTCommonsMedium, color: Colors.black, fontSize: 10 },
    flat_list_cont: {
        flexDirection: 'row', position: 'relative',
    },
    flat_list_down_cont: {
        width: '30%', zIndex: -1
    },
    draggable_flatlist: {
        position: 'relative', right: 10, width: '80%', alignItems: 'center'
    },
    render_time_cont: {
        width: '100%', paddingVertical: 15, zIndex: -2, height: 60, position: 'relative', flexDirection: 'row'
    },
    render_time_txt: {
        zIndex: 1, position: 'absolute', top: -5, fontSize: 10,
    },
    render_time_line_view: {
        position: 'relative', flexDirection: 'row', left: 100, top: -15
    },
    swipe_cont: {
        backgroundColor: 'darkpink', width: '100%', height: 60, position: 'relative', flex: 1
    },
    remove_txt: {
        textAlign: 'center', textAlignVertical: 'center', fontFamily: FontFamily.TTCommonsMedium, color: Colors.black, flex: 1
    },
    long_press_cont: {
        flexDirection: 'row', width: '100%', zIndex: -1, height: 60
    },
    long_press_view: {
        width: '100%', paddingVertical: 5, paddingHorizontal: 10
    },
    division_view: {
        borderRadius: 10, paddingVertical: 0.5, paddingHorizontal: 5, left: 10
    }

});