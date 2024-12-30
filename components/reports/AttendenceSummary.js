import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import { getEmployeeId } from '../../api/commonRepository';
import { FontFamily } from '../../assets/fonts/FontFamily';
import BasicTable from '../shared/tables/BasicTable';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import { Colors } from '../../assets/config/Colors';
import LoadingFullScreen from '../shared/loader/LoadingFullScreen';
import { useNavigation } from '@react-navigation/native';
import { AlertDanger, AlertWarning } from '../shared/alerts/Alert';
import { useSelector } from 'react-redux';
import Header from '../shared/header/Header';
import SubHeader from '../shared/header/SubHeader';
import moment from 'moment';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StoreDatatoAsync } from '../../helper/utils/AsyncStorageServices';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';
import ReportsDownloadorViewModal from '../shared/modals/ReportsDownloadorViewModal';
import useCheckReplacement from '../../hooks/useCheckReplacement';

const AttendenceSummary = (props) => {
    const [formattedData, setFormattedData] = useState([]);
    const checkReplacement = useCheckReplacement('reports')
    let fetchTeam = useSelector(state => state.teamUnderData);
    const [loader, setLoader] = useState(true);
    const [selfEmp, setSelfEmp] = useState('')
    const navigation = useNavigation();
    const { network } = useSelector(state => state.network);
    const [openModal, setOpenModal] = React.useState(false);
    const [canNavigateTo, setCanNavigateTo] = React.useState('')
    const [team, setTeam] = React.useState(false)

    useEffect(() => {
        if (fetchTeam?.teamList?.length > 0) {
            setTeam(true)
        }
    }, [])

    const getEmp = async () => {
        try {
            let selfEmp = await getEmployeeId();
            setSelfEmp(selfEmp);
        } catch (err) {
            console.log("🚀 ~ file: AttendenceSummary.js:25 ~ getEmp ~ err:", err)
            appendTextToFile({
                text: `Error in catch fun getEmp inside AttendenceSummary Line 39 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
        }
    }


    useEffect(() => {
        getSummary();
        getEmp()
    }, [])

    const openDAR = (date) => {
        try {
            if (network) {
                navigation.navigate('Webview', {
                    URL: API.DarReport,
                    date: date,
                    EmployeeId: props.route.params.empId,
                    CameFrom: 'DarReport',
                });
            } else {
                AlertDanger('No internet connection.')
            }
        } catch (err) {
            appendTextToFile({
                text: `Error in catch fun openDAR inside AttendenceSummary Line 65 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
            console.log("🚀 ~ file: AttendenceSummary.js:39 ~ openDAR ~ err:", err)
        }
    }

    const openDVP = (date) => {
        try {
            if (network) {
                navigation.navigate('Webview', {
                    URL: API.DvpReport,
                    date: date,
                    EmployeeId: props.route.params.empId,
                    CameFrom: 'DarReport',
                });
            } else {
                AlertDanger('No internet connection.')
            }
        } catch (err) {
            appendTextToFile({
                text: `Error in catch fun openDVP inside AttendenceSummary Line 86 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
            console.log("🚀 ~ file: AttendenceSummary.js:39 ~ openDAR ~ err:", err)
        }
    }

    const getStatus = (status) => {
        // console.log("status((**", status)
        try {
            if (status) {
                if (status == 1) {
                    return 'Punched Out'
                } else if (status == 0) {
                    return 'Punched In - Out is Pending'
                } else if (status == -1) {
                    return 'Day Locked'
                } else if (status == -2) {
                    return 'No Attendence'
                } else if (status == 2) {
                    return 'Forced logout'
                } else if (status == 4) {
                    return 'Punch Leave'
                } else {
                    return '-'
                }
            } else {
                return '-'
            }
        } catch (err) {
            appendTextToFile({
                text: `Error in catch fun getStatus inside AttendenceSummary Line 117 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
            console.log("🚀 ~ file: AttendenceSummary.js:67 ~ getStatus ~ err:", err)
            return ''
        }

    }

    const getSummary = async () => {
        setLoader(true)
        try {
            let params = { moye: props.route.params.selectedMonth, employee_id: props.route.params.empId }
            const result = await getData({ url: API.attendanceSummaryReport, params: params });
            // console.log('result000900', result)
            if (result.statusCode === 200) {
                let fData = Object.values(result?.data)?.reduce((arr, item) => {
                    arr.push([moment(item.AttendanceDate).format('DD MMM YYYY') || '-', `${item.StartTime || 'NA'} - ${item.EndTime || 'NA'}`, `${item.StartTownName}` || '-', item.EndTownName || '-', parseInt(item?.ShiftMins)?.toFixed(1) == 'NaN' ? '00:00' : parseInt(item?.ShiftMins)?.toFixed(1),
                    item.ExpenseGenerated ? <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <View>
                            <Text style={{ fontFamily: FontFamily.TTCommonsMedium, color: '#333', fontSize: 10 }}>Type - {item['Expenses.TripType']}</Text>
                            <Text style={{ fontFamily: FontFamily.TTCommonsMedium, color: '#333', fontSize: 10 }}>Amount - {item['Expenses.ExpenseFinalAmt']}</Text>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', top: -10, right: isMobile ? 5 : 10 }} onPress={() => moveToExpense(item)} >
                            <MCIcon name='eye' size={isMobile ? 20 : 25} color={Colors.MRSTARTMYDAY} />
                        </TouchableOpacity>
                    </View> : '-', <View style={{ backgroundColor: item.Remark == 'Sunday' ? 'pink' : 'white', borderRadius: 5, paddingVertical: 5, justifyContent: "center", alignItems: 'center' }} ><Text style={{ color: 'black', fontFamily: FontFamily.TTCommonsMedium, fontSize: 12 }} >{item.Remark}</Text></View> || '-', item.ExpenseRemark || '-', <View style={{ backgroundColor: getStatus(item.Status) == 'Day Locked' ? 'tomato' : getStatus(item.Status) == 'Punched Out' ? Colors.MRGREEN : getStatus(item.Status) == 'Punched In - Out is Pending' ? Colors.MRSTARTMYDAY : 'white', borderRadius: 5, paddingVertical: 5, justifyContent: "center", alignItems: 'center' }} ><Text style={{ color: getStatus(item.Status) == 'Day Locked' ? 'white' : getStatus(item.Status) == 'Punched Out' ? 'white' : 'black', fontFamily: FontFamily.TTCommonsMedium, fontSize: 12 }} >{getStatus(item.Status)}</Text></View>, item.Status &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                        <ButtonRoot preIconName='eye' preIconSize={10} fontSize={10} color={Colors.MRGREEN} title='DAR' width='auto' height={20} padding={3} onPress={() => openDAR(item.AttendanceDate)} />
                        <ButtonRoot preIconName='eye' preIconSize={10} fontSize={10} color={Colors.MRGREEN} title={checkReplacement('DVP','title')||'DVP'} width='auto' height={20} padding={3} onPress={() => openDVP(item.AttendanceDate)} />
                    </View>])
                    return arr
                }, [])
                setFormattedData(fData)
                // console.log("testing data123", result)
                setLoader(false)
            } else {
                AlertWarning(result.message)
                setLoader(false)
            }
        } catch (err) {
            console.error("🚀 ~ file: AttendenceSummary.js:14 ~ getSummary ~ err:", err)
            appendTextToFile({
                text: `Error in catch fun getSummary inside AttendenceSummary Line 158 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
            setLoader(false);
        }
    }

    const moveToExpense = (item) => {
        try {
            if (item.ExpenseId) {
                navigation.navigate('ExpenseOverview', { expId: item.ExpenseId, manager: props.route.params.empId != selfEmp, canDoVerify: item.canDoVerify || false });
            }
        } catch (err) {
            console.log("🚀 ~ file: AttendenceSummary.js:40 ~ moveToExpense ~ err:", err)
            appendTextToFile({
                text: `Error in catch fun getStatus inside AttendenceSummary Line 120 ${err}`,
                headerDate: store?.getState().header.headerDate
            });

        }
    }
    const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
    // alert(props.selectedMonth);

    const openMassReport = () => {
        try {
            if (network) {
                navigation.navigate('Webview', {
                    URL: API.MasReport,
                    month: props.route.params.selectedMonth,
                    CameFrom: 'MasReport',
                });
            } else {
                AlertDanger('No internet connection.')
            }
        } catch (err) {
            console.log("🚀 ~ file: AttendenceSummary.js:94 ~ openMassReport ~ err:", err)
            appendTextToFile({
                text: `Error in catch fun openMassReport inside AttendenceSummary Line 196 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
        }
    }

    const openMTPDeviationReport = () => {
        console.log('props .route.selectedMonth ==',props?.route?.params?.selectedMonth)
        try {
            if (network) {
                setCanNavigateTo('MTPDeviation')
                setOpenModal(true);
            } else {
                AlertDanger('No internet connection.')
            }
        } catch (err) {
            console.log("🚀 ~ file: AttendenceSummary.js:94 ~ openMTPDeviationReport ~ err:", err)
            appendTextToFile({
                text: `Error in catch fun openMTPDeviationReport inside AttendenceSummary Line 196 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
        }
    }


    const openJWReport = () => {
        try {
            if (network) {
                setCanNavigateTo('JWReport')
                setOpenModal(true);
            } else {
                AlertDanger('No internet connection.')
            }
        } catch (err) {
            console.log("🚀 ~ file: AttendenceSummary.js:94 ~ openMassReport ~ err:", err)
            appendTextToFile({
                text: `Error in catch fun openJWReport inside AttendenceSummary Line 235 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
        }
    }

    const openSgpiReport = () => {
        try {
            if (network) {
                navigation.navigate('Webview', {
                    URL: API.sgpiBrnadWiseDistribution,
                    month: moment().format('MM-YYYY'),
                    EmployeeId: selfEmp,
                    CameFrom: 'SGPIReport',
                });
            } else {
                AlertDanger('No internet connection.')
            }
        } catch (err) {
            appendTextToFile({
                text: `Error in catch fun openSgpiReport inside AttendenceSummary Line 216 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
            console.log("🚀 ~ file: AttendenceSummary.js:94 ~ openMassReport ~ err:", err)
        }
    }

    const storeStatus = async () => {
        try {
            const res = await getData({ url: API.getStatus })
            if (res.statusCode === 200) {
                await StoreDatatoAsync('@expenseStatus', res?.data[0]?.Expenses);
                // setAllStatus(res?.data[0]?.Expenses);
                // alert(JSON.stringify(res?.data[0]?.Expenses))
            } else {
                await StoreDatatoAsync('@expenseStatus', {});
                AlertWarning(res.message)
            }
        } catch (err) {
            appendTextToFile({
                text: `Error in catch fun storeStatus inside AttendenceSummary Line 236 ${err}`,
                headerDate: store?.getState().header.headerDate
            });
            console.log("🚀 ~ file: AttendenceSummary.js:199 ~ storeStatus ~ err:", err)
        }
    }

    useEffect(() => {
        storeStatus()
    }, [])

    return (
        <>
            <View style={{ width: '100%' }} >
                {loader ? <View style={{ height: '100%' }} ><LoadingFullScreen /></View> : <>
                    <Header />
                    <View style={{ alignItems: 'center', flexDirection: 'row', position: 'relative', width: '98%', justifyContent: 'space-between' }} >
                        <View style={{ width: isMobile ? '50%' : '30%' }}>
                            <SubHeader name={`${moment(`01-${props.route.params.selectedMonth}`?.split('-')?.reverse()?.join('-')).format('MMM-YYYY')} Attendance`} onPress={() => props.navigation.goBack()} />
                        </View>
                        {/* New Button Start */}
                        <View style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', width: isMobile ? '40%' : '70%' }}>
                            <View>
                                <ButtonRoot onPress={() => openMTPDeviationReport()} preIconSize={12} preIconName='eye' title={isMobile ? 'MTP' : 'MTP Deviation'} width='auto' padding={10} height={25} />
                            </View>
                            {team && <View >
                                <ButtonRoot color={Colors.MRSTARTMYDAY} onPress={() => openJWReport()} preIconSize={12} preIconName='eye' title={isMobile ? 'JW' : 'JW Report'} width='auto' padding={10} height={25} />
                            </View>}

                            {/* New Button End */}

                            <View>
                                <ButtonRoot onPress={() => openMassReport()} preIconSize={12} preIconName='eye' title={isMobile ? 'MAS' : 'MAS Report'} width='auto' padding={10} height={25} />
                            </View>
                            <View
                            >
                                <ButtonRoot color={Colors.MRSTARTMYDAY} onPress={() => openSgpiReport()} preIconSize={12} preIconName='eye' title={isMobile ? 'SGPI' : 'SGPI Report'} width='auto' padding={10} height={25} />
                            </View>
                        </View>
                    </View>
                    <View style={{ borderColor: Colors.borderColor1, borderWidth: 0.5, borderRadius: 12, overflow: 'hidden', width: '96%', alignSelf: 'center' }} >
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ overflow: 'hidden', }} contentContainerStyle={{ width: !isMobile ? '100%' : 900, }}>
                            <BasicTable columnRatio={[1, 1, 1, 1, 0.8, 1, 1, 3, 1, 1]} tableHead={['Attendance Date', '( Start - End ) Time', 'Start Town', 'End Town', 'Shift Minutes', 'Expense Generated', 'Remark', 'Expense Remark', 'Status', 'Reports']} tableData={formattedData} RowBorderColor={Colors.borderColor1} HT={'85%'} />
                        </ScrollView>
                    </View>
                </>}
            </View >
            <ReportsDownloadorViewModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                // titles={['View DVP', 'Download DVP']}
                navigateTo={canNavigateTo}
                selectedMonth={props?.route?.params?.selectedMonth}
            />
        </>
    )
}

export default AttendenceSummary

const styles = StyleSheet.create({})