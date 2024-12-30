import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,Platform } from 'react-native';

// import {
//   Table,
//   TableWrapper,
//   Row,
//   Rows,
//   Col,
// } from 'react-native-table-component';
import { Colors } from '../../../assets/config/Colors';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import BasicTable from '../tables/BasicTable';
import Label from '../Label';
import { getPositionId, getSpeciality } from '../../../api/commonRepository';
import moment from 'moment';
import Spacer from '../spacers/Spacer';
import { API } from '../../../api/API';
import { getData } from '../../../api/Request';
import { useSelector } from 'react-redux';
import FilterDropdown from '../dropdowns/FilterDropdown';
import { appendTextToFile } from '../../../helper/utils/Logger';
import { store } from '../../../redux/store';
import { TouchableOpacity } from 'react-native';
import { FontSize } from '../../../assets/fonts/Fonts';
import { useGetPositionData } from '../../../modules/lostPresecriber/hooks/useLostPrescriber';
import LostPrescriberModal from '../../modals/LostPrescriberModal';
import SimmerCampaign from '../../../screens/dcr/SimmerCampaign';
import AntDesign from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  iconSty:{color: Colors.white, fontSize: 12,marginLeft:3},
  button_cont: {flexDirection:'row',alignItems:'center',justifyContent:'center', zIndex: 1, position: 'absolute', top: 3, left: 160, backgroundColor: Colors.MRGREEN, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 10 },
  button_txt: { color: Colors.white, fontSize: FontSize.labelText, fontFamily: FontFamily.TTCommonsDemiBold, },
  container: { flex: 1 },
  head: { height: 40, backgroundColor: Colors.MRTABLESHEADINGBG, },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  t1: {
    backgroundColor: Colors.MRGREEN,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.TTCommonsDemiBold,
    paddingVertical: 10,
    fontSize: 9,
    height: 45
  },
  th: {
    textAlign: 'center',
    color: Colors.MRTAG,
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 12,
    // height:30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  t2: {
    backgroundColor: Colors.orange,
    textAlign: 'center',
    paddingVertical: 10,
    color: Colors.white,
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 9,
    height: 45
  },
  t3: {
    backgroundColor: Colors.red,
    textAlign: 'center',
    paddingVertical: 10,
    color: Colors.white,
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 9,
    height: 45
  },

  row: { height: 'auto', textAlign: 'center', },
  text: {
    color: Colors.MRTableTextHead,
    textAlign: 'center',
    fontFamily: FontFamily.TTCommonsMedium,
    padding: 5,
    fontSize: 10,

  },
  BlueHeading: {
    fontSize: 10,
    color: Colors.MRTableTextHead,
    textAlign: 'center',
    fontFamily: FontFamily.TTCommonsMedium,
    padding: 3,
  },
  TableMainView: {
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Colors.white,
    height: 220
    // flex:1
  },
});

const tableHead = [<Text style={styles.th}>Brand Name</Text>, <Text style={styles.th}>P1</Text>, <Text style={styles.th}>P2</Text>, <Text style={styles.th}>P3</Text>, <Text style={styles.th}>P4</Text>];

