import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { FontFamily } from '../../../../assets/fonts/FontFamily';
import { Colors } from '../../../../assets/config/Colors';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DarViewDAO from '../../../../Database/DAO/DarViewDAO';
import TextTicker from 'react-native-text-ticker';
import Label from '../../Label';
import { appendTextToFile } from '../../../../helper/utils/Logger';
import useCheckReplacement from '../../../../hooks/useCheckReplacement';

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');


function RenderItem({ item }) {
    const [GraphHeight, setGraphHeight] = React.useState(0);

    React.useEffect(() => {
        if (item.PobTotal == 0) {
            setGraphHeight(0);
        } else if (item.PobTotal > 0 && item.PobTotal < 500) {
            setGraphHeight(5);
        } else if (item.PobTotal > 500 && item.PobTotal < 1200) {
            setGraphHeight(6);
        } else if (item.PobTotal > 1200 && item.PobTotal < 2000) {
            setGraphHeight(8);
        } else if (item.PobTotal > 2000 && item.PobTotal < 2500) {
            setGraphHeight(10);
        } else if (item.PobTotal > 2500 && item.PobTotal < 3000) {
            setGraphHeight(12);
        } else if (item.PobTotal > 3000 && item.PobTotal < 3500) {
            setGraphHeight(14);
        } else if (item.PobTotal > 3500 && item.PobTotal < 4000) {
            setGraphHeight(16);
        } else if (item.PobTotal > 4000 && item.PobTotal < 4500) {
            setGraphHeight(18);
        } else if (item.PobTotal > 4500 && item.PobTotal < 5000) {
            setGraphHeight(20);
        } else if (item.PobTotal > 5000 && item.PobTotal < 5500) {
            setGraphHeight(22);
        } else if (item.PobTotal > 5500 && item.PobTotal < 6000) {
            setGraphHeight(25);
        } else if (item.PobTotal > 6000 && item.PobTotal < 6500) {
            setGraphHeight(28);
        } else if (item.PobTotal > 6500 && item.PobTotal < 7000) {
            setGraphHeight(30);
        } else if (item.PobTotal > 7000 && item.PobTotal < 7500) {
            setGraphHeight(35);
        } else if (item.PobTotal > 7500 && item.PobTotal < 8000) {
            setGraphHeight(40);
        } else if (item.PobTotal > 8000 && item.PobTotal < 8500) {
            setGraphHeight(45);
        } else if (item.PobTotal > 8500 && item.PobTotal < 9000) {
            setGraphHeight(50);
        } else if (
            item.PobTotal > 9000 &&
            item.PobTotal < 10000
        ) {
            setGraphHeight(55);
        } else if (
            item.PobTotal > 10000 &&
            item.PobTotal < 11000
        ) {
            setGraphHeight(60);
        } else if (
            item.PobTotal > 11000 &&
            item.PobTotal < 12000
        ) {
            setGraphHeight(65);
        } else if (
            item.PobTotal > 12000 &&
            item.PobTotal < 13000
        ) {
            setGraphHeight(70);
        } else if (
            item.PobTotal > 13000 &&
            item.PobTotal < 14000
        ) {
            setGraphHeight(75);
        } else if (
            item.PobTotal > 14000 &&
            item.PobTotal < 15000
        ) {
            setGraphHeight(80);
        } else if (
            item.PobTotal > 15000 &&
            item.PobTotal < 20000
        ) {
            setGraphHeight(85);
        } else if (
            item.PobTotal > 20000 &&
            item.PobTotal < 25000
        ) {
            setGraphHeight(90);
        } else if (
            item.PobTotal > 25000 &&
            item.PobTotal < 30000
        ) {
            setGraphHeight(95);
        } else if (
            item.PobTotal > 30000 &&
            item.PobTotal < 35000
        ) {
            setGraphHeight(100);
        } else if (
            item.PobTotal > 35000 &&
            item.PobTotal < 40000
        ) {
            setGraphHeight(105);
        } else {
            setGraphHeight(110);
        }

    }, [item]);

    return (
        <View
            style={{
                alignItems: 'center',
                alignSelf: 'flex-end',
            }}>

            <View>
                <Text style={{ color: '#000', fontSize: 10 }}>{item.PobTotal}</Text>
            </View>


            <View
                style={{
                    width: 23,
                    height: GraphHeight,
                    backgroundColor: Colors.MRTAG,
                    borderBottomWidth: 1,
                }}
            />
            <View style={{ marginTop: 10 }}>
                <View style={{ width: 100 }}>
                    <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                        <TextTicker
                            duration={8000}
                            loop
                            bounce
                            repeatSpacer={50}
                            marqueeDelay={1000}>
                            <Text
                                style={{
                                    fontSize: 9,
                                    fontFamily: FontFamily.TTCommonsDemiBold,
                                    textAlign: 'center',
                                    color: '#000',

                                }}>
                                {moment(item?.DcrDate).format("DD MMM")}
                            </Text>
                        </TextTicker>
                    </View>
                </View>
            </View>
        </View>
    )
}



