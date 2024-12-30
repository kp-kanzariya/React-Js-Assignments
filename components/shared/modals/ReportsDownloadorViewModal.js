import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ModalRoot from './ModalRoot';
import ButtonRoot from '../buttons/ButtonRoot';
import Spacer from '../spacers/Spacer';
import {
  SERVER_URL,
  downloadExcelReport,
  getAppToken,
  getEmployeeId,
  getPositionId,
} from '../../../api/commonRepository';
import {useNavigation} from '@react-navigation/native';
import {API} from '../../../api/API';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {AlertDanger, AlertWarning} from '../alerts/Alert';
import Entypo from 'react-native-vector-icons/Entypo';
import {appendTextToFile} from '../../../helper/utils/Logger';
import useCheckReplacement from '../../../hooks/useCheckReplacement';

const ReportsDownloadorViewModal = props => {
  const navigation = useNavigation();
  const checkReplacement = useCheckReplacement('reports');
  const {headerDate} = useSelector(state => state.header);
  const {network} = useSelector(state => state.network);

  const [firstTitle, setFirstTitle] = useState('');
  const [secondTitle, setSecondTitle] = useState('');
  const [emp, setEmp] = useState('');
  const [positionId, setPositionId] = useState(null);

  const onClick = navigateTo => {
    if (network) {
      props.setOpenModal(!props.openModal);
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
        } else if (navigateTo == 'PrescriberTally') {
          navigation.navigate('Webview', {
            URL: API.prescriberDataReport,
            CameFrom: 'PrescriberTally',
            position_id: props?.paramsData?.PositionId,
            brand_id: props?.paramsData?.BrandId,
            status: props?.paramsData?.Status,
            moye: props?.paramsData?.Moye,
            rcpa: props?.paramsData?.rcpa,
            visits: props?.paramsData?.visits,
          });
        } else if (navigateTo == 'PrescriberTallyAll') {
          navigation.navigate('Webview', {
            URL: API.prescriberDataReport,
            CameFrom: 'PrescriberTallyAll',
            position_id: props?.paramsData?.PositionId,
            brand_id: 'All',
            status: props?.paramsData?.Status,
            moye: props?.paramsData?.Moye,
            rcpa: props?.paramsData?.rcpa,
            visits: props?.paramsData?.visits,
          });
        } else if (navigateTo == 'PrescriberLadder') {
          navigation.navigate('Webview', {
            URL: API.DvpReport,
            CameFrom: 'PrescriberLadder',
            BrandId: props?.paramsData?.BrandId,
            Moye: props?.paramsData?.Moye,
            Status: props?.paramsData?.Status,
            territoryId: props?.paramsData?.territoryId,
          });
        } else if (navigateTo == 'PrescriberLadderRXer') {
          navigation.navigate('Webview', {
            URL: API.DvpReport,
            CameFrom: 'PrescriberLadderRXer',
            prescriberLevel: props?.paramsData?.prescriberLevel,
            territoryId: props?.paramsData?.territoryId,
            Moye: props?.paramsData?.Moye,
            employee_id: emp,
          });
        } else if (navigateTo == 'MTPDeviation') {
          if (headerDate != '') {
            navigation.navigate('Webview', {
              URL: API.MtpDeviationReport,
              CameFrom: 'MTPDeviation',
              date: moment(props?.selectedMonth, 'MM-YYYY').endOf('month').format('YYYY-MM-DD'),
            });
          } else {
            AlertWarning('please choose date');
          }
        } else if (navigateTo == 'JWReport') {
          navigation.navigate('Webview', {
            URL: API.JWReport,
            CameFrom: 'JWReport',
            month:props?.selectedMonth,
            position_id: positionId,
          });
        }
      } catch (err) {
        console.log('🚀 ~ file: VArchChart.js:239 ~ onClick ~ err:', err);
        appendTextToFile({
          text: `Error in catch fun onClick inside ReportsDownloadorViewModal Line 57 ${err}`,
          headerDate: headerDate,
        });
      }
    } else {
      AlertDanger('No internet connection');
    }
  };

  useEffect(() => {
    if (props.navigateTo) {
      if (props.navigateTo == 'MassReport') {
        setFirstTitle('View MAS Report');
        setSecondTitle('Download MAS Report');
      } else if (
        props.navigateTo == 'DvpReport' ||
        props.navigateTo == 'PrescriberTally' ||
        props.navigateTo == 'PrescriberTallyAll' ||
        props.navigateTo == 'PrescriberLadder' ||
        props.navigateTo == 'PrescriberLadderRXer'
      ) {
        setFirstTitle(`View ${checkReplacement('DVP','title')||'DVP'} Report`);
        setSecondTitle(`Download ${checkReplacement('DVP','title')||'DVP'} Report`);
      } else if (props.navigateTo == 'SGPIReport') {
        setFirstTitle('View SGPI Report');
        setSecondTitle('Download SGPI Report');
      } else if (props.navigateTo == 'MTPDeviation') {
        setFirstTitle('View MTP Deviation Report');
        setSecondTitle('Download MTP Deviation Report');
      } else if (props.navigateTo == 'JWReport') {
        setFirstTitle('View JW Report');
        setSecondTitle('Download JW Report');
      }
    }
    (async () => {
      let position = await getPositionId();
      setPositionId(position);
    })();
    setPositionId();
  }, [props.navigateTo]);

  const download = async () => {
    props.setOpenModal(!props.openModal); 

    try {
      let url = '';
      const serverurl = await SERVER_URL();
      const appptkn = await getAppToken();
      // const emp = await getEmployeeId();
      if (props.navigateTo == 'MassReport') {
        url = `${serverurl}${
          API.MasReport
        }?apptoken=${appptkn}&month=${moment().format(
          'MM-YYYY',
        )}&action=download`;
      } else if (props.navigateTo == 'DvpReport') {
        url = `${serverurl}${API.DvpReport}?apptoken=${appptkn}&date=${headerDate}&employee_id=${emp}&action=download`;
      } else if (props.navigateTo == 'SGPIReport') {
        url = `${serverurl}${
          API.sgpiBrnadWiseDistribution
        }?apptoken=${appptkn}&month=${moment().format(
          'MM-YYYY',
        )}&employee_id=${emp}&action=download`;
      } else if (props?.navigateTo == 'PrescriberTally') {
        if (!props?.paramsData?.PositionId) {
          AlertWarning('Position not Found.');
        } else {
          url = `${serverurl}${API.prescriberDataReport}?position_id=${props?.paramsData?.PositionId}&brand_id=${props?.paramsData?.BrandId}&rcpa=${props?.paramsData?.rcpa}&visits=${props?.paramsData?.visits}&status=${props?.paramsData?.Status}&moye=${props?.paramsData?.Moye}&apptoken=${appptkn}&action=download`;
        }
      } else if (props?.navigateTo == 'PrescriberTallyAll') {
        if (!props?.paramsData?.PositionId) {
          AlertWarning('Position not Found.');
        } else {
          url = `${serverurl}${API.prescriberDataReport}?position_id=${
            props?.paramsData?.PositionId
          }&moye=${
            props?.paramsData?.Moye
          }&brand_id=${'All'}&apptoken=${appptkn}&action=download`;
        }
      } else if (props?.navigateTo == 'PrescriberLadder') {
        url = `${serverurl}${API.DvpReport}?employee_id=${emp}&BrandId=${props?.paramsData?.BrandId}&territoryId=${props?.paramsData?.territoryId}&Moye=${props?.paramsData?.Moye}&Status=${props?.paramsData?.Status}&apptoken=${appptkn}&action=download`;
      } else if (props?.navigateTo == 'PrescriberLadderRXer') {
        url = `${serverurl}${API.DvpReport}?prescriberLevel=${props?.paramsData?.prescriberLevel}&territoryId=${props?.paramsData?.territoryId}&Moye=${props?.paramsData?.Moye}&employee_id=${emp}&action=download`;
      } else if (props?.navigateTo == 'MTPDeviation') {
        url = `${serverurl}${API.MtpDeviationReport}?apptoken=${appptkn}&date=${moment(props?.selectedMonth, 'MM-YYYY').endOf('month').format('YYYY-MM-DD')}&action=download`;
      } else if (props?.navigateTo == 'JWReport') {
        url = `${serverurl}${API.JWReport}?apptoken=${appptkn}&month=${props?.selectedMonth}&position_id=${positionId}&action=download`;
      }
      downloadExcelReport(url, props.navigateTo);
    } catch (err) {
      console.error(
        '🚀 ~ file: ReportsDownloadorViewModal.js:88 ~ download ~ err:',
        err,
      );
      appendTextToFile({
        text: `Error in catch fun ReportsDownloadorViewModal inside ReportsDownloadorViewModal Line 102 ${err}`,
        headerDate: headerDate,
      });
    }
  };
  
  useEffect(() => {
    const temp = async () => {
      try {
        let empp = await getEmployeeId();
        setEmp(empp);
      } catch (err) {
        console.log(
          '🚀 ~ file: ReportsDownloadorViewModal.js:94 ~ temp ~ err:',
          err,
        );
        appendTextToFile({
          text: `Error in catch fun ReportsDownloadorViewModal inside ReportsDownloadorViewModal Line 117 ${err}`,
          headerDate: headerDate,
        });
      }
    };
    temp();
  }, []);

  return (
    <ModalRoot
      width={250}
      showModal={props.openModal}
      setShowModal={props.setOpenModal}
      content={
        <View style={{width: 220, alignSelf: 'center', position: 'relative'}}>
          <TouchableOpacity
            onPress={() => props.setOpenModal(!props.openModal)}
            style={{position: 'absolute', top: -20, right: -5}}>
            <Entypo name="circle-with-cross" size={25} />
          </TouchableOpacity>
          <Spacer />

          <ButtonRoot
            padding={5}
            height={40}
            title={firstTitle}
            onPress={() => {
              onClick(props?.navigateTo);
            }}
          />
          <Spacer h={5} />
          <ButtonRoot
            padding={5}
            height={40}
            title={secondTitle}
            onPress={() => {
              download();
            }}
          />
        </View>
      }
    />
  );
};

export default ReportsDownloadorViewModal;

const styles = StyleSheet.create({});
