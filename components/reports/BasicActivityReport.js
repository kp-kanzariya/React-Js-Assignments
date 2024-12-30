import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { useSelector } from 'react-redux';
import Label from '../shared/Label';
import {
  getActivitiesCallDashboard,
  getActivityKpisDashboard,
  getInputDistributionDashboard,
} from '../../Database/Helpers/BasicActivityHelper';
import moment from 'moment';
import BasicActivityReportShimmer from './BasicActivityReportShimmer';
import Spacer from '../shared/spacers/Spacer';
import { API } from '../../api/API';
import { useNavigation } from '@react-navigation/native';
import { SERVER_URL, downloadExcelReport, getAppToken, getEmployeeId } from '../../api/commonRepository';
import ModalRoot from '../shared/modals/ModalRoot';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import Entypo from 'react-native-vector-icons/Entypo';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';
import OutletTagsDAO from '../../Database/DAO/OutletTagsDAO';
import useCheckReplacement from '../../hooks/useCheckReplacement';

const BasicActivityReport = (props) => {
  const checkReplacementNew = useCheckReplacement('reports');
  const navigation = useNavigation();
  const { teamList } = useSelector(state => state.teamUnderData);
  const { configuration } = useSelector(state => state.systemConfig);
  const { headerDate } = useSelector(state => state.header);
  const { network } = useSelector(state => state.network);
  const [allGaugeData, setGaugeData] = React.useState([]);
  const [moYe, setMoYe] = useState(moment().format('MM-YYYY'));
  const [fullDate, setFullDate] = useState(moment().format('YYYY-MM-DD'));
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  // const [callsDone, setCallsDone] = useState('');
  const [emp, setEmp] = useState('');
  const [filterTagOptions, setFilterTagOptions] = useState([])
  const [tag, setTag] = useState('All Tags')

  React.useEffect(() => {

    const getEmp = async () => {
      try {
        const emp = await getEmployeeId();
        setEmp(emp);
      } catch (err) {
        console.log("🚀 ~ file: BasicActivityReport.js:35 ~ getEmp ~ err:", err)
        appendTextToFile({
          text: `Error in catch fun getEmp inside BasicActivityReport Line 47 ${err}`,
          headerDate: store?.getState().header.headerDate
        });
      }
    }

    getEmp();
    async function temp(moYe) {
      // var positionId = await getPositionId()
      setShow(false);
      setLoader(true)
      setGaugeData([]);
      let rcpa_compliance_or_coverage = await getActivityKpisDashboard({
        moye: moYe,
        network: network,
        positionId: props.positionId,
      });

      //Dr Coverage Compliance position - 2
      let first_bar_dr_coverage = parseInt(
        (rcpa_compliance_or_coverage?.OutletsCovered /
          rcpa_compliance_or_coverage?.TotalOutlets) *
        100,
      );
      let second_bar_dr_coverage = parseInt(
        (rcpa_compliance_or_coverage?.VfCoverage /
          rcpa_compliance_or_coverage?.TotalVfq) *
        100,
      );
      let obj_DRCoverageCompliance = {
        name: 'DoctorCoverage',
        count: rcpa_compliance_or_coverage?.OutletsCovered,
        percent: first_bar_dr_coverage,
      };

      let Obj_VisitFrequency = {
        name: 'VisitFrequencyCompliance',
        count: rcpa_compliance_or_coverage?.VfCoverage,
        percent: second_bar_dr_coverage,
      };
      setGaugeData(prev => [
        ...prev,
        obj_DRCoverageCompliance,
        Obj_VisitFrequency,
      ]);
      let first_bar_RcpaDone = parseInt(
        (rcpa_compliance_or_coverage?.OutletsCovered /
          rcpa_compliance_or_coverage?.RcpaDone) *
        100,
      );
      if (isNaN(first_bar_RcpaDone)) {
        first_bar_RcpaDone = 0;
      }
      let obj1 = {
        name: 'RCPACompliance',
        count: rcpa_compliance_or_coverage?.RcpaDone,
        percent: first_bar_RcpaDone,
      };
      setGaugeData(prev => [...prev, obj1]);

      // get Input Distribution position - 3
      let input_distribution = await getInputDistributionDashboard({
        moye: moYe,
      });
      let first_bar_input = parseInt(
        (input_distribution?.totalDebit / input_distribution?.totalCredit) *
        100,
      );
      if (isNaN(first_bar_input)) {
        first_bar_input = 0;
      }
      // let obj2 = {
      //   name: 'Input Distribution',
      //   number: first_bar_input,
      //   number1: null,
      //   fill: first_bar_input,
      //   fillyellow: null,
      //   ladgents: `Distribution: ${first_bar_input}%`,
      //   ladgents1: '',
      //   isSecondBarEnable: false,
      // };
      // setGaugeData(prev => [...prev, obj2]);

      //Activities call position -4
      let res = await getActivitiesCallDashboard(fullDate);
      let first_bar_activites = parseInt(
        (res?.plannedActivitiesCall / res?.callsDone) * 100,
      );
      if (isNaN(first_bar_activites)) {
        first_bar_activites = 0;
      }
      let totalCallobj = {
        name: 'TotalCalls',
        count: res?.plannedActivitiesCall,
      };

      let CallCoverageObj = {
        name: 'CallCoverage',
        count: res?.callsDone / moment(fullDate).daysInMonth(),
        percent:
          (parseInt(
            parseInt(res?.callsDone) / parseInt(moment(fullDate).daysInMonth()),
          ) /
            parseInt(res?.plannedActivitiesCall)) *
          100 || 0,
      };

      setGaugeData(prev => [...prev, totalCallobj, CallCoverageObj]);
      setShow(true)
      setLoader(false)
    }
    // temp(moYe);

    // alert(props.positionId);
    // new code after getting attendence days key in data ==

    const getActivityData = async (positionId, tag) => {


      // const callsDoneRes = await getActivitiesCallDashboard(fullDate);
      const dt = await getActivityKpisDashboard({
        moye: moYe,
        network: network,
        positionId: positionId,
        tag: tag
      });
      // alert(JSON.stringify(dt))

      setGaugeData(dt)
      // setCallsDone(dt.TotalCalls)
      setShow(true)
      setLoader(false)
    }
    if (props.positionId && tag) {
      getActivityData(props.positionId, tag);
    }
    // ==========
  }, [moYe, props.positionId, tag]);
  // alert(moment(fullDate).daysInMonth())
  // console.log("props?.checkReplacement('BasicAcitivityReport', 'showTagsFilter')",props?.checkReplacement('BasicActivityReport', 'showTagsFilter'));

  React.useEffect(() => {
    try {
      if (props?.checkReplacement('BasicActivityReport', 'showTagsFilter')) {
        getOutletTags()
      }
    } catch (error) {
      console.error(`Error in getOutletsTags Function Errror in line no 192-->`, error)
    }
  }, [])

  const handleFilter = key => {
    try {
      if (key === 0) {
        let moye = moment().format('MM-YYYY');
        setMoYe(moye);
        setFullDate(moment().format('YYYY-MM-DD'));
      } else if (key === 1) {
        let moye = moment().subtract(1, 'month').format('MM-YYYY');
        setMoYe(moye);
        setFullDate(moment().subtract(1, 'month').format('YYYY-MM-DD'));
      } else if (key === 2) {
        let moye = moment().subtract(2, 'month').format('MM-YYYY');
        setMoYe(moye);
        setFullDate(moment().subtract(2, 'month').format('YYYY-MM-DD'));
      }
    } catch (err) {
      console.error(
        '🚀 ~ file: BasicActivityReport.js:140 ~ handleFilter ~ err:',
        err,
      );
      appendTextToFile({
        text: `Error in catch fun handleFilter inside BasicActivityReport Line 204 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  const handleTags = (tags) => {
    try {
      setTag(tags?.label)
    } catch (err) {
      console.error(`handleTags function Error --->`, err);

    }
  }

  const getOutletTags = async () => {
    try {
      let res = await OutletTagsDAO.getAllTags();
      let frmtData = res?.reduce((arr, item) => {
        arr.push({ id: item?.OutletTagId, label: item?.TagName })
        return arr
      }, [])
      frmtData.unshift({ id: '', label: 'All Tags' })
      setFilterTagOptions(frmtData)

    } catch (err) {
      appendTextToFile({
        text: `Error in catch fun getOutletTags inside  Line 196 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
      console.log("🚀 ~ file: BasicActivityReport.js:237 ~ getOutletTags ~ err:", err)
    }
  }


  const onClick = async (action, report) => {
    if (network) {
      setOpenModal(!openModal);
      try {
        if (action == 'webview') {
          if (report == 'MAS') {
            navigation.navigate('Webview', {
              URL: API.MasReport,
              month: moment().format('MM-YYYY'),
              CameFrom: 'MasReport',
            });
          } else if (report == checkReplacementNew('DVP','title')||'DVP') {
            navigation.navigate('Webview', {
              URL: API.DvpReport,
              date: headerDate,
              EmployeeId: emp,
              CameFrom: 'DarReport',
            });
          }

        } else {
          const serverurl = await SERVER_URL();
          const appptkn = await getAppToken();
          if (report == 'MAS') {
            let url = `${serverurl}${API.MasReport}?apptoken=${appptkn}&month=${moYe}&action=download`
            downloadExcelReport(url, 'MASReport')
          } else if (report == 'DVP') {
            let url = `${serverurl}${API.DvpReport}?apptoken=${appptkn}&employee_id=${emp}&date=${headerDate}&action=download`
            downloadExcelReport(url, 'DVPReport')
          }
        }
      } catch (err) {
        appendTextToFile({
          text: `Error in catch fun onClick inside BasicActivityReport Line 244 ${err}`,
          headerDate: store?.getState().header.headerDate
        });
        console.log("🚀 ~ file: VisitHistory.js:51 ~ onClick ~ err:", err)
      }
    } else {
      AlertDanger('No internet connection.')
    }
  }

  return (
    <>
      {props?.checkReplacement('BasicActivityReport', 'showTagsFilter') ? <Label
        Size={14}
        Family={FontFamily.TTCommonsMedium}
        Label={'Basic Activity Report'}
        TOP={2}
        lastFilterData={[
          { label: moment().format('MMMM'), id: 0 },
          { label: moment().subtract(1, 'month').format('MMMM'), id: 1 },
          { label: moment().subtract(2, 'months').format('MMMM'), id: 2 },
        ]}
        defaultSelected1={moment().format('MMMM')}
        onValueChange1={item => handleFilter(item.id)}



        {...(filterTagOptions[0]?.label && {
          secondLastFilterData: filterTagOptions,
          defaultSelected2: filterTagOptions[0]?.label,
          onValueChange2: (tags) => handleTags(tags),

        })}
      /> :
        <Label
          Size={14}
          Family={FontFamily.TTCommonsMedium}
          Label={'Basic Activity Report'}
          TOP={2}
          lastFilterData={[
            { label: moment().format('MMMM'), id: 0 },
            { label: moment().subtract(1, 'month').format('MMMM'), id: 1 },
            { label: moment().subtract(2, 'months').format('MMMM'), id: 2 },
          ]}
          defaultSelected1={moment().format('MMMM')}
          onValueChange1={item => handleFilter(item.id)}
        />
      }

      <Spacer h={10} />
      {loader ? <BasicActivityReportShimmer /> :
        show && <View style={{ ...styles.container, padding: props.container_padding }}>
          {/* {data.map((itm, indx) => {
          return ( */}
          <TouchableOpacity
            onPress={() => {
              setTitle('MAS')
              setOpenModal(!openModal);
            }}
            style={{
              ...styles.box_view,
              backgroundColor: '#e2f2ff',
              padding: props.box_padding
            }}>
            <Text style={{ ...styles.score_text, color: '#0db0d5' }}>
              {`${allGaugeData.TotalCalls}`}
            </Text>
            <Text style={{ ...styles.title_txt, top: 1 }}>Total Calls Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTitle('MAS')
              setOpenModal(!openModal);
            }}
            style={{
              ...styles.box_view,
              backgroundColor: '#e2f2ff',
              padding: props.box_padding
            }}>
            <Text style={{ ...styles.score_text, color: '#0db0d5' }}>
              {allGaugeData.AttendanceDays == 0 ? 0 : parseFloat(allGaugeData.TotalCalls / allGaugeData.AttendanceDays).toFixed(2)}
            </Text>
            <Text style={{ ...styles.title_txt, top: 1 }}>Call Average</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTitle('MAS')
              setOpenModal(!openModal);
            }}
            style={{
              ...styles.box_view,
              backgroundColor: '#e2f2ff',
              padding: props.box_padding
            }}>
            <Text style={{ ...styles.score_text, color: '#0db0d5' }}>
              {`${allGaugeData.OutletsCovered}/${allGaugeData.TotalOutlets}`}
            </Text>
            <Text style={{ ...styles.title_txt, top: 1 }}>{props?.checkReplacement('BasicActivityReport', 'OutletCoverage') || 'Doctor Coverage'}</Text>
          </TouchableOpacity>
          {!teamList.length > 0 && <TouchableOpacity
            onPress={() => {
              setTitle('MAS')
              setOpenModal(!openModal);
            }}
            style={{
              ...styles.box_view,
              backgroundColor: '#e2f2ff',
              padding: props.box_padding
            }}>
            <Text style={{ ...styles.score_text, color: '#0db0d5' }}>
              {`${allGaugeData.VfCoverage}/ ${allGaugeData.TotalOutlets}`}
            </Text>
            <Text style={{ ...styles.title_txt, top: 1 }}>
              Visit Frequency Compliance
            </Text>
          </TouchableOpacity>}
          {!teamList.length > 0 && configuration?.['rcpa'] && <TouchableOpacity
            onPress={() => {
              setTitle(checkReplacementNew('DVP','title')||'DVP')
              setOpenModal(!openModal);
            }}
            style={{
              ...styles.box_view,
              backgroundColor: '#e2f2ff',
              padding: props.box_padding
            }}>
            <Text style={{ ...styles.score_text, color: '#0db0d5' }}>
              {`${allGaugeData.RcpaDone} / ${allGaugeData.TotalOutlets}`}
            </Text>
            <Text style={{ ...styles.title_txt, top: 1 }}>RCPA Compliance</Text>
          </TouchableOpacity>}
          {/* );
        })} */}
        </View>}
      <ModalRoot width={250} showModal={openModal} setShowModal={setOpenModal} content={
        <View style={{ width: 230, alignSelf: 'center', position: 'relative' }} >
          <TouchableOpacity onPress={() => setOpenModal(!openModal)}
            style={{ position: 'absolute', top: -20, right: -5, }}
          >
            <Entypo name='circle-with-cross' size={30} />
          </TouchableOpacity>
          <Spacer />
          <ButtonRoot padding={5} height={40} title={`View ${title} Report`} onPress={() => { onClick('webview', title) }} />
          <Spacer h={5} />
          <ButtonRoot padding={5} height={40} title={`Download ${title} Report`} onPress={() => { onClick('download', title) }} />
        </View>
      } />
    </>

  );
};