export default function POBHistoryChart(props) {
    const { mode } = useSelector(state => state.mode);
    const { themecolor } = new MyThemeClass(mode).getThemeColor()
    const { isLandscape } = useSelector(state => state.isLandscape);
    const { outletOrders } = useSelector(state => state.POB);
    const [allRecentOrder, setAllRecentOrder] = React.useState([]);
    const [tempObj, setTempObj] = React.useState({});
    const { headerDate } = useSelector(state => state.header);


    const getPOBHistoryDataFun = (startDate, endDate) => {
        DarViewDAO.getAllDarViewPOBHistory({ outletId: props?.outletId, startDate, endDate }).then((res => {
            setAllRecentOrder(res)
        })).catch((e) => {
            console.error("Error while getPOBHistoryFun Line 186", e)
            appendTextToFile({
                text: `Error in catch fun getPOBHistoryDataFun inside POBHistoryChart Line 186 ${e}`,
                headerDate: headerDate
            });
        })
    }

    const onSelectFilter = async (e) => {
        if (e.label == 'Current month') {
            const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            getPOBHistoryDataFun(startOfMonth, endOfMonth)
        } else if (e.label == 'Fortnight') {
            const startOfMonth = moment().subtract(15, 'days').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            getPOBHistoryDataFun(startOfMonth, endOfMonth)
        }
        else if (e.label == 'Last month') {
            const startOfMonth = moment()
                .subtract(1, 'months')
                .startOf('month')
                .format('YYYY-MM-DD');
            const endOfMonth = moment()
                .subtract(1, 'months')
                .endOf('month')
                .format('YYYY-MM-DD');
            getPOBHistoryDataFun(startOfMonth, endOfMonth)
        } else if (e.label == 'Half yearly') {
            const startOfMonth = moment().subtract(6, 'months').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            getPOBHistoryDataFun(startOfMonth, endOfMonth)
        } else if (e.label == 'Yearly') {
            const startOfMonth = moment().subtract(12, 'months').format('YYYY-MM-DD');
            const endOfMonth = moment().format('YYYY-MM-DD');
            getPOBHistoryDataFun(startOfMonth, endOfMonth)
        }
    }

    React.useEffect(() => {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment().format('YYYY-MM-DD');
        getPOBHistoryDataFun(startOfMonth, endOfMonth)
    }, []);

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}>
            </View>

            <View style={styles.MV3} />

            <Label
                Label={props?.checkReplacement('POBHistory','title')|| 'POB History'}
                Family={FontFamily.TTCommonsMedium}
                Size={14}
                TOP={3}
                secondLastPosition={120}
                defaultSelected1={'Current month'}
                lastFilterData={[
                    { label: 'Current month', id: 1 },
                    { label: 'Fortnight', id: 2 },
                    { label: 'Last month', id: 3 },
                    { label: 'Half yearly', id: 4 },
                    { label: 'Yearly', id: 5 },
                ]}
                onValueChange1={(e) => onSelectFilter(e)}

            />
            <View style={styles.MV3} />

            <View
                style={{
                    ...styles.customChart,
                    height: height * 0.26,
                    borderWidth: 1,
                    borderColor: '#E9E9E9',
                    alignItems: 'flex-start',
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    top: 10
                }}>
                {
                    allRecentOrder?.length > 0 ? (

                        <>
                            <FlatList
                                data={allRecentOrder}
                                renderItem={({ item }) => (
                                    <RenderItem
                                        item={item}
                                    />
                                )}
                                nestedScrollEnabled
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />

                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingVertical: 10 }}>
                                <View
                                    style={{
                                        width: 12,
                                        height: 12,
                                        right: 4, backgroundColor: Colors.MRTAG
                                    }}
                                />
                                <Text
                                    style={{
                                        color: '#000',
                                        fontFamily: FontFamily.TTCommonsBold,
                                    }}>
                                    Order Value
                                </Text>
                            </View>
                        </>
                    ) : (

                        <>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, alignSelf: "center" }} ><Text style={{ fontFamily: FontFamily.TTCommonsMedium, color: 'black' }} >No {props?.checkReplacement('POBHistory','title')|| 'POB History'} Found</Text></View>
                        </>
                    )}
            </View>





        </View>
    );
}




const styles = StyleSheet.create({
    FONTSETUP: { fontSize: 10, fontFamily: FontFamily.TTCommonsMedium },
    FLMainView: {
        borderWidth: 1,
        borderRadius: 8,
        width: '100%'
    },
    PV5: { paddingVertical: 5 },


    beat_com_container: {
        alignItems: 'center',
        right: 15,

    }

});