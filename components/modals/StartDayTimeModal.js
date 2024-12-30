import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import ModalRoot from '../shared/modals/ModalRoot';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import DateTimePicker from '../shared/datepicker/DateTimePicker';
import { useNavigation } from '@react-navigation/native';
import useResponsiveDimensions from '../../hooks/useResponsiveDimensions';
import { useDispatch, useSelector } from 'react-redux';
import { ImagesAssets } from '../shared/ImagesAssets';
import moment from 'moment';
import { Colors } from '../../assets/config/Colors';
import Spacer from '../shared/spacers/Spacer';
import { postData } from '../../api/Request';
import { API } from '../../api/API';
import TextInputRoot from '../shared/textinputs/TextInputRoot';
import { getEmployeeId } from '../../api/commonRepository';
import { AlertSuccess, AlertWarning } from '../shared/alerts/Alert';
import Entypo from 'react-native-vector-icons/Entypo';
import Dropdown from '../shared/dropdowns/DropdownComponent';
import { appendTextToFile } from '../../helper/utils/Logger';
import ConfirmationModal from '../shared/modals/ConfirmationModal';
import _ from 'lodash';
import TerritoryTownsDao from '../../Database/DAO/TerritoryTownsDao';


const TimeModalContent = ({
  handleAttendance,
  attendanceType,
  isMobile,
  isLandscape,
  handleLeave,
  towns,
  showModal,
  setShowModal,
  dateLimit,
  startTown,
  configuration
}) => {
  const [time, setTime] = useState(moment().format('hh:mm A'));
  const [selectedTown, setSelectedTown] = useState('');
  const [minimumDate, setMinimumDate] = useState(new Date());

  // useEffect(() => {
  // var start = new Date();
  // start.setUTCHours(10, 59, 25, 99);
  // setMinimumDate(start);
  // }, [])

  // alert(JSON.stringify(startTown));
  useEffect(() => {
    if (attendanceType == 'punchIn') {
      if (Object.keys(startTown)[0] != '-1') {
        setSelectedTown(Object.keys(startTown)[0]);
      }
    }
  }, [])

  return (
    <View style={{ ...styles.select_agenda_container_upper, position: 'relative' }}>
      {/* <ScrollView> */}
      <TouchableOpacity testID='closeDateList' style={{ right: 5, position: 'absolute', top: 5, zIndex: 999 }} >
        <Entypo
          name="cross"
          size={35}
          onPress={() => setShowModal(false)}
        />
      </TouchableOpacity>
      <View
        style={{
          ...styles.select_agenda_container_down,
        }}>
        {/* <View style={{alignSelf:'flex-end'}}>
            <Entypo name="cross" size={30} onPress={()=>setShowModal(!showModal)}/>
            </View> */}
        <View>

          <Image
            resizeMode="contain"
            style={{ height: isMobile ? (isLandscape ? 0 : 120) : 120, width: 120 }}
            source={ImagesAssets.Calandergif}
          />

        </View>

        {/* <View style={{...styles.heading_text_container}}>
            <Text style={{...styles.heading_text}}>
              {props.calanderHeading}
            </Text>
          </View> */}

        <View
          style={{
            ...styles.agenda_map_cont,
          }}>
          <Text style={{ ...styles.heading_text, fontSize: 18 }}>Mark Your Attendance</Text>
        </View>
        <Spacer h={15} />
        <View style={{ ...styles.agenda_date_time }}>
          <DateTimePicker
            height={45}
            borderColor="#f4f4f4"
            backgroundColor="#f4f4f4"
            mode="time"
            setDate={setTime}
            borderRadius={5}
          // minimumDate={new Date(dateLimit)}
          />
        </View>

      </View>
      {/* </ScrollView> */}
      <View style={{ width: '88%', alignSelf: 'center', zIndex: 9999, top: -10 }}>

        <View style={{ ...styles.agenda_date_time, zIndex: 5 }}>
          {/* <View style={{ zIndex: 5 }}> */}
          {attendanceType == 'punchIn' ? (Object.keys(startTown)[0] == '-1' ? <>
            <Text style={{ color: 'black', fontFamily: FontFamily.TTCommonsMedium }} >
              {Object.values(startTown)[0]}
            </Text>
            <Spacer />
            <Dropdown
              width={'100%'}
              backroundColor="#f4f4f4"
              borderRadius={5}
              borderwidth={0.5}
              borderColors={Colors.borderColor}
              options={towns}
              onSelect={setSelectedTown}
              HEIGHTS={200}
              placeholder="-Choose Town-"
            />
          </> :
            <Text style={{ color: 'black', fontFamily: FontFamily.TTCommonsMedium }} >
              You are going to start your day at <Text style={{ color: Colors.MRSTARTMYDAY, fontWeight: 'bold' }} >{Object.values(startTown)[0]?.Stownname}</Text>
            </Text>) :
            <Dropdown
              width={'100%'}
              backroundColor="#f4f4f4"
              borderRadius={5}
              borderwidth={0.5}
              borderColors={Colors.borderColor}
              options={towns}
              onSelect={setSelectedTown}
              // height={45}
              HEIGHTS={200}
              placeholder="-Choose Town-"
            />
          }
          {/* </View> */}
        </View>
        <Spacer />
        <View style={{ ...styles.agenda_date_time, zIndex: -1 }}>
          <ButtonRoot
            testID={'clickStartDay'}
            fontSize={isLandscape ? 18 : 16}
            onPress={() => {
              // alert(time)
              handleAttendance(attendanceType, time, selectedTown);
            }}
            color="#00acd3"
            borderRadius={7}
            title="Submit"
            width={'100%'}
          />
          {attendanceType == 'punchIn' && configuration?.['canMarkEmergencyLeave'] && (
            <>
              <Spacer />
              <ButtonRoot
                testID={'markAdhokLeave'}
                fontSize={isLandscape ? 18 : 16}
                onPress={() => {
                  handleLeave();
                }}
                color={Colors.MRGREEN}
                borderRadius={7}
                title="Mark day as Leave"
                width={'100%'}
              />
            </>
          )}
        </View>

      </View>

    </View>
  );
};

