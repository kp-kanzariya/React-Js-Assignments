import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions, useWindowDimensions } from 'react-native'
import React from 'react'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { Swipeable } from 'react-native-gesture-handler';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { Colors } from '../../../assets/config/Colors';
import { useSelector } from 'react-redux';
import { store } from '../../../redux/store';
const { width, height } = Dimensions.get('window');
import _ from 'lodash';
import { AlertWarning } from '../alerts/Alert';


// const timeData = [
//     "10:00 AM",
//     "10:30 AM",
//     "11:00 AM",
//     "11:30 AM",
//     "12:00 PM",
//     "12:30 PM",
//     "1:00 PM",
//     "1:30 PM",
//     "2:00 PM",
//     "2:30 PM",
//     "3:00 PM",
//     "3:30 PM",
//     "4:00 PM",
//     "4:30 PM",
//     "5:00 PM",
//     "5:30 PM",
//     "6:00 PM",
//     "6:30 PM",
//     "7:00 PM",
//     "7:30 PM",
//     "8:00 PM",
//     "8:30 PM",
//     "9:00 PM",
//     "9:30 PM",
//     "10:00 PM",
//     "10:30 PM",
//     "11:00 PM",
//     "11:30 PM",
// ]

const timeData = [
    "08:00 AM",
    "08:15 AM",
    "08:30 AM",
    "08:45 AM",
    "09:00 AM",
    "09:15 AM",
    "09:30 AM",
    "09:45 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM",
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "1:00 PM",
    "1:15 PM",
    "1:30 PM",
    "1:45 PM",
    "2:00 PM",
    "2:15 PM",
    "2:30 PM",
    "2:45 PM",
    "3:00 PM",
    "3:15 PM",
    "3:30 PM",
    "3:45 PM",
    "4:00 PM",
    "4:15 PM",
    "4:30 PM",
    "4:45 PM",
    "5:00 PM",
    "5:15 PM",
    "5:30 PM",
    "5:45 PM",
    "6:00 PM",
    "6:15 PM",
    "6:30 PM",
    "6:45 PM",
    "7:00 PM",
    "7:15 PM",
    "7:30 PM",
    "7:45 PM",
    "8:00 PM",


]

