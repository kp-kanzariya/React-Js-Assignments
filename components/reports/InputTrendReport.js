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

const { width, height } = Dimensions.get('window');
const InputTrendReport = (props) => {
    const { network } = useSelector(state => state.network);
    const navigation = useNavigation();
    const [colorsArr, setColorsArr] = useState(['#1678C8', '#2699FB']);
    const [data, setData] = useState([]);
    const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
    const [outletTags, setOutletTags] = useState([]);
    const [tagId, setTagId] = useState('')
    const [showFilter, setShowFilter] = useState(false);
    const [month, setMonth] = useState(moment().format('MM-YYYY'));
    const [openModal, setOpenModal] = useState(false);
    const [fromDate, setFromDate] = useState(
        moment()
            .subtract(2, 'month')
            .startOf('month')
            .format('YYYY-MM-DD'),
    );
    const [toDate, setToDate] = useState(
        moment().endOf('month').format('YYYY-MM-DD'),
    );
    const [empId, setEmpId] = useState('');
    // alert(month)

    const getInputTrendData = async (tagId, fromDate, toDate) => {
        try {
            let params = { employee_id: props.empId, outlet_tag_id: tagId, start_date: fromDate, end_date: toDate }
            const response = await getData({ url: API.getSgpiTrend, params: params });
            if (response.statusCode == 200) {
                // console.log("data is ", response.data)
                setData(response.data)
            }
        } catch (err) {
            appendTextToFile({
                text: `Error in catch fun getInputTrendData inside InputTrendReport Line 64 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
            console.error("🚀 ~ file: InputTrendReport.js:25 ~ getInputTrendData ~ err:", err)
        }
    }

    const getEmp = async () => {
        try {
            let emp = await getEmployeeId();
            setEmpId(emp);
        } catch (err) {
            console.log("🚀 ~ file: InputTrendReport.js:60 ~ getEmp ~ err:", err)
        }
    }

    useEffect(() => {
        getEmp()
    }, [])

    useEffect(() => {
        if (tagId) {
            getInputTrendData(tagId, fromDate, toDate);
        }
    }, [tagId, fromDate, toDate])

    const getOutletTags = async () => {
        try {

            let res = await OutletTagsDAO.getAllTags();
            let frmtData = res.reduce((arr, item) => {
                arr.push({ id: item.TagName, label: item.TagName })
                return arr
            }, [])
            frmtData.unshift({ id: 'All', label: 'All Tags' })
            setOutletTags(frmtData);
            setTagId(frmtData[0].id);
            setShowFilter(true)
        } catch (err) {
            appendTextToFile({
                text: `Error in catch fun getOutletTags inside InputTrendReport Line 104 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
            console.log("🚀 ~ file: InputTrendReport.js:51 ~ getOutletTags ~ err:", err)
        }
    }

    const changeFilter = (item) => {
        try {
            if (item.label == 'Current Month') {
                let fDate = moment().startOf('month').format('YYYY-MM-DD');
                let tDate = moment().endOf('month').format('YYYY-MM-DD');
                // getRCPABifurcation(fDate, tDate);
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
            appendTextToFile({
                text: `Error in catch fun changeFilter inside InputTrendReport Line 159 ${e}`,
                headerDate: store?.getState().header.headerDate
            });
        }
    };

    useEffect(() => {
        getOutletTags();
    }, [])

    const onClick = async (action) => {
        if (network) {
            setOpenModal(!openModal);
            try {
                if (action == 'webview') {
                    navigation.navigate('Webview', {
                        URL: API.sgpiBrnadWiseDistribution,
                        month: moment().format('MM-YYYY'),
                        EmployeeId: empId,
                        CameFrom: 'SGPIReport',
                    });
                } else {
                    const serverurl = await SERVER_URL()
                    const appptkn = await getAppToken();
                    let url = `${serverurl}${API.sgpiBrnadWiseDistribution}?apptoken=${appptkn}&employee_id=${empId}&month=${month}&action=download`
                    downloadExcelReport(url, 'RcpaBaseReport')

                }
            } catch (err) {
                console.log("🚀 ~ file: VisitHistory.js:51 ~ onClick ~ err:", err)
                appendTextToFile({
                    text: `Error in catch fun onClick inside InputTrendReport Line 190 ${err}`,
                    headerDate: store?.getState().header.headerDate
                });
            }
        } else {
            AlertDanger('No internet connection.')
        }
    }

    return (
        <>
            <View style={{ marginVertical: 3 }} />
            {showFilter && <Label
                Label="SGPI Month Trend View"
                WRAP={'wrap'}
                // secondLastFilterData={outletTags}
                // defaultSelected2={outletTags[0]?.label}
                // onValueChange2={(item) => setTagId(item.id)}
                defaultSelected1={'Quarterly'}
                lastFilterData={[
                    { label: 'Current Month', id: 1 },
                    // { label: 'Fortnight', id: 2 },
                    { label: 'Last Month', id: 3 },
                    { label: 'Quarterly', id: 2 },
                    { label: 'Half Yearly', id: 4 },
                    { label: 'Yearly', id: 5 },
                ]}
                onValueChange1={item => changeFilter(item)}
            />}
            <Spacer />
            <TouchableOpacity onPress={() => {
                // navigation.navigate('Webview', {
                //     URL: API.sgpiBrnadWiseDistribution,
                //     month: moment().format('MM-YYYY'),
                //     EmployeeId: empId,
                //     CameFrom: 'SGPIReport',
                // });
                setOpenModal(!openModal);
            }} style={{ ...styles.container, paddingVertical: 5, }}>
                <ScrollView horizontal style={{ width: '90%' }}  >
                    <VictoryChart
                        width={data.length > 6 ? 900 : 450}
                        height={220}
                        theme={VictoryTheme.material}
                    >
                        <VictoryGroup offset={26} colorScale={colorsArr}>
                            {data.length > 0 &&
                                Object.keys(data[0]).filter(key => key !== 'Moye')
                                    .map((key, i) => {
                                        return <VictoryBar
                                            key={i}
                                            data={data}
                                            x='Moye'
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
                                color: 'black',
                                fontFamily: FontFamily.TTCommonsMedium,
                                marginLeft: 5,
                            }}>
                            Inventory
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
                                color: 'black',
                                fontFamily: FontFamily.TTCommonsMedium,
                                marginLeft: 5,
                            }}>
                            {props?.checkReplacement('InputTrendReport','distributed')||'Distributed'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <ModalRoot width={250} showModal={openModal} setShowModal={setOpenModal} content={
                <View style={{ width: 230, alignSelf: 'center', position: 'relative', }} >

                    <Entypo onPress={() => setOpenModal(false)} name='circle-with-cross' size={28} style={{ position: 'absolute', right: 0, zIndex: 99, top: -20 }} />
                    <Spacer />
                    <ButtonRoot padding={5} height={40} title={`View SGPI Report`} onPress={() => { onClick('webview') }} />
                    <Spacer h={5} />
                    <ButtonRoot padding={5} height={40} title={`Download SGPI Report`} onPress={() => { onClick('download') }} />
                </View>
            } />
        </>
    )
}

export default InputTrendReport

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