const tableData = [
  [
    'Azithral OS',
    <Text style={styles.t1}>00 28</Text>,
    <Text style={styles.t3}>00 24</Text>,
    <Text style={styles.t3}>00 12</Text>,
    <Text style={styles.t3}>00 14</Text>,
  ],
  [
    'Azithral OL',
    <Text style={styles.t2}>00 23</Text>,
    <Text style={styles.t1}>00 56</Text>,
    <Text style={styles.t3}>00 13</Text>,
    <Text style={styles.t3}>00 17</Text>,
  ],
  [
    'Laveta',
    <Text style={styles.t1}>00 28</Text>,
    <Text style={styles.t2}>00 24</Text>,
    <Text style={styles.t3}>00 12</Text>,
    <Text style={styles.t3}>00 14</Text>,
  ],
  [
    'Total',
    <Text style={styles.t1}>00 28</Text>,
    <Text style={styles.t2}>00 24</Text>,
    <Text style={styles.t3}>00 12</Text>,
    <Text style={styles.t3}>00 14</Text>,
  ],
];
export default function DetailingHeatMap(props) {
  const { network } = useSelector(state => state.network);
  const { teamList } = useSelector(state => state.teamUnderData);

  const [show, setShow] = React.useState(false);
  const [speciality, setSpeciality] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [fromdate, setFromdate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [todate, setToDate] = useState(moment().endOf('month').format('YYYY-MM-DD'));
  const [heatData, setHeatData] = useState([]);
  const [openPositionModal, setOpenPositionModal] = useState(false)
  const [position, setPosition] = useState(null)
  const { data } = useGetPositionData();
  const [loading, setLoading] = useState(true)
  const getdetailingHeat = async (classifi = '', position) => {
    try {

      let formattData = await getSpeciality();
      formattData.unshift({ id: 'All', label: 'All Specialities' });
      setSpeciality(formattData);
      let userPosition = await getPositionId();
      setLoading(true)
      setShow(true);
      let params = { start_date: fromdate, end_date: todate, classification: classifi == '' ? formattData[0].id : classifi, emp_id: props.empId, position_id: position ? position : userPosition }
      const response = await getData({ url: API.detailingHeatMap, params: params });
      if (response.statusCode === 200) {
        let formattedData = response.data.reduce((arr, item) => {
          arr.push([
            <View style={{
              justifyContent: 'center', alignItems: 'center', height: 30, borderColor: Colors.borderColor, alignSelf: 'center'
            }} >
              <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontFamily: FontFamily.TTCommonsMedium, fontSize: 12, color: 'black' }} >{item.brand}</Text></View>,
            <View style={{
              justifyContent: 'center', alignItems: 'center', flex: 1,
              height: 30, borderWidth: 1, borderColor: Colors.borderColor,
            }} ><Text style={{ color: '#000', fontFamily: FontFamily.TTCommonsMedium, fontSize: 12 }} >{item.p1}</Text></View>,
            <View style={{
              justifyContent: 'center', alignItems: 'center', flex: 1,
              height: 30, borderWidth: 1, borderColor: Colors.borderColor,
            }} ><Text style={{ color: '#000', fontFamily: FontFamily.TTCommonsMedium, fontSize: 12 }} >{item.p2}</Text></View>,
            <View style={{
              justifyContent: 'center', alignItems: 'center', flex: 1,
              height: 30,
            }} ><Text style={{ color: '#000', fontFamily: FontFamily.TTCommonsMedium, fontSize: 12 }} >{item.p3}</Text></View>,
            <View style={{
              justifyContent: 'center', alignItems: 'center', flex: 1,
              height: 30,
            }} ><Text style={{ color: '#000', fontFamily: FontFamily.TTCommonsMedium, fontSize: 12 }} >{item.p4}</Text></View>
          ]);
          return arr
        }, [])
        setHeatData(formattedData);
        setLoading(false)
      } else {
        AlertWarning(response.message);
        setLoading(false)
      }
    } catch (err) {
      appendTextToFile({
        text: `Error in catch fun getDetailingHeatMap inside DetailingHeatMap Line 197 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
      console.error("🚀 ~ file: DetailingHeatMap.js:193 ~ getdetailingHeat ~ err:", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (network) {
      getdetailingHeat(selectedSpeciality, position);
    } else {
      setLoading(false)
    }
  }, [position, selectedSpeciality, props.empId, fromdate, todate, network])

  const handleFilter = key => {
    try {
      if (key === 0) {
        let startDate = moment().startOf('month').format('YYYY-MM-DD');
        let endDate = moment().endOf('month').format('YYYY-MM-DD');
        setFromdate(startDate);
        setToDate(endDate);
        // setFullDate(moment().format('YYYY-MM-DD'));
      } else if (key === 1) {
        let startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        let endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
        setFromdate(startDate);
        setToDate(endDate);
        // setFullDate(moment().subtract(1, 'month').format('YYYY-MM-DD'));
      } else if (key === 2) {
        let startDate = moment().subtract(2, 'month').startOf('month').format('YYYY-MM-DD');
        let endDate = moment().format('YYYY-MM-DD');
        setFromdate(startDate);
        setToDate(endDate);
        // setFullDate(moment().subtract(2, 'month').format('YYYY-MM-DD'));
      }
    } catch (err) {
      console.error(
        '🚀 ~ file: BasicActivityReport.js:140 ~ handleFilter ~ err:',
        err,
      );
      appendTextToFile({
        text: `Error in catch fun handleFilter inside DetailingheatMap Line 239 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);


  const handlePress = (itm) => {
    setPosition(itm.position_id)
  }


  return (
    <View style={styles.container}>
      <Spacer />
      {show &&
        <>
          <Label
            Label="Detailing Heat Map (In Min)"
          // WRAP={'wrap'}

          // lastFilterData={[
          //   { label: 'Current month', id: 0 },
          //   { label: 'Last month', id: 1 },
          //   { label: 'Last three Months', id: 2 },
          // ]}
          // defaultSelected1={'Current month'}
          // onValueChange1={item => handleFilter(item.id)}
          // secondLastPosition={130}
          // // TPSS={!isMobile?-2:-25}
          // WIDTHTEXT={'30%'}
          // WRAP={'wrap'}
          // secondLastFilterData={speciality}
          // defaultSelected2={`${speciality[0]?.label}`}
          // onValueChange2={item => setSelectedSpeciality(item.id)}
          />
          {(teamList?.length > 0 && data && data.length > 0) && <TouchableOpacity onPress={() => { setOpenPositionModal(true) }} style={{ ...styles.button_cont, top: 3, left: isMobile ? 200 :160 }}>
            <Text style={{ ...styles.button_txt }}>{'Position'}</Text>
            <AntDesign
              name={'search1'}
              style={{ ...styles.iconSty }}
            />
          </TouchableOpacity>}
          <FilterDropdown right={isMobile ? 0 : 130} topp={isMobile ? 25 : 3} options={speciality} defaultSelected={`${speciality[0]?.label}`} onValueChange={(item) => { setSelectedSpeciality(item.id) }} />
          <FilterDropdown right={0} topp={3} options={[
            { label: 'Current month', id: 0 },
            { label: 'Last month', id: 1 },
            { label: isMobile ? 'Quarterly' : 'Last 3 Months', id: 2 },
          ]
          } defaultSelected={'Current month'} onValueChange={(item) => { handleFilter(item.id) }} />
        </>}
      <Spacer h={5} />
      {loading ? <SimmerCampaign /> :
        <>
          {isMobile && <Spacer h={20} />}
          <BasicTable HT={220} tableHead={tableHead} tableData={heatData} RowBorderWidth={1} RowBorderColor={Colors.borderColor1} />
        </>

      }

      {openPositionModal && <LostPrescriberModal DATA={data} handlePress={(i) => { handlePress(i) }}
        setShowModal={setOpenPositionModal} showModal={openPositionModal} />}

    </View>
  );
}

DetailingHeatMap.defaultProps = {
  tableTitle: false,
  tableHead: tableHead,
  tableData: tableData,
};