function RenderTime({ item, index, timeData }) {
    return (
        <>
            {/* <View style={{ paddingVertical:2 }} /> */}
            <View style={{ ...styles.render_time_cont }}>
                {/* <Text style={{ ...styles.render_time_txt, fontFamily: FontFamily.TTCommonsMedium, color: Colors.black }}  >{item}</Text> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ fontFamily: FontFamily.TTCommonsMedium, color: Colors.black, top: -5 }}  >{item}</Text>
                    <View style={{ borderBottomWidth: 1, borderColor: Colors.darkgray, width: 10, height: 1, left: 12 }} />
                </View>
            </View>
            <View style={{ height: 10 }} />
        </>
    )

}

function RenderList({ props, item, index, drag, isActive, permission, allDayPlanData, headerDate }) {
    const handleDelete = (item) => {
        store.dispatch({ type: 'REMOVE_DATA_FROM_PLANNER', payload: [item, allDayPlanData, headerDate] });
    }


    const handleOnClick = () => {
        //If item.isHide == 1 means this is temporary row
        if (item.isHide == 0) {
            props.navigation.navigate('DoctorView', {
                item: item,
                headingName: permission[item.OutlettypeId]?.includes(
                    'can_show_top_on_outlet_name',
                )
                    ? item.OutletName
                    : item.OutletContactName,
                outletId: item.Outlet_Id,
                outletOrgId: item.OutletOrgId,
                outletTypeId: item.OutlettypeId,
                navigateFrom: 'DayPlanner',
            })
        }
    }
    const debouncedHandleButtonClick = _.debounce(handleOnClick, 300);

    const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
    return (
        <>
            <Swipeable
                testID='swipeable'
                renderRightActions={() => (<>
                    {item.isHide == 0 &&
                        <TouchableOpacity testID='deleteCard' onPress={() => handleDelete(item)} style={{ ...styles.swipe_cont, backgroundColor: 'pink' }}>
                            <Text style={{ ...styles.remove_txt }}>Tap to Remove</Text>
                        </TouchableOpacity>
                    }
                </>)
                }
            >

                <TouchableOpacity testID='clickCard' onPress={() => { headerDate ? debouncedHandleButtonClick() : AlertWarning('Please start your day first.') }} onLongPress={drag} style={{ ...styles.long_press_cont, width: '100%' }} >

                    {!item.isHide == 1 && <View style={{
                        backgroundColor: !item.IsPlanned ? (permission[item?.OutlettypeId]?.includes('can_show_top_on_outlet_name') ? Colors.MRSTARTMYDAYCARD : '#DEEFDF') : 'transparent', ...styles.long_press_view, borderRadius: 10, top: 5, borderWidth: 0.5, borderColor: Colors.borderColor1, width: '100%'
                    }} >
                        <View style={{}}>
                            <View>
                                <Text style={{ ...styles.TextStyles, fontSize: 12 }}> {permission[item?.OutlettypeId]?.includes('can_show_top_on_outlet_name') ? item.OutletName : item.OutletContactName}
                                </Text>
                            </View>

                        </View>



                        {!item.IsPlanned && permission[item.OutlettypeId]?.includes('can_show_classification   ') ? (
                            <View style={styles.FLVIEW2}>
                                <Text style={{ ...styles.TextStyles, color: Colors.black, fontSize: 10 }}>{' '}{item.Classification != null ? item.Classification : 'NA'}</Text>
                            </View>
                        ) : (
                            <View style={styles.FLVIEW2}>
                                <Text style={{ ...styles.TextStyles, color: Colors.black, fontSize: 10 }}>{' '}{item.OutletContactName != null ? item.OutletContactName : 'NA'}</Text>
                            </View>)}
                        <View style={{ backgroundColor: !item.IsPlanned ? Colors.MRAGENDABUTTONBG : 'transparent', ...styles.division_view, paddingVertical: 2, paddingHorizontal: 10, width: 'auto', position: isLandscape ? 'absolute' : 'relative', right: isLandscape ? 5 : 0, top: isLandscape ? 5 : 0 }}>
                            <Text style={{ ...styles.TextStyles, color: Colors.white, fontSize: 10 }}>{item.OutlettypeName != null ? item.OutlettypeName : ''}</Text>
                        </View>
                        <Text style={styles.TextStyles}>{item.name}</Text>

                    </View>
                    }
                </TouchableOpacity>
                <View style={{ height: 10 }}></View>
            </Swipeable>
        </>
    )
}




export default function DayPlanner(props) {
    const { headerDate } = useSelector(state => state.header);
    const [scrollEnabled, setScrollEnabled] = React.useState(true);
    const { permission } = useSelector(state => state.roles);
    const { isLandscape, isMobile } = useSelector(state => state.isLandscape);

    return (
        <>
            <View style={styles.card}>
                <Text style={{ ...styles.TextStyles, fontSize: 15, fontFamily: FontFamily.TTCommonsDemiBold }}>Day Planned</Text>
                <View style={{ ...styles.line, paddingVertical: 10 }} />
                <View style={{ paddingVertical: 0 }} />
                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} >
                    <View >
                        <View style={{ paddingVertical: 10, bottom: 0 }}>
                            <View style={{ ...styles.flat_list_down_cont }}>
                                <FlatList
                                    data={timeData}
                                    renderItem={({ item, index }) => (<RenderTime item={item} index={index} timeData={timeData} />)}
                                    scrollEnabled={true}
                                />
                            </View>
                            <View style={{ ...styles.draggable_flatlist, position: 'absolute', top: 15 }} >
                                <DraggableFlatList
                                    data={props.allDayPlanData}
                                    scrollPercent={5}
                                    renderItem={({ item, index, drag, isActive }) => <RenderList item={item}
                                        index={index} drag={drag} isActive={isActive} permission={permission}
                                        allDayPlanData={props.allDayPlanData}
                                        headerDate={headerDate}
                                        props={props.props}
                                    />
                                    }
                                    keyExtractor={(item) => item.OutletOrgId}
                                    onDragEnd={({ data }) => {
                                        props.setAllDataPlanData(data)
                                        store.dispatch({ type: 'SET_PLANNER_DATA_ON_DRAG_PERMANENT', payload: [data, headerDate] });
                                    }}
                                    scrollEnabled={scrollEnabled}
                                    activationDistance={scrollEnabled ? 0 : 100}
                                    onMoveBegin={() => setScrollEnabled(true)}
                                    onMoveEnd={() => {
                                        setScrollEnabled(true)
                                    }}
                                    permission={permission}
                                />
                            </View>
                            <View style={{ paddingVertical: 50 }} />
                        </View>
                    </View>

                </ScrollView>


            </View>
            {/* <View style={{paddingVertical:1200}}/> */}
        </>
    );
}




const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        height: 'auto',
        maxHeight: 800,
        // paddingVertical: 100,
    },
    line: {
        borderBottomColor: Colors.borderColor1,
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
        // flexDirection: 'row', 
    },
    flat_list_down_cont: {
        zIndex: -1
    },
    draggable_flatlist: {
        position: 'relative', right: 0, width: '70%', alignItems: 'center',
    },
    render_time_cont: {
        width: '100%', paddingVertical: 5, zIndex: -2, height: 60, flexDirection: 'row'
    },
    render_time_txt: {
        zIndex: 1, position: 'absolute', fontSize: 12,
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
        borderRadius: 10, paddingVertical: 0.5, paddingHorizontal: 5,
    }

});


