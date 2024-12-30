import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';

import DonutChart from '../shared/Charts/dount_chart/DonutChart';
import Label from '../shared/Label';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import { AlertWarning } from '../shared/alerts/Alert';
import moment from 'moment';
import AttendanceReportShimmer from './AttendanceReportShimmer';
import Spacer from '../shared/spacers/Spacer';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';

const AttendenceReport = props => {
  const [attendenceReport, setAttendenceReport] = useState({});
  // console.log("attendenceReport Data ===>",attendenceReport)

  const [show, setShow] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MM-YYYY'));
  const [loader, setLoader] = useState(true)

  const navigation = useNavigation();


  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const getAttendanceReport = async (selectedMonth, position) => {
    try {
      setLoader(true)
      // new code to be used start===
      let params = {
        position_id: position,
      };

      params['moye'] = selectedMonth
      const response = await getData({
        url: API.attendance_report,
        params: params,
      });
      if (response.statusCode == 200) {
        let dt = response.data;
        let f_data = Object.keys(dt).reduce((arr, item) => {
          arr.push({ y: dt[item], labels: item, color: generateColor() });
          return arr;
        }, []);
        // console.log("f_data", f_data);
        setAttendenceReport(f_data);
      } else {
        AlertWarning(response.message);
      }
      setShow(true);
      setLoader(false)
    } catch (err) {
      console.error(
        '🚀 ~ file: AttendenceReport.js:23 ~ getAttendanceReport ~ err:',
        err,
      );
      appendTextToFile({
        text: `Error in catch fun getAttendanceReport inside AttendanceReport Line 70 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  useEffect(() => {
    getAttendanceReport(selectedMonth, props.positionId);

  }, [selectedMonth, props.positionId]);
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);

  const OpenAttendanceSummary = () => {
    try {

      navigation.navigate('AttendenceSummary', { empId: props.empId, selectedMonth: selectedMonth });
    } catch (err) {
      console.log("🚀 ~ file: AttendenceReport.js:81 ~ OpenAttendanceSummary ~ err:", err)
      appendTextToFile({
        text: `Error in catch fun OpenAttendanceSummary inside Attendsance Line 89 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  }

  return (
    <>

      <View style={{ marginVertical: 5 }} />
      <Label
        Label="Attendance Report (Last Three Months)"
        lastFilterData={[
          { label: moment().format('MMMM'), id: moment().format('MM-YYYY') },
          { label: moment().subtract(1, 'month').format('MMMM'), id: moment().subtract(1, 'month').format('MM-YYYY') },
          { label: moment().subtract(2, 'month').format('MMMM'), id: moment().subtract(2, 'month').format('MM-YYYY') },
        ]}
        defaultSelected1={moment().format('MMMM')}
        onValueChange1={item => setSelectedMonth(item.id)}
        WRAP={'wrap'}
        WIDTHTEXT={'100%'}
      />
      <Spacer />
      {loader ? <AttendanceReportShimmer />
        :
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => OpenAttendanceSummary()}
          style={{
            ...styles.mainContainerCss,
            flex: 1,
            zIndex: 0
          }}>
          {show && <View style={{ marginTop: -20, flex: 1, zIndex: -1 }} ><DonutChart data={attendenceReport} size={props.circleSize} /></View>}
          <View style={{ ...styles.SubContainerCss }}>
            <View style={{ ...styles.ViewCss, flexWrap: isMobile ? 'wrap' : null, }}>
              {show &&
                attendenceReport?.map((i, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        ...styles.labelViewCss,
                        left: isMobile ? (isLandscape ? -10 : 0) : null,
                      }}>
                      <View
                        style={{
                          ...styles.labelViewCss2,
                          backgroundColor: i.color,
                        }}></View>
                      <Text
                        style={{
                          ...styles.textlabel,
                        }}>
                        {i?.labels} : {i?.y}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </View>
        </TouchableOpacity>}
      {/* <ModalRoot showModal={openModal} setShowModal={setOpenModal} content={<AttendenceSummary empId={props.empId} selectedMonth={selectedMonth} setOpenModal={setOpenModal} openModal={openModal} />} /> */}
    </>
  );
};

export default AttendenceReport;

AttendenceReport.defaultProps = {
  circleSize: 300
}

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
  SubContainerCss: {
    flexDirection: 'row',
    position: 'relative',
    bottom: 20,
  },
  ViewCss: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelViewCss: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelViewCss2: {
    height: 10,
    width: 10,
    borderRadius: 20,
  },
  textlabel: {
    marginLeft: 5,
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 14,
    color: Colors.black,
  },
});
