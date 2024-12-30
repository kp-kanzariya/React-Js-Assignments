import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ModalRoot from '../shared/modals/ModalRoot';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import { RadioButton } from 'react-native-paper';
import StyleCss from '../../assets/css/styleOutlet';
import useResponsiveDimensions from '../../hooks/useResponsiveDimensions';
import moment from 'moment';
import { AlertWarning } from '../shared/alerts/Alert';
import Spacer from '../shared/spacers/Spacer';
// import StartDayTimeModal from './StartDayTimeModal';
import { useDispatch, useSelector } from 'react-redux';
import { MyThemeClass } from '../shared/Theme/ThemeDarkLightColor';
import DateLockWarningModal from './DateLockWarningModal';
import { StoreDatatoAsync } from '../../helper/utils/AsyncStorageServices';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import ShimmerDateList from '../../modules/stp/components/ShimmerDateList';
import { appendTextToFile } from '../../helper/utils/Logger';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import { useFocusEffect } from '@react-navigation/native';



const DateListModal = props => {
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  const { network } = useSelector(state => state.network);
  const [modalWidth] = useResponsiveDimensions({
    mobile: ['50%', '90%'],
    tab: ['40%', '60%'],
  });
  const { mode } = useSelector(state => state.mode);
  const headerDate = useSelector(state => state.header.headerDate);
  const [dayType, setDayType] = useState('R');
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const [checked, setChecked] = React.useState();
  const [dateLockModal, setDateLockModal] = useState(false);
  const [datesData, setDatesData] = useState(null);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [lockedReason, setLockedReason] = useState('');
  const [dateListShimmer, setDateListShimmer] = useState(true);
  // alert(dateLockModal);
  const handleChech = item => {
    setChecked(item.date);
    setDate(item.date);
  };
  // console.log(props?.data)
  const startDayChooseDate = async (dt, status) => {
    console.log("dt",dt);
    if(dt==headerDate){
      AlertWarning('This date is already selected.');
      return;
    }
    if (date == '' || date != dt) {
      AlertWarning('please mark correct date');
      return
    }
    props.setDateListModal(!props.datelistModal)
    if (status == -1) {
      setDateLockModal(true);
    } else {
      dispatch({ type: 'ADD_HEADER_DATE', payload: date });
      StoreDatatoAsync('@headerDate', date);

    }

  };

  const RenderFunction = ({ item, index }) => {
    // alert(item.punchStatus);
    const handleTitle = (key, item) => {
      if (key == 'name') {
        if (item.punchStatus == -1) {
          return 'Lock';
        } else {
          return 'Open';
        }
      } else {
        if (item.punchStatus == -1) {
          return 'lock';
        } else {
          return null;
        }
      }
    };


    return (
      <View
        style={{
          ...styles.renderFunCont,
        }}>
        <View style={{ ...styles.renderFunDownCont }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton.Android
              value={item.date}
              color={'#00ACD3'}
              status={checked == item.date ? 'checked' : 'unchecked'}
              onPress={() => handleChech(item)}
            />
            <View style={{}}>
              <Text style={styles.title}>
                {moment(item.date).format('dddd, Do MMM YYYY')}
              </Text>
              <Text style={{ ...styles.discription, color: 'gray' }}>{item.Note}</Text>
            </View>
          </View>
          <View>
            <ButtonRoot
              testID={`datelist-${item?.date}`}
              iconSize={12}
              preIconName={handleTitle('icon', item)}
              // preIconStyle={{color:handleTitle('name', item)=='lock'?'orange':'white',}}
              textColor={handleTitle('name', item) == 'Lock' ? '#e74c3c' : 'white'}
              borderWidth={1}
              borderColor={handleTitle('name', item) == 'Lock' ? '#e74c3c' : Colors.MRSTARTMYDAY}
              borderRadius={15}
              onPress={() => {
                startDayChooseDate(item.date, item.punchStatus);
              }}
              title={handleTitle('name', item)}
              // textColor={'white'}
              padding={handleTitle('name', item) == 'Lock' ? 2 : 6}
              height={25}
              color={handleTitle('name', item) == 'Lock' ? Colors.borderColor1 : themecolor.HEADERTHEMECOLOR}
            />
          </View>
        </View>

        <View
          style={{
            ...styles.custom_boder,
          }}></View>
      </View>
    );
  };

  const getPunchDates = async () => {
    setDatesData(null);
    try {
      setDateListShimmer(true);
      let response = await getData({
        url: API.punchStatus,
        params: { day_type: dayType },
      });
      if (response?.statusCode == 200) {
        setDatesData(response?.data?.reverse());
        // setLoader(false);
        // if (headerDate == '' || headerDate == null) {
        // setTimeout(() => {
        // setDateListModal(true);
        // }, 2000);
        // }
      } else if (response.statusCode == 400) {
        setIsAccountLocked(true);
        setLockedReason(response.message);
        // setLoader(false);
        // setDateListModal(true);
        // setOnLeave(false);
        // setEndDayButton(false);
        // setStartDayButton(false);
      } else {
        AlertWarning(response.message);
        // setLoader(false);
      }
      setDateListShimmer(false);
    } catch (err) {
      // setLoader(false);
      console.error('🚀 ~ file: StartDay.js:59 ~ getPunchDates ~ err:', err);
      appendTextToFile({
        text: `Error in catch fun getPunchDates inside Dashboard screen Line 419 ${err}`,
        // headerDate: headerDate,
      });
      setDateListShimmer(false);
    }
  };

  useEffect(() => {
    if(network){
      getPunchDates();
    }
  }, [dayType,network])


  return (
    <>
      <ModalRoot
        testID={'DateListModal'}
        showModal={props.datelistModal}
        setShowModal={props.setDateListModal}
        width={
          modalWidth
        }
        height={440}
        content={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: '100%',
            }}>
            {!isAccountLocked && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignSelf: 'center',
                  // backgroundColor: 'red',
                  top: -5
                }}>
                <Text style={{ ...styles.title, fontSize: 16, fontFamily: FontFamily.TTCommonsBold }}>
                  Select Day to mark attendances
                </Text>
                <TouchableOpacity
                  onPress={() => props.setDateListModal(!props.datelistModal)}
                  activeOpacity={0.5}>
                  <View style={{ ...StyleCss.CLOSEBUTTON, borderColor: themecolor.TXTWHITE }}>

                    <MCIcon name="close" color={themecolor.TXTWHITE} size={20} />

                  </View>
                </TouchableOpacity>
              </View>
            )}
            {/* <Spacer h={5}/> */}
            <View style={{ width: '100%' }}>

              {
                isAccountLocked ? <></> :
                  <View style={{ flexDirection: 'row' }}>
                    <ButtonRoot width={'50%'} height={40} title='Working Days' color={dayType == 'R' ? Colors.MRGREEN : Colors.white} borderRadius={0} textColor={dayType == 'R' ? Colors.white : Colors.gray} onPress={() => { setDayType('R') }} />
                    <ButtonRoot width={'50%'} height={40} title='Non-Working Days' color={dayType == 'W,H' ? Colors.MRGREEN : Colors.white} borderRadius={0} textColor={dayType == 'W,H' ? Colors.white : Colors.gray} onPress={() => { setDayType('W,H') }} />
                  </View>
              }


              <Spacer h={5} />
              {/* <ScrollView showsVerticalScrollIndicator={false} > */}
              {isAccountLocked ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{ alignItems: 'center' }} >
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 21,
                        fontFamily: FontFamily.TTCommonsMedium,
                      }}>
                      Account Locked
                    </Text>
                    <Text
                      style={{
                        color: Colors.MRSTARTMYDAY,
                        fontSize: 18,
                        fontFamily: FontFamily.TTCommonsMedium,
                      }}>
                      {lockedReason}
                    </Text>
                  </View>

                  <Spacer h={20} />
                  <FAIcon name="lock" size={100} color="red" />
                  <Spacer h={20} />

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: FontFamily.TTCommonsRegular,
                      fontSize: 18,
                      textAlign: 'center'
                    }}>
                    Please contact your manager for unlocking purpose.
                  </Text>
                  <Spacer h={30} />
                  <View style={{}} >
                    <ButtonRoot width={100} height={25} title='Close' color={Colors.MRSTARTMYDAY} onPress={() => { props.setDateListModal(!props.datelistModal) }} />
                  </View>
                </View>
              ) : (

                <View>
                  {dateListShimmer ? [1, 2, 3, 4].map(i => <ShimmerDateList key={i} />)
                    : <FlatList
                      data={datesData}
                      renderItem={({ item, index }) => <RenderFunction item={item} index={index} />}
                      keyExtractor={(item) => item?.date?.toString()}
                      style={{ height: isMobile ? (isLandscape ? 240 : 340) : 340 }}
                    />
                  }
                </View>




              )}
              {/* </ScrollView> */}
            </View>
          </View>
        }
        padding={25}
      />
      <DateLockWarningModal
        dateLockModal={dateLockModal}
        setDateLockModal={setDateLockModal}
      />

    </>
  );
};

export default DateListModal;

const styles = StyleSheet.create({

  title: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.h5,
    color: Colors.black,
    alignSelf: 'flex-start',
  },

  discription: {
    fontFamily: FontFamily.TTCommonsBold,
    fontSize: FontSize.verysmallText,
    width: '100%',
  },

  renderFunCont: {
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    padding: 2,
    // backgroundColor:'red'
  },

  renderFunDownCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  custom_boder: {
    borderWidth: 0.2,
    borderColor: '#ebeded',
    marginTop: 5,
    marginBottom: 5,
  },
});