const StartDayTimeModal = props => {
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  const configuration = useSelector(state => state.systemConfig.configuration);
  const [AgendaModalWidth] = useResponsiveDimensions({
    mobile: ['40%', '90%'],
    tab: ['35%', '60%'],
  });

  const dispatch = useDispatch();
  const { attendenceRefresh, headerDate } = useSelector(state => state.header);
  const [confirmation, setConfirmation] = useState(false);
  const [towns, setTowns] = useState([]);

  const navigation = useNavigation();
  const markAdhokLeave = async () => {
    try {
      // setLoader(true);
      let empId = await getEmployeeId();
      let params = { employee_id: empId, date: headerDate, remark: '' };
      const res = await postData({ url: API.punchLeave, params: params });
      if (res.statusCode === 200) {
        AlertSuccess(res.message);
        props.setRefreshDateStatus(!props.refreshDateStatus);
        props.setShowModal(false);
        
        navigation.navigate('LeaveDashboard', { navigateFrom: 'AdhocLeave' });
      } else {
        props.setShowModal(false);
        AlertWarning(res.message);
      }
      // setLoader(false);
      setConfirmation(false);
      // dispatch({ type: 'REFRESH_ATTENDANCE', payload: !attendenceRefresh });
    } catch (err) {
      setConfirmation(false);
      console.error("🚀 ~ file: StartDayTimeModal.js:234 ~ markAdhokLeave ~ err:", err)
    }
  };

  const markAdhokLeaveDebounce = _.debounce(markAdhokLeave, 300);


  const handleLeave = () => {
    setConfirmation(true);
  };

  const getTowns = async () => {
    try {
      const response = await TerritoryTownsDao.getAllTerritoryTowns();

      let options = [];
      response?.map(item => {
        options.push({
          label: item.Stownname,
          value: item.Itownid,
        });
      });
      setTowns(options);
    } catch (err) {
      console.error('🚀 ~ file: MtpDayPlanner.js:98 ~ getTowns ~ err:', err);
      appendTextToFile({
        text: `Error in catch fun getTowns inside Dashboard screen Line 280 ${err}`,
        headerDate: headerDate,
      });
    }
  };

  useEffect(() => {
    getTowns();
  }, [])


  return (
    <>
      <ModalRoot
        testID={'StartDayModal'}
        width={AgendaModalWidth}
        padding={5}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        content={
          <>
            <TimeModalContent
              handleAttendance={props.handleAttendance}
              showModal={props.showModal}
              setShowModal={props.setShowModal}
              attendanceType={props.attendanceType}
              dateLimit={props.dateLimit}
              startTown={props.startTown}
              handleLeave={handleLeave}
              isLandscape={isLandscape}
              isMobile={isMobile}
              towns={towns}
              configuration={configuration}
            />
            <ConfirmationModal title={'Emergency Leave'} subTitle={'Are you sure you want to mark this day as Leave ?'} onConfirm={() => markAdhokLeaveDebounce()} showModal={confirmation} setShowModal={setConfirmation} />

          </>
        }
      />
    </>
  );
};

export default StartDayTimeModal;

const styles = StyleSheet.create({
  icon: {
    color: '#34acd3',
    fontSize: 40,
    borderRadius: 5,
  },
  activity_text: {
    fontFamily: FontFamily.TTCommonsBold,
    color: '#000000',
    fontSize: 8,
  },
  call_name_text: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000000',
    fontSize: 13,
  },
  work_text: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#828282',
    fontSize: 12,
  },
  heading_text: {
    fontFamily: FontFamily.TTCommonsBold,
    color: '#000000',
    fontSize: 16,
  },
  heading_text_container: {
    padding: 5,
  },
  radio_btn_container: {
    flexDirection: 'row',
    width: '100%',
  },
  radio_btn_container_first_child: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  agenda_day_container: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#ededed',
    margin: 2,
  },
  agenda_text_container: {
    flexDirection: 'column',
    marginTop: 5,
  },
  agenda_text_activity: {
    marginLeft: 5,
    justifyContent: 'center',
  },
  agenda_text_work: {
    marginLeft: 5,
    justifyContent: 'center',
  },

  leaveInput: {
    width: '100%',
    flexWrap: 'wrap',
  },
  leaveBtn: {
    marginTop: 15,
    width: '100%',
  },

  select_agenda_container_upper: {
    width: '100%',
  },

  select_agenda_container_down: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  field_heading_container: {
    padding: 2,
    width: '100%',
  },
  field_heading_text: {
    fontFamily: FontFamily.TTCommonsBold,
    color: '#000000',
    fontSize: 12,
  },
  agenda_map_cont: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agenda_date_time: {
    width: '100%',
    // marginTop: 20,
  },
});