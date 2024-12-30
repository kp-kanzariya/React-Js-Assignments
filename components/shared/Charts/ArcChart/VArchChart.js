import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Easing,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSelector } from 'react-redux';
import { Colors } from '../../../../assets/config/Colors';
import { FontFamily } from '../../../../assets/fonts/FontFamily';
import { getActivitiesCallDashboard, getActivityKpisDashboard, getActivityKpisManagerFourMonths, getInputDistributionDashboard } from '../../../../Database/Helpers/OfflineChartHelper';
import { useNavigation } from '@react-navigation/native';
import { API } from '../../../../api/API';
import { getAppToken, getEmployeeId } from '../../../../api/commonRepository';
import { AlertDanger, AlertWarning } from '../../alerts/Alert';
import ReportsDownloadorViewModal from '../../modals/ReportsDownloadorViewModal';
import { useFocusEffect } from '@react-navigation/native';
import { appendTextToFile } from '../../../../helper/utils/Logger';
import { store } from '../../../../redux/store';
import useGetSGPIDistribution from '../../../../data/useGetSGPIDistribution';
import BrandCampaignVisitDao from '../../../../Database/DAO/BrandCampaignVisitDao';
import useCheckReplacement from '../../../../hooks/useCheckReplacement';

export default function VArchChart(props) {
  // const { teamList } = useSelector(state => state.teamUnderData);
  const checkReplacement = useCheckReplacement('dashboard');
  const {configuration} = useSelector(state => state.systemConfig);
  const navigation = useNavigation();
  const { headerDate } = useSelector(state => state.header);
  const { network } = useSelector(state => state.network);
  const [allGaugeData, setGaugeData] = React.useState([])
  const [emp, setEmp] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [canNavigateTo, setCanNavigateTo] = React.useState('')
  const { inputsData, loading } = useGetSGPIDistribution(moment().format('MM-YYYY'), 'All');



  useFocusEffect(
    useCallback(() => {
      async function temp(team) {
        let manager = '';
        let manager1 = false;
        let teamL = team?.length;
        if (teamL > 0) {
          manager = 'Team',
            manager1 = true;
        }
        const token = await getAppToken();
        if (token) {
          setGaugeData(new Array());
          let rcpa_compliance_or_coverage = await getActivityKpisDashboard({ moye: moment().format('MM-YYYY'), network: network, option: 1, isManager: manager1 });
          // console.log("checking data for activity call", rcpa_compliance_or_coverage)
          //Dr Coverage Compliance position - 2
          let first_bar_dr_coverage = parseInt((rcpa_compliance_or_coverage?.OutletsCovered / rcpa_compliance_or_coverage?.TotalOutlets) * 100)
          let second_bar_dr_coverage = parseInt((rcpa_compliance_or_coverage?.VfCoverage / rcpa_compliance_or_coverage?.TotalOutlets) * 100)
          let obj_DRCoverageCompliance =
          {
            id: 1,
            name: `${manager} Coverage Compliance`,
            number: first_bar_dr_coverage,
            number1: second_bar_dr_coverage,
            fill: first_bar_dr_coverage,
            fillyellow: second_bar_dr_coverage,
            ladgents: `${checkReplacement('OutletCoverageCompliance','outlet')||'Doctor'} Coverage : ${rcpa_compliance_or_coverage?.OutletsCovered ||'0'} / ${rcpa_compliance_or_coverage?.TotalOutlets||'0'}`,
            ladgents1: `${checkReplacement('OutletCoverageCompliance','outlet')||'Doctor'} Coverage as per VF : ${rcpa_compliance_or_coverage?.VfCoverage||'0'} / ${rcpa_compliance_or_coverage?.TotalOutlets||'0'}`,
            isSecondBarEnable: true,
            canNavigate: teamList.length == 0 ? 'DvpReport' : 'MassReport'
          }
          setGaugeData(prev => ([...prev, obj_DRCoverageCompliance]))

          //RCPA Compliance position - 3 
          let first_bar_RcpaDone = parseInt((rcpa_compliance_or_coverage?.RcpaDone / rcpa_compliance_or_coverage?.TotalOutlets) * 100)
          if (isNaN(first_bar_RcpaDone)) {
            first_bar_RcpaDone = 0
          }
          let obj1 =
          {
            id: 2,
            name: `${manager} RCPA Compliance`,
            number: first_bar_RcpaDone,
            number1: null,
            fill: first_bar_RcpaDone,
            fillyellow: null,
            ladgents: `Completed RCPA : ${rcpa_compliance_or_coverage?.RcpaDone||'0'} / ${rcpa_compliance_or_coverage?.TotalOutlets||'0'}`,
            ladgents1: '',
            isSecondBarEnable: false,
            canNavigate: 'DvpReport'
          }
          if(configuration?.['rcpa']){
            setGaugeData(prev => ([...prev, obj1]))
          }

          // get Input Distribution position - 3 
          // let inputsData = await getInputDistributionDashboard({ moye: moment(new Date()).format('MM-YYYY') })
          if (!loading) {
            let first_bar_input = parseInt((inputsData?.Debit / inputsData?.Credit) * 100)
            if (isNaN(first_bar_input)) {
              first_bar_input = 0
            }
            let obj2 =
            {
              id: 3,
              name: `${manager} SGPI Compliance`,
              number: first_bar_input,
              number1: null,
              fill: first_bar_input,
              fillyellow: null,
              ladgents: `SGPI Compliant ${checkReplacement('SGPICompliance','outlet')||'Doctors'}/Tagged ${checkReplacement('SGPICompliance','outlet')||'Doctors'} : ${inputsData?.Debit} / ${inputsData?.Credit}`,
              ladgents1: '',
              isSecondBarEnable: false,
              canNavigate: 'SGPIReport'
            }
            setGaugeData(prev => ([...prev, obj2]))
          }

          //Activities call position -4
          // let res = await getActivitiesCallDashboard({ headerDate: new Date() })
          let planned = await BrandCampaignVisitDao.getCampaignNCAVisits(false,moment().format('MM-YYYY'));
          let completed = await BrandCampaignVisitDao.getCampaignNCAVisits(true,moment().format('MM-YYYY'));
          let first_bar_activites = parseInt((completed / planned) * 100)
          // let second_bar_activites = parseInt((res?.callsDone / rcpa_compliance_or_coverage?.AttendanceDays) * 100)
          if (isNaN(first_bar_activites)) {
            first_bar_activites = 0
          }
          let obj =
          {
            id: 4,
            name: 'Campaign NCA (Completed vs Planned)',
            number: first_bar_activites,
            number1: null,
            fill: first_bar_activites,
            // fillyellow: 12,
            ladgents: `Completed/Plan: ${completed}/${planned}`,
            // ladgents1: `Planned : ${20}`,
            isSecondBarEnable: false,
            canNavigate: false
          }
          if(planned>0){
            setGaugeData(prev => ([...prev, obj]))    // ====commented for now and will be uncommented when Brand Campaign Module will be live
          }
          if (team.length > 0) {
            temp1()
          }
        }
      }

      async function temp1() {
        // setGaugeData(new Array());
        // console.log("teamList----------", teamList)
        const emp = await getEmployeeId();
        setEmp(emp)
        // if (teamList.length > 0) {
        // setGaugeData(new Array());

        //4 month Doctor Coverage Start

        let fourMonthsKpis = await getActivityKpisManagerFourMonths({ moye: moment(new Date()).format('MM-YYYY'), network: network })
        let fourMonthKpisBar = parseInt((fourMonthsKpis?.OutletsCovered / fourMonthsKpis?.TotalOutlets) * 100)
        if (isNaN(first_bar_NewJoinee)) {
          first_bar_NewJoinee = 0
        }
        let objFourMonthObj =
        {
          id: 5,
          name: 'Four Month Coverage',
          number: fourMonthKpisBar,
          number1: null,
          fill: fourMonthKpisBar,
          fillyellow: null,
          ladgents: `Total coverage: ${fourMonthKpisBar}`,
          ladgents1: '',
          isSecondBarEnable: false,
          canNavigate: false
        }
        setGaugeData(prev => ([...prev, objFourMonthObj]))

        //4 month Doctor Coverage End


        //Vacant HQs Start
        let vancantHq = await getActivityKpisDashboard({ moye: moment(new Date()).format('MM-YYYY'), network: network, option: 2, isManager: false });
        let first_bar_vancantHq = parseInt((vancantHq?.OutletsCovered / vancantHq?.TotalOutlets) * 100)
        if (isNaN(first_bar_vancantHq)) {
          first_bar_vancantHq = 0
        }
        let objVacant =
        {
          id: 6,
          name: 'Vacant HQs',
          number: first_bar_vancantHq,
          number1: null,
          fill: first_bar_vancantHq,
          fillyellow: null,
          ladgents: `Total coverage: ${first_bar_vancantHq}`,
          ladgents1: '',
          isSecondBarEnable: false,
          canNavigate: false
        }
        setGaugeData(prev => ([...prev, objVacant]))

        //Vacant HQs End


        //New joinee  Start
        let NewJoineeMr = await getActivityKpisDashboard({ moye: moment(new Date()).format('MM-YYYY'), network: network, option: 3, isManager: false });
        let first_bar_NewJoinee = parseInt((NewJoineeMr?.OutletsCovered / NewJoineeMr?.TotalOutlets) * 100)
        if (isNaN(first_bar_NewJoinee)) {
          first_bar_NewJoinee = 0
        }
        let objNewJoineeObj =
        {
          id: 7,
          name: 'New Joinee SEs',
          number: first_bar_NewJoinee,
          number1: null,
          fill: first_bar_NewJoinee,
          fillyellow: null,
          ladgents: `Total coverage: ${first_bar_NewJoinee}`,
          ladgents1: '',
          isSecondBarEnable: false,
          canNavigate: false
        }
        setGaugeData(prev => ([...prev, objNewJoineeObj]))
        //New joinee End
        // }
      }
      if (!loading) {
        temp(teamList)
      }
    }, [teamList, loading])
  )


  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  const { teamList } = useSelector(state => state.teamUnderData);
  // alert(JSON.stringify(teamList.length))



  // useFocusEffect(
  //   React.useCallback(()=>{
  //     async function temp1() {
  //       setGaugeData(new Array());
  //       console.log("teamList----------", teamList)
  //       const emp = await getEmployeeId();
  //       setEmp(emp)
  //       if (teamList.length > 0) {
  //       setGaugeData(new Array());

  //         //4 month Doctor Coverage Start

  //         let fourMonthsKpis = await getActivityKpisManagerFourMonths({ moye: moment(new Date()).format('MM-YYYY'), network: network })
  //         let fourMonthKpisBar = parseInt((fourMonthsKpis?.OutletsCovered / fourMonthsKpis?.TotalOutlets) * 100)
  //         if (isNaN(first_bar_NewJoinee)) {
  //           first_bar_NewJoinee = 0
  //         }
  //         let objFourMonthObj =
  //         {
  //           id:5,
  //           name: 'Four Month Coverage',
  //           number: fourMonthKpisBar,
  //           number1: null,
  //           fill: fourMonthKpisBar,
  //           fillyellow: null,
  //           ladgents: `Total coverage: ${fourMonthKpisBar}`,
  //           ladgents1: '',
  //           isSecondBarEnable: false,
  //           canNavigate: false
  //         }
  //         setGaugeData(prev => ([...prev, objFourMonthObj]))

  //         //4 month Doctor Coverage End


  //         //Vacant HQs Start
  //         let vancantHq = await getActivityKpisDashboard({ moye: moment(new Date()).format('MM-YYYY'), network: network, option: 2 });
  //         let first_bar_vancantHq = parseInt((vancantHq?.OutletsCovered / vancantHq?.TotalOutlets) * 100)
  //         if (isNaN(first_bar_vancantHq)) {
  //           first_bar_vancantHq = 0
  //         }
  //         let objVacant =
  //         {
  //           id:6,
  //           name: 'Vacant HQs',
  //           number: first_bar_vancantHq,
  //           number1: null,
  //           fill: first_bar_vancantHq,
  //           fillyellow: null,
  //           ladgents: `Total coverage: ${first_bar_vancantHq}`,
  //           ladgents1: '',
  //           isSecondBarEnable: false,
  //           canNavigate: false
  //         }
  //         setGaugeData(prev => ([...prev, objVacant]))

  //         //Vacant HQs End


  //         //New joinee  Start
  //         let NewJoineeMr = await getActivityKpisDashboard({ moye: moment(new Date()).format('MM-YYYY'), network: network, option: 3 });
  //         let first_bar_NewJoinee = parseInt((NewJoineeMr?.OutletsCovered / NewJoineeMr?.TotalOutlets) * 100)
  //         if (isNaN(first_bar_NewJoinee)) {
  //           first_bar_NewJoinee = 0
  //         }
  //         let objNewJoineeObj =
  //         {
  //           id:7,
  //           name: 'New Joinee MRs',
  //           number: first_bar_NewJoinee,
  //           number1: null,
  //           fill: first_bar_NewJoinee,
  //           fillyellow: null,
  //           ladgents: `Total coverage: ${first_bar_NewJoinee}`,
  //           ladgents1: '',
  //           isSecondBarEnable: false,
  //           canNavigate: false
  //         }
  //         setGaugeData(prev => ([...prev, objNewJoineeObj]))
  //         //New joinee End
  //       }
  //     }
  //     temp1()
  //   },[teamList])
  // )


  const onClick = (navigateTo) => {
    if (network) {
      try {
        if (navigateTo == 'MassReport') {
          navigation.navigate('Webview', {
            URL: API.MasReport,
            month: moment().format('MM-YYYY'),
            CameFrom: 'MasReport',
          });
        } else if (navigateTo == 'DvpReport') {
          if (headerDate != '') {
            navigation.navigate('Webview', {
              URL: API.DvpReport,
              date: headerDate,
              EmployeeId: emp,
              CameFrom: 'DarReport',
            });
          } else {
            AlertWarning('please choose date');
          }
        } else if (navigateTo == 'SGPIReport') {
          navigation.navigate('Webview', {
            URL: API.sgpiBrnadWiseDistribution,
            month: moment().format('MM-YYYY'),
            EmployeeId: emp,
            CameFrom: 'SGPIReport',
          });
        }
      } catch (err) {
        console.log("🚀 ~ file: VArchChart.js:239 ~ onClick ~ err:", err)
        appendTextToFile({
          text: `Error in catch fun onClick inside Top10Customers Line 52 ${err}`,
          headerDate: store?.getState().header.headerDate
        });
      }
    } else {
      AlertDanger('No internet connection.')
    }
  }

  const openPopup = (item) => {
    // alert('called');
    if (network) {
      try {
        if (item.canNavigate == 'MassReport') {
          setCanNavigateTo(item.canNavigate);
          setOpenModal(!openModal)
        } else if (item.canNavigate == 'DvpReport') {
          if (headerDate != '') {
            setCanNavigateTo(item.canNavigate);
            setOpenModal(!openModal)
          } else {
            AlertWarning('please choose date');
          }
        } else if (item.canNavigate == 'SGPIReport') {
          setCanNavigateTo(item.canNavigate);
          setOpenModal(!openModal)
        }
      } catch (err) {
        console.log("🚀 ~ file: VArchChart.js:304 ~ openPopup ~ err:", err)
      }
    } else {
      AlertDanger('No internet connection.');
    }
  }

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          width: '100%',
        }}>
        <FlatList
          // data={DATA}
          data={allGaugeData}
          key={isMobile ? (isLandscape ? 4 : 1) : isLandscape ? 4 : 2}
          numColumns={isMobile ? (isLandscape ? 4 : 1) : isLandscape ? 4 : 2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                testID={`${item.id}-${item.name}`}
                key={item.id}
                onPress={() => {/* onClick(item.canNavigate)*/openPopup(item) }}
                style={{
                  ...styles.container,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  padding: 12,
                }}>
                <Text
                  style={{
                    ...styles.BigText,
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    fontSize: 16,
                  }}>
                  {item.name}
                </Text>
                <View
                  style={{
                    ...styles.mainContainer,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center',
                    overflow: 'hidden',
                    width: '100%',
                  }}>
                  {Platform.select({
                    android: <AnimatedCircularProgress
                      // size={isLandscape ? 166 : 200}
                      size={isMobile ? (isLandscape ? 166 : 188) : isLandscape ? 166 : 198}
                      width={16}
                      fill={item.fill}
                      tintColor={Colors.MRSTARTMYDAY}
                      backgroundColor={Colors.borderColor}
                      padding={9}
                      arcSweepAngle={180}
                      rotation={270}
                      style={{ height: 100 }}

                    // renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="8" fill={Colors.productcolor5} />}
                    />, ios: <AnimatedCircularProgress
                      // size={isLandscape ? 166 : 200}
                      size={isMobile ? (isLandscape ? 166 : 188) : isLandscape ? 166 : 198}
                      width={16}
                      fill={item.fill}
                      tintColor={Colors.MRSTARTMYDAY}
                      backgroundColor={Colors.borderColor}
                      padding={9}
                      arcSweepAngle={180}
                      rotation={270}
                      style={{ height: 100 }}

                    // renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="8" fill={Colors.productcolor5} />}
                    />
                  })}

                </View>

                <View
                  style={{
                    top: -30,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: isLandscape ? '30%' : 100,
                  }}>

                </View>


                <View style={{ paddingVertical: 10, flex: 1, }}>
                  <View style={{ flexDirection: 'row', left: 0 }}>
                    <View
                      style={{
                        backgroundColor: Colors.MRSTARTMYDAY,
                        width: 10,
                        height: 10,
                        // alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: 2
                      }}
                    />
                    <Text style={{ ...styles.VerySmallText, left: 5, fontSize: 13, }}>
                      {item.ladgents}
                    </Text>
                  </View>
                  {item.isSecondBarEnable && <View style={{ flexDirection: 'row', left: 0 }}>
                    <View
                      style={{
                        backgroundColor: Colors.MRGREEN,
                        width: 10,
                        height: 10,
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: 2
                      }}
                    />
                    <Text style={{ ...styles.VerySmallText, left: 5, fontSize: 13, }}>
                      {item.ladgents1}
                    </Text>
                  </View>}
                </View>



                {item.isSecondBarEnable && item.fillyellow != null &&

                  <View
                    style={{
                      ...styles.mainContainer,
                      ...Platform.select({
                        ios: {
                          top: isLandscape ? 52 : 54,
                        },
                        android: {
                          top: isLandscape ? 56 : 60,
                        }
                      }),

                      position: 'absolute',
                      // overflow: 'hidden',
                    }}>
                    {Platform.select({
                      android: <AnimatedCircularProgress
                        size={isMobile ? (isLandscape ? 122 : 140) : isLandscape ? 124 : 158}
                        width={14}
                        fill={item.fillyellow}
                        tintColor={Colors.MRGREEN}
                        backgroundColor={Colors.borderColor1}
                        padding={2}
                        arcSweepAngle={180}
                        rotation={270}
                      // renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="8" fill={Colors.productcolor5} />}
                      />, ios: <AnimatedCircularProgress
                        // size={isLandscape ? 132 : 160}
                        size={isMobile ? (isLandscape ? 132 : 142) : isLandscape ? 124 : 158}
                        width={14}
                        fill={item.fillyellow}
                        tintColor={Colors.MRGREEN}
                        backgroundColor={Colors.borderColor1}
                        padding={2}
                        arcSweepAngle={180}
                        rotation={270}

                      // renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="8" fill={Colors.productcolor5} />}
                      />
                    })}

                  </View>}
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <ReportsDownloadorViewModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        // titles={['View DVP', 'Download DVP']}
        navigateTo={canNavigateTo}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 1.2,
    padding: 15,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.borderColor,
  },
  mainContainer: {
    // width: '100%',
    // backgroundColor: 'lightgrey',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  BigText: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: FontFamily.TTCommonsMedium,
  },
  SmallText: {
    fontSize: 11,
    color: Colors.black,
    fontFamily: FontFamily.TTCommonsMedium,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  VerySmallText: {
    fontSize: 10,
    color: Colors.black,
    fontFamily: FontFamily.TTCommonsMedium,
    textAlign: 'center',
  },
});

AnimatedCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
  useNativeDriver: false,
  delay: 0,
  isDouble: true
};