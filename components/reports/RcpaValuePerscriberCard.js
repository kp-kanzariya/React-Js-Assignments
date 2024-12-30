import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { useSelector } from 'react-redux';
import Label from '../shared/Label';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import RcpaValuePerscriberCardShimmer from './RcpaValuePerscriberCardShimmer';
import Spacer from '../shared/spacers/Spacer';
import moment from 'moment';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';

const RcpaValuePerscriberCard = props => {
  const month = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const d = new Date();
  let currentMonth = month[d.getMonth()];
  // let currentMonth = month[d.getMonth()];
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  const [rcpaData, setRCPAData] = React.useState('');
  const [date, setDate] = React.useState(currentMonth);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MM-YYYY'));

  const [loader, setLoader] = useState(true)
  // alert(rcpaData.total_rcpa_value)
  const filterValue = item => {
    const month = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    if (item.label == 'Current Month') {
      const d = new Date();
      let currentMonth = month[d.getMonth()];
      setDate(currentMonth);
    } else if (item.label == 'Last Month') {
      const d = new Date();
      let lastMonth = month[d.getMonth() - 1];
      // alert(lastMonth)
      setDate(lastMonth);
    }
  };

  const getRCPAValue = async (selectedMonth, empId) => {

    try {
      setLoader(true)
      let response = await getData({
        url: API.rcpa_report,
        params: { moye: selectedMonth, employee_id: empId },
      });
      if (response.statusCode == 200) {
        setRCPAData(response.data);
        // console.log("response==>>", response.data)
        setLoader(false);
      } else {
        return null;
      }
    } catch (err) {
      appendTextToFile({
        text: `Error in catch fun getRCPAValue inside RCPAValuePrescriberCard Line 85 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
      console.error('errrr', err);
    }
  };

  React.useEffect(() => {
    if (props.empId) {
      getRCPAValue(selectedMonth, props.empId);
    }
    // alert(props.empId)
  }, [selectedMonth, props.empId]);
  // console.log(rcpaData?.total_rcpa_value)
  return (
    <>
      {/* <Spacer /> */}
      <View style={{ marginVertical: 5 }} />
      <Label
        Label="RCPA Value & Prescribers"
        defaultSelected1={moment().format('MMMM')}
        lastFilterData={[
          { label: moment().format('MMMM'), id: moment().format('MM-YYYY') },
          { label: moment().subtract(1, 'month').format('MMMM'), id: moment().subtract(1, 'month').format('MM-YYYY') },
          { label: moment().subtract(2, 'month').format('MMMM'), id: moment().subtract(2, 'month').format('MM-YYYY') },
        ]}
        onValueChange1={item => setSelectedMonth(item.id)}
        WRAP={'wrap'}
        WIDTHTEXT={'45%'}
      />
      {/* <View style={styles.MV3} /> */}
      <Spacer />
      {loader ?
        <RcpaValuePerscriberCardShimmer /> :
        <View
          style={{
            ...styles.maincontainer,
            flex: 1
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', }} >
              <Text style={{ ...styles.boldtext, }}>{(parseFloat(rcpaData?.total_rcpa_value) / 100000).toFixed(2)}</Text>
              <Text style={{ fontFamily: FontFamily.TTCommonsMedium, right: -25, top: 0, position: 'absolute', color: 'black', }} > lacs</Text>
            </View>
            <Text style={styles.smalltext}>Own RCPA Value</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.boldtext}>
              {rcpaData?.total_prescribers}
            </Text>
            <Text style={styles.smalltext}>Total Prescribers</Text>
          </View>
        </View>}
    </>
  );
};

export default RcpaValuePerscriberCard;

const styles = StyleSheet.create({
  boldtext: { fontFamily: FontFamily.TTCommonsMedium, fontSize: 55, color: '#34acd3' },
  smalltext: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText2,
    // top: -10,
    color: Colors.black,
  },

  maincontainer: {
    width: '100%',
    padding: 40,
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    // flex: 1,
  },
  MV3: { marginVertical: 3 },
  MV5: { marginVertical: 5 },
  MV8: { marginVertical: 8 },
  MainView: {
    width: '94%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    height: 'auto',
    justifyContent: 'space-between',
  },
});