export default BasicActivityReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  box_view: {
    flex: 1,
    margin: 7,
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    alignSelf: 'center',
    minWidth: 200,
    // backgroundColor:'red'
    // width: 180,
    // alignSelf:'center'
  },
  score_text: {
    fontFamily: FontFamily.TTCommonsDemiBold,
    fontSize: 25,
  },
  title_txt: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 12,
    color: '#000',
    top: -3,
  },
});

BasicActivityReport.defaultProps = {
  data: [
    {
      score: '399',
      title: 'Total Calls done',
      id: 1,
      backgroundColor: '#eae0ff',
      color: '#8d65df',
    },
    {
      score: '400(50%)',
      title: 'Call Average',
      id: 2,
      backgroundColor: '#e2f2ff',
      color: '#04add4',
    },
    {
      score: '20',
      title: 'Doctor Coverage',
      id: 3,
      backgroundColor: '#fef6e0',
      color: '#d5b14d',
    },
    {
      score: '1999',
      title: 'Visit Frequency Compliance',
      id: 4,
      backgroundColor: '#ecfce6',
      color: '#50c624',
    },
    {
      score: '499',
      title: 'RCPA Compliance',
      id: 4,
      backgroundColor: '#fde0e0',
      color: '#ca7c7c',
    },
  ],
  box_padding: 15,
  container_padding: 10,
  box_fontSize: 20
};
