import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../shared/Theme/ThemeDarkLightColor';
import Simmer_DashboardButton from './Simmer_DashboardButton';
import E_DetailingModal from '../modals/E_DetailingModal';
import { AlertDanger, AlertWarning } from '../shared/alerts/Alert';
import { store } from '../../redux/store';
import LoadingFullScreen from '../shared/loader/LoadingFullScreen';
import NewRescheduleModal from '../../screens/Beat/components/NewRescheduleModal';
import NewSkipModal from '../../screens/Beat/components/NewSkipModal';
import TagsModal from '../modals/TagsModal';
import EdStatsDAO from '../../Database/DAO/EdStatsDAO';
import moment from 'moment';
import { appendTextToFile } from '../../helper/utils/Logger';
import SurveySubmitedDao from '../../Database/DAO/SurveySubmitedDao';
import SurveySubmitedAnswerDao from '../../Database/DAO/SurveySubmitedAnswerDao';
import EdSessionDAO from '../../Database/DAO/EdSessionDAO';


const DashboardButton = React.memo((props) => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const navigation = useNavigation();
  const { network } = useSelector(state => state.network);
  const { isLandscape } = useSelector(state => state.isLandscape);
  const { headerDate } = useSelector(state => state.header);
  const { permission } = useSelector(state => state.roles);

  const styles = StyleSheet.create({
    CardText: {
      fontFamily: FontFamily.TTCommonsMedium,
      color: Colors.black,
      alignSelf: 'center',
      top: 15,
    },
    containerresponsive: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      alignSelf: 'center',
      height: 'auto',
    },
    responsiveBox: {
      width: '100%',
      justifyContent: 'flex-start',
    },
    MainView: { height: 110, paddingHorizontal: 1 },
    SecondView: {
      alignSelf: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
      // flex: 1,
      backgroundColor: Colors.blue,
      width: 110,
      borderRadius: 10,
      borderColor: Colors.borderColor1,
      borderWidth: 1,
      height: 110,
      // overflow: 'hidden',
      // paddingHorizontal: 20,
    },
    ImageView: {
      backgroundColor: props.bgcolor,
      borderRadius: 50,
      width: 55,
      height: 55,
      justifyContent: 'center',
      alignSelf: 'center',
      top: 15,
    },
    IMGStyle: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    statusTextIn: {
      fontSize: FontSize.verysmallText,
      // color: Colors.black,
      fontFamily: FontFamily.TTCommonsMedium,
      alignSelf: 'center',
      top: 12,
      color: '#44bd32',
    },
    DotStatusGreenColor: {
      width: 5,
      height: 5,
      borderRadius: 10,
      backgroundColor: '#44bd32',
    },

    simmer_container: {
      height: 110,
      // backgroundColor: '#ffffff',
      padding: 5,
      borderRadius: 10,
      flexDirection: 'row',
      // borderWidth: 1,
      // borderColor: '#e2e2e2',
      overflow: 'hidden',
    },
    simmer_img_background: {
      width: '25%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      position: 'relative',
    },

    simmer_side_all_text_container: {
      padding: 5,
    },
  });


  const [eDetailingModal, setEDetailingModal] = useState(false);
  const [showModalSkipVisit, setShowModalSkipVisit] = React.useState(false);
  const [showModalReschedule, setShowModalReschedule] = React.useState(false);
  const [tagModal, setTagModal] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = React.useState(false);
  const [badge, setBadge] = React.useState(null);
  const [show, setShow] = useState(false);
  const [badgeColor, setBadgeColor] = useState('#fff');
  const { attendanceStatus } = useSelector(state => state.header);

  // console.log('props.tracking',props.tracking)

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  React.useEffect(() => {
    // if (props.navigateTo == 'SurveyCategory') {
    //   fetchSurveySubmitAnswerData(props?.data?.Outlet_Id, headerDate)
    // }
    if (props.navigateFrom == 'doctorViewEnable') {
      setIsDisable(false);
    }
    else if (props.navigateFrom == 'doctorViewdisable') {
      setIsDisable(true);
    }
    else {
      setIsDisable(false);
    }
    let col = generateColor();
    setBadgeColor(col);
  }, [props]);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };


  const getBadges = async(title) => {
    try {
      if (props.badgeData) {
        if (title == 'MTP') {
          if (props.badgeData?.PendingMtpCount != undefined) {
            setBadge(props.badgeData?.PendingMtpCount);
          } else {
            setBadge(null);
          }
        } else if (title == 'Leaves') {
          if (props.badgeData?.LeaveRequest != undefined) {
            setBadge(props.badgeData?.LeaveRequest);
          } else {
            setBadge(null);
          }
        } else if (title == 'Expense') {
          if (props.badgeData?.PendingExpenseCount != undefined) {
            setBadge(props.badgeData?.LeaveRequest);
          } else {
            setBadge(null);
          }
        }
         
      } else {
        setBadge(null);
      }
      if (title =='Feedback'){
        let surveyCount = await SurveySubmitedDao.getDraftSurveyCount();
        console.log("surveyCount",surveyCount)
        if(surveyCount){
          setBadge(surveyCount);
        }else{
          setBadge(null);
        }
      }
       if (title == 'Rx Tracking') {
        if (props?.tracking != undefined) {
          setBadge(props?.tracking);
        } else {
          setBadge(null);
        }
      }
    } catch (err) {
      console.error(
        '🚀 ~ file: DashboardButtonGrid.js:119 ~ getLeaveCount ~ err:',
        err,
      );
      appendTextToFile({
        text: `Error in catch useEffect inside BasicExpenseDetails Line 41 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
      setBadge(null);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getBadges(props.title);
      return () => { };
    }, [getBadges]),
  );


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDisable(false);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);


  // const fetchSurveySubmitAnswerData = async (outletId, headerDate) => {
  //   try {
  //     const res = await SurveySubmitedAnswerDao.getSurveySubmitAnswerByHeaderDateData(outletId, headerDate);
  //     let data = res?.map(record => record._raw)
  //     if (data && data?.length > 0) {
  //       setIsDisable(true)
  //     }
  //     if (__DEV__) {
  //       console.log('response__fetchSurveySubmitAnswerData___', data)
  //     }

  //   } catch (error) {
  //     console.error('errorrr___fetchAllSurveySurveySubmitedData__', error)
  //   }
  // }



  return (
    <>
      {show ? <></> : <Simmer_DashboardButton />}

      {show && (
        <>
          {loader ? (
            <LoadingFullScreen />
          ) : (
            <View
              style={{
                ...styles.containerresponsive,
                minWidth: isLandscape ? '10%' : 110,
              }}>
              {!disable ? (
                <View style={{ ...styles.responsiveBox, paddingVertical: 1 }}>
                  {
                    <TouchableOpacity
                      testID={`item-${props?.title}`}
                      disabled={isDisable}
                      activeOpacity={0.5}
                      onPress={() => {


                        if (props.navigateTo === 'E-Detailing') {
                          let dateInPast = function (firstDate, secondDate) {
                            if (
                              firstDate == secondDate
                            ) {
                              return true;
                            }
                            return false;
                          };

                          let t = dateInPast(headerDate, moment().format("YYYY-MM-DD"));

                          if (!headerDate) {
                            AlertWarning('Please start your day first.');
                          }
                          else if (!t) {
                            Alert.alert("Warning !", `you can't do E-detailing because have selected past date , Attendance Date - ${headerDate} , current Date - ${moment().format("YYYY-MM-DD")}`)
                          }
                          else {
                            if (props.canViewAgenda) {
                              setTagModal(true);
                            }
                            else {
                              AlertWarning('please mark your attendance');
                            }
                          }
                        }
                        else if (props.navigateTo == 'Reports') {
                          if (network) {
                            if (attendanceStatus == 'Day Started') {
                              navigation.navigate('Reports');
                            } else {
                              AlertWarning('Please Start Your day.');
                            }
                          } else {
                            AlertDanger('No internet connection');
                          }
                        }
                        // New Start
                        else if (props.navigateTo == 'SkipVisitModal') {
                          if (!headerDate) {
                            AlertWarning('Please start your day first.');
                          }
                           //Chemist condition
    else if( props?.data?.Reason == 'ADDED_THROUGH_RCPA' && permission[props?.data.OutlettypeId]?.includes('can_show_top_on_outlet_name')) {
      AlertWarning("Can't Skip this, because you have conducted RCPA on this.");   
      }else{

                          EdStatsDAO.getEdStatsExistOrNot({
                            OutletOrgId: props?.data?.OutletOrgDataId,
                            EdDate: headerDate,
                          }).then(outletExist => {
                            if (outletExist > 0) {
                              AlertDanger("Can't skip this, because you have completed E-detailing for today");
                            } else {
                              setShowModalSkipVisit(true);
                            }
                          });
                        }
                          //Code will be uncomment End ------------------------>>>>
                        } else if (props.navigateTo == 'ResheduleModal') {
                          if (!headerDate) {
                            AlertWarning('Please start your day first.');
                          }
                          else if( props?.data?.Reason == 'ADDED_THROUGH_RCPA' && permission[props?.data.OutlettypeId]?.includes('can_show_top_on_outlet_name')) {
                            AlertWarning("Can't reschedule this, because you have conducted RCPA on this.");   
                            }
                            else{
                            EdSessionDAO.getEdSessionExistOrNot({OutletOrgId: props?.data?.OutletOrgDataId,
                              EdDate: headerDate,}).then(detailingExist =>{
                                if (detailingExist > 0) {
                                        AlertDanger("Can't reschedule this, because you have completed E-detailing for today");
                                      } 
                                      else {
                                       setShowModalReschedule(true);
                                    }
                              })
                            }
                          //Code will be uncomment End ------------------------>>>>
                        } else if (props.navigateTo == 'Material') {
                          if (network) {
                            navigation.navigate('Material', {
                              navigateFrom: 'Dashboard',
                              subHeaderTitle: 'Documents',
                            });
                          } else {
                            AlertDanger('No internet connection');
                          }
                        } else if (props.navigateTo == 'E_DetailingModal') {
                          let dateInPast = function (firstDate, secondDate) {
                            console.log("firstDate", firstDate)
                            console.log("secondDate", secondDate)
                            if (
                              firstDate == secondDate
                            ) {
                              return true;
                            }
                            return false;
                          };

                          let t = dateInPast(headerDate, moment().format("YYYY-MM-DD"));
                          console.log("t---", t)
                          //Check used outlet is already e-detailed or not
                          EdSessionDAO.getEdSessionExistOrNot({OutletOrgId: props?.data?.OutletOrgDataId,
                            EdDate: headerDate,}).then(detailingExist =>{
                              if (!t) {
                                    Alert.alert("Warning !", `you can't do E-detailing because have selected past date , Attendance Date - ${headerDate} , current Date - ${moment().format("YYYY-MM-DD")}`)
                                  }
                                  else if (detailingExist > 0) {
                                    AlertDanger('E-detailing already done for today');
                                  } else {
                                    setDisable(false);
                                    setEDetailingModal(true);
                                  }
                            })                       
                        } else if (props.title == 'Customers') {
                          store.dispatch({
                            type: 'REMOVE_ALL_CUSTOMERS_TO_THE_FIELDWORK_TEMPORARY',
                          });
                          store.dispatch({ type: 'REMOVE_ALL_FIELDWORK_DATA' });
                          store.dispatch({ type: 'REMOVE_ALL_CUSTOMER_CLASSIFICATION' });
                          store.dispatch({ type: 'REMOVE_ALL_CUSTOMER_TYPES' });
                          store.dispatch({ type: 'REMOVE_ALL_CUSTOMER_PATCHES' });
                          navigation.navigate(props.navigateTo);
                        } else if (props.navigateTo == 'InputInventory') {
                          if (network) {
                            store.dispatch({ type: 'REMOVE_ALL_SELECTED_DATA' });
                            navigation.navigate(props.navigateTo);
                          } else {
                            AlertDanger('No internet connection');
                          }
                        } else if (props.navigateTo == 'SurveyCategory') {
                          navigation.navigate(props.navigateTo, {data:props.data});
                        }
                        else if (props.navigateTo == 'Feedback') {
                          if(headerDate){
                            navigation.navigate(props.navigateTo, {data:props.data});
                          }else{
                            AlertWarning('Please start your day first.');
                          }
                        }
                        else {
                          if (
                            props.navigateTo == 'Expense' ||
                            props.navigateTo == 'LeaveDashboard' ||
                            props.navigateTo == 'Mtp' ||
                            props.navigateTo == 'Team' ||
                            props.navigateTo == 'LeaveManagerDashboard' ||
                            props.navigateTo == 'InputInventory'
                          ) {
                            if (!network) {
                              AlertDanger('No internet connection');
                            } else {
                              navigation.navigate(props.navigateTo);
                            }
                          } else {
                            // console.log('propsshemu',props.data);
                            navigation.navigate(props.navigateTo,{data:props.data});
                          }
                        }

                        // New End
                      }}>
                      <View style={styles.MainView}>
                        <View
                          style={{
                            ...styles.SecondView,
                            backgroundColor: isDisable
                              ? 'lightgrey'
                              : themecolor.BOXTHEMECOLOR,
                            borderColor: themecolor.BOXBORDERCOLOR,
                            width: '100%',
                          }}>
                          <View
                            style={{ ...styles.ImageView, position: 'relative' }}>
                            <Image
                              style={styles.IMGStyle}
                              source={props.iconimg}
                              resizeMode={'contain'}
                            />
                            {network && badge ? (
                              <View
                                style={{
                                  backgroundColor: Colors.white,
                                  borderRadius: 15,
                                  width: 22,
                                  height: 22,
                                  position: 'absolute',
                                  top: -6,
                                  right: -7,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderWidth: 1.8,
                                  borderColor: Colors.MRTAG,
                                  borderStyle: 'dotted',
                                  alignSelf: 'center'
                                }}>
                                <Text
                                  style={{
                                    color: Colors.MRTAG,
                                    fontFamily: FontFamily.TTCommonsBold,
                                    fontSize: 14,
                                  }}>
                                  {badge}
                                </Text>
                              </View>
                            ) : (
                              <></>
                            )}
                          </View>
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{
                              ...styles.CardText,
                              paddingVertical: 5,
                              textAlign: 'center',
                              color: themecolor.TXTWHITE,
                            }}>
                            {props.title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              ) : (
                <View style={{ ...styles.responsiveBox, paddingVertical: 1 }}>
                  <TouchableOpacity disabled={isDisable} activeOpacity={0.5}>
                    <View style={styles.MainView}>
                      <View
                        style={{
                          ...styles.SecondView,
                          backgroundColor: isDisable
                            ? 'lightgrey'
                            : themecolor.BOXTHEMECOLOR,
                          borderColor: themecolor.BOXBORDERCOLOR,
                          width: '100%',
                        }}>
                        <View
                          style={{ ...styles.ImageView, position: 'relative' }}>
                          <Image
                            style={styles.IMGStyle}
                            source={props.iconimg}
                            resizeMode={'contain'}
                          />
                          {network && badge != null && (
                            <View
                              style={{
                                backgroundColor: badgeColor,
                                borderRadius: 15,
                                width: 22,
                                height: 22,
                                position: 'absolute',
                                top: -5,
                                right: -4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 0.5,
                                borderColor: Colors.borderColor1,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontFamily: FontFamily.Popinssemibold,
                                  fontSize: FontSize.labelText,
                                }}>
                                {badge || ''}
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            ...styles.CardText,
                            paddingVertical: 5,
                            textAlign: 'center',
                            color: themecolor.TXTWHITE,
                          }}>
                          {props.title}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </>
      )}

      <NewSkipModal
        showModal={showModalSkipVisit}
        setShowModal={setShowModalSkipVisit}
        setRefreshOutletStatus={props?.setRefreshOutletStatus}
        refreshOutletStatus={props?.refreshOutletStatus}
        data={props.data}
        moving={true}
        setLoader={setLoader}
        newPropForMovingScreen={() => {
          if (props?.data?.navigateFrom == 'Customers') {
            setTimeout(() => {
              setLoader(false);
              navigation.navigate('Customer', {
                navigateFrom: 'DoctorView',
              });
            }, 2000);
          } else {
            setTimeout(() => {
              setLoader(false);
              navigation.navigate('BeatRouteNew', {
                navigateFrom: 'DoctorView',
              });
            }, 2000);
          }
        }}
      />

      <NewRescheduleModal
        setShowModal1={setShowModalReschedule}
        showModal1={showModalReschedule}
        data={props?.data}
        setRefreshOutletStatus={props?.setRefreshOutletStatus}
        refreshOutletStatus={props?.refreshOutletStatus}
        moving={true}
        setLoader={setLoader}
        newPropForMovingScreen={() => {
          if (props?.data?.navigateFrom == 'Customers') {
            navigation.navigate('Customer', {
              navigateFrom: 'DoctorView',
            });
          } else {
            navigation.navigate('BeatRouteNew', {
              navigateFrom: 'DoctorView',
            });
          }
        }}
      />

      {eDetailingModal && (
        <E_DetailingModal
          showModal={eDetailingModal}
          setShowModal={setEDetailingModal}
          data={props.data}
        />
      )}

      <TagsModal showModal={tagModal} setShowModal={setTagModal} />
    </>
  );
});

export { DashboardButton };

