import { StyleSheet, Text, View, Dimensions, ScrollView, } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { Colors } from '../../../assets/config/Colors';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryTheme,
} from 'victory-native';
import { useSelector } from 'react-redux';

import moment from 'moment';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import Label from '../shared/Label';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import Spacer from '../shared/spacers/Spacer';
import OutletTagsDAO from '../../Database/DAO/OutletTagsDAO';
import { SERVER_URL, downloadExcelReport, getAppToken, getEmployeeId } from '../../api/commonRepository';
import { useNavigation } from '@react-navigation/native';
import ModalRoot from '../shared/modals/ModalRoot';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';
import FilterDropdown from '../shared/dropdowns/FilterDropdown';
import useGetCampaignExecution from '../../screens/reports/hooks/useGetCampaignExecution';
import RcpaAuditShimmer from './RcpaAuditShimmer';


const CampaignExecutionReport = (props) => {
    const { network } = useSelector(state => state.network);
    const navigation = useNavigation();
    const [colorsArr, setColorsArr] = useState([Colors.MRAGENDABUTTONBG, Colors.MRGREEN]);
    const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
    const [selecteBrandValue, setSelecteBrandValue] = useState(null)
    const [selectfilterByTagValue, setSelectfilterByTagValue] = useState(null)
    const [fromDate, setFromDate] = useState(moment().subtract(2, 'month').startOf('month').format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(
        moment().endOf('month').format('YYYY-MM-DD'),
    );
    const { filterTagOptions, monthsOption, brandOptions, data: CampExecutionData, loading } = useGetCampaignExecution(fromDate, toDate, selecteBrandValue, selectfilterByTagValue)

    console.log('CampExecutionData==>', CampExecutionData)
    const changeFilter = (item) => {
        try {
            if (item.label == 'Current Month') {
                let fDate = moment().startOf('month').format('YYYY-MM-DD');
                let tDate = moment().endOf('month').format('YYYY-MM-DD');
                setFromDate(fDate);
                setToDate(tDate);
            } else if (item.label == 'Last Month') {
                let fDate = moment()
                    .subtract(1, 'month')
                    .startOf('month')
                    .format('YYYY-MM-DD');
                let tDate = moment()
                    .subtract(1, 'month')
                    .endOf('month')
                    .format('YYYY-MM-DD');
                setFromDate(fDate);
                setToDate(tDate);
            } else if (item.label == 'Fortnight') {
                let fDate = moment().subtract(15, 'days').format('YYYY-MM-DD');
                let tDate = moment().format('YYYY-MM-DD');
                setFromDate(fDate);
                setToDate(tDate);
            } else if (item.label == 'Half Yearly') {
                let fDate = moment()
                    .subtract(5, 'month')
                    .startOf('month')
                    .format('YYYY-MM-DD');
                let tDate = moment().endOf('month').format('YYYY-MM-DD');
                setFromDate(fDate);
                setToDate(tDate);
            } else if (item.label == 'Yearly') {
                let fDate = moment().startOf('year').format('YYYY-MM-DD');
                let tDate = moment().endOf('year').format('YYYY-MM-DD');
                setFromDate(fDate);
                setToDate(tDate);
            } else if (item.label == 'Quarterly') {
                let fDate = moment()
                    .subtract(2, 'month')
                    .startOf('month')
                    .format('YYYY-MM-DD');
                let tDate = moment().endOf('month').format('YYYY-MM-DD');
                setFromDate(fDate);
                setToDate(tDate);
            }
        } catch (e) {
            console.log('erorr----inCampaignExecution->', e)
        }
    };


    return (
        <>
            <View style={{ marginVertical: 3 }} />
            {true && <Label
                Label="Campaign Execution"
                defaultSelected1={'All Tags'}
                lastFilterData={filterTagOptions}
                onValueChange1={item => {

                    setSelectfilterByTagValue(item?.id)
                }}
            />}


            <Spacer />
            {loading ? <RcpaAuditShimmer /> :
                <View style={{ ...styles.container, paddingVertical: 5, }}>

                    <FilterDropdown onValueChange={(i) => {
                        if (i.id == "All") {
                            setSelecteBrandValue(null)
                        } else {
                            setSelecteBrandValue(i?.id)
                        }
                    }} right={5} topp={5} defaultSelected={'All Brands'} options={brandOptions} />
                    <FilterDropdown onValueChange={(itm) => { changeFilter(itm) }} defaultSelected={'Quarterly'} left={5} topp={5} options={monthsOption} />
                    <ScrollView horizontal style={{ width: '90%' }}  >
                        <VictoryChart
                            width={CampExecutionData?.length > 6 ? 1000 : 450}
                            height={250}
                            theme={VictoryTheme.material}
                        >
                            <VictoryGroup offset={28} colorScale={colorsArr}>
                                {(CampExecutionData?.length > 0) &&
                                    Object.keys(CampExecutionData[0]).filter(key => key !== 'month')
                                        .map((key, i) => {
                                            return <VictoryBar
                                                key={i}
                                                data={CampExecutionData}
                                                x='month'
                                                y={key}
                                                barWidth={25}
                                                labels={({ datum }) => {
                                                    return datum._y > 999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y > 9999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y
                                                }}
                                            />
                                        })}
                            </VictoryGroup>
                        </VictoryChart>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text
                                style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: colorsArr[0],
                                }}></Text>
                            <Text
                                style={{
                                    ...styles.TargetText,
                                    color: '#000',
                                    fontFamily: FontFamily.TTCommonsMedium,
                                    marginLeft: 5,
                                }}>
                                Planned Calls
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 20,
                            }}>
                            <Text
                                style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: colorsArr[1],
                                }}></Text>
                            <Text
                                style={{
                                    ...styles.TargetText,
                                    color: '#000',
                                    fontFamily: FontFamily.TTCommonsMedium,
                                    marginLeft: 5,
                                }}>
                                Calls Done
                            </Text>
                        </View>
                    </View>
                </View>}
        </>
    )
}

export default CampaignExecutionReport

const styles = StyleSheet.create({
    mainContainerCss: {
        width: '100%',
        padding: 0,
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.borderColor1,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.borderColor1,
        position: 'relative',
    },

    viewstyle: {
        width: 12,
        height: 12,
        backgroundColor: '',
        right: 4,
    },
});
