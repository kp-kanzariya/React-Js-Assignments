import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Appearance,
  StyleSheet,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../../../assets/css/stylesDashboard';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { ImagesAssets } from '../ImagesAssets';
import { useDispatch, useSelector } from 'react-redux';
import UserDummyImage from '../UserDummyImage';
import moment from 'moment';
import {
  formatText,
  getGreetingmessage,
  handleLogout,
  SERVER_URL,
} from '../../../api/commonRepository';
import { getDatafromAsync } from '../../../helper/utils/AsyncStorageServices';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import RightRBSheet from '../rbsheets/RightRBSheet';
import { Colors } from '../../../assets/config/Colors';
import Notification from '../../../screens/notification/Notification';
import { AlertDanger, AlertWarning } from '../alerts/Alert';
import IIcon from 'react-native-vector-icons/Ionicons';
import { checkUnsyncedChanges } from '../../../Database/database';
import { appendTextToFile } from '../../../helper/utils/Logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalRoot from '../modals/ModalRoot';
import { syncWithUpdated } from '../../../Database/sync';
import { FontSize } from '../../../assets/fonts/Fonts';
import IoIcon from 'react-native-vector-icons/Ionicons';
import ButtonRoot from '../buttons/ButtonRoot';
import OfflineMediaDao from '../../../Database/DAO/OfflineMediaDao';
import { postDataForMedia } from '../../../api/Request';
import { API } from '../../../api/API';

export default function Header(props) {
  const rbRef = React.useRef(null);
  const { network } = useSelector(state => state.network);
  const dispatch = useDispatch();

  const mode = useSelector(state => state.mode);
  const openDateList = useSelector(state => state.attendance?.openDateList);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  const { sync_pending } = useSelector(state => state.OfflineOnline);
  const { headerDate } = useSelector(state => state.header);
  const isDarkMode = Appearance.getColorScheme() === 'dark';
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [serverUrl, setServerUrl] = useState('');
  const [notification, setNotification] = useState([]);
  const [syncPending, setSyncPending] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [openServerMigrationModal, setOpenServerMigrationModal] = useState(false);
  const [migrationMsg1, setMigrationMsg1] = useState('Application is getting migrated to another Server.')
  const [migrationMsg2, setMigrationMsg2] = useState('Please wait... We are syncing your data.')
  const [migrationMsg3, setMigrationMsg3] = useState('Do not close the application')


  React.useEffect(() => {
    checkUnsyncedChanges();
  }, [])
  // alert(openServerMigrationModal);
  const checkDataBaseUrl = async () => {
    let scanneUrl = '';
    try {
      let initial_url = await SERVER_URL();
      // alert(initial_url)
      scanneUrl = await AsyncStorage.getItem('@scannerBaseUrl')
      let requestOptions = {
        method: 'GET',
      };
      let res = await fetch(`${initial_url}api/checkDatabaseURL`, requestOptions)
      let result = await res.json();
      if (result && (result?.data?.migrtation === "true" || result?.data?.migrtation === true)) {
        // if (false) {

        setOpenServerMigrationModal(true);
        dispatch({ type: 'ADD_MIGRATION_REQ', payload: true })
        syncWithUpdated().then(() => {
          setMigrationMsg2('');
          setMigrationMsg3('Data Synced successfully. Relogin please.');
          handleLogout(false, result?.data?.change_url)
          AsyncStorage.setItem('@baseurl', `${result?.data?.change_url}/`);
        })
          .catch((err) => {
            AsyncStorage.setItem('@baseurl', scanneUrl);
            AlertWarning('Someting went wrong with Syncing the data');
          })
      } else {
        dispatch({ type: 'ADD_MIGRATION_REQ', payload: false });
      }
    } catch (err) {
      AsyncStorage.setItem('@baseurl', scanneUrl);
      console.log("🚀 ~ file: Header.js:68 ~ checkDataBaseUrl ~ err:", err)
    }
  }
  // alert(props.showMigration)
  React.useEffect(() => {
    if (network) {
      if (props.showMigration) {
        if (Platform.OS === 'ios') {
          setOpenServerMigrationModal(true)
          checkDataBaseUrl()
        } else {
          setTimeout(() => {
            setOpenServerMigrationModal(true)
            checkDataBaseUrl()
          }, 2000);
        }
      } else {
        checkDataBaseUrl()
      }
    }
  }, [network])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getProfile = async () => {
    try {
      const data = await getDatafromAsync('@userProfile');
      setUserData(data);
    } catch (err) {
      console.log("🚀 ~ file: Header.js:76 ~ getProfile ~ err:", err)
      appendTextToFile({
        text: `Error in catch fun getProfile inside header Line 78 ${err}`,
        headerDate: headerDate
      });
    }
  };

  const Ring = ({ delay }) => {
    const ring = useSharedValue(0);
    const ringStyle = useAnimatedStyle(() => {
      return {
        opacity: 0.9 - ring.value,
        transform: [
          {
            scale: interpolate(ring.value, [10, 150], [10, 150]),
          },
        ],
      };
    });

    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false,
      ),
    );

    return <Animated.View style={[styles.ring, ringStyle]} />;
  };

  const getServerUrl = async () => {
    try {
      const url = await SERVER_URL();
      setServerUrl(url);
    } catch (err) {
      console.error('🚀 ~ file: UserProfile.js:59 ~ getServerUrl ~ err:', err);
    }
  };

  useEffect(() => {
    getProfile();
    const msg = getGreetingmessage();
    setGreeting(msg);
    getServerUrl();
  }, []);

  // alert(userData?.EmployeeMedia);

  return (
    <>
      <View
        style={{
          ...styles.header,
          height: props.height,
          backgroundColor:
            headerDate == moment().format('YYYY-MM-DD')
              ? themecolor.HEADERTHEMECOLOR
              : '#b6b6b4',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <View style={{marginVertical: 0, width: '100%'}}> */}
        <View
          style={{
            // ...styles.Head2,
            marginTop: 10,
            // backgroundColor:'red',
            flexDirection: 'row',
            alignItems: 'center',
            width: '96%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              testID={'openCloseDrawer'}
              activeOpacity={0.7}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={ImagesAssets.MenuIconsHeader}
                style={{
                  ...styles.Menu,
                  // marginHorizontal: isLandscape ? 5 : 5,
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // marginHorizontal: isLandscape ? 15 : 15,
                marginLeft: 5,
              }}
              activeOpacity={0.7}
            // onPress={() => navigation.navigate('Profile')}
            >
              {/* <Image
              source={require('../../../assets/alembicimages/dummyuser.png')}
              style={stylesRes.ProfileUser}
            /> */}
              {/* <View style={styles.ProfileUser}>
              <UserDummyImage />
            </View> */}
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 3,
                  borderRadius: 70,
                  borderColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  left: 5
                }}>
                {userData?.EmployeeMedia == null ? (
                  <UserDummyImage />
                ) : (
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: `${serverUrl}media?id=${userData?.EmployeeMedia}` }}
                  />
                )}
              </View>
            </TouchableOpacity>
            <View
              style={{
                // flexDirection: isLandscape ? 'row' : 'column',
                marginLeft: isLandscape ? 15 : 10,
              }}>
              <View
                style={{
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  flexDirection: 'row',
                  top: isMobile ? 0 : 2,
                }}>
                <Text
                  style={{
                    ...styles.Text,
                    fontSize: isLandscape ? 14 : 11,
                    // top: 3,
                  }}>
                  {greeting} {formatText(userData?.FirstName) || '-'} !
                </Text>

                {!isMobile && (
                  <TouchableOpacity
                    testID='openDateList'
                    onPress={props.onPress}
                    activeOpacity={0.5}
                    style={{
                      backgroundColor: network
                        ? props.showChangeDate
                          ? Colors.MRAGENDABUTTONBG
                          : 'transparent'
                        : 'white',
                      opacity: network ? 1 : 0.8,
                      // width: 'auto',
                      borderRadius: 50,
                      left: 10,
                      top: isMobile ? (isLandscape ? 132 : 10) : isLandscape ? -1 : -5,
                      // alignSelf: 'center',
                      // justifyContent: 'center',
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      alignSelf: 'flex-start',

                    }}>
                    {network ? (
                      props.showChangeDate ? (
                        <FAIcon
                          name={'calendar'}
                          size={10}
                          // color={network?'red':'red'}
                          style={{
                            color: themecolor.WHITE,
                            alignSelf: 'center',
                          }}
                        />
                      ) : (
                        <></>
                      )
                    ) : (
                      <FAIcon
                        name={'circle'}
                        size={10}
                        // color={network?'red':'red'}
                        style={{
                          color: 'red',
                          alignSelf: 'center',
                        }}
                      />
                    )}
                    {network ? (
                      props.showChangeDate ? (
                        <Text
                          style={{
                            ...styles.Text,
                            fontSize: isLandscape ? (network ? 9 : 10) : 9,
                            color: network ? themecolor.WHITE : 'red',
                            textAlign: 'center',
                            alignSelf: 'center',
                          }}>
                          &nbsp;Change Date
                        </Text>
                      ) : (
                        <></>
                      )
                    ) : (
                      <Text
                        style={{
                          ...styles.Text,
                          fontSize: isLandscape ? (network ? 9 : 10) : 9,
                          color: network ? themecolor.WHITE : 'red',
                          textAlign: 'center',
                          alignSelf: 'center',
                        }}>
                        &nbsp;Offline
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
              <View style={{ bottom: isMobile ? 0 : 2 }}>
                <Text
                  style={{
                    ...styles.TextGood2,
                    fontSize: isLandscape ? 18 : 15,
                    top: isMobile ? (isLandscape ? null : 0) : 5,
                  }}>
                  {headerDate
                    ? moment(headerDate).format('dddd, Do MMM YYYY')
                    : 'DD-MM-YYYY'}
                </Text>
                {props.showChangeDate && isMobile && !isLandscape && (
                  <TouchableOpacity
                    testID='openDateList'
                    onPress={props.onPress}
                    activeOpacity={0.5}
                    style={{
                      backgroundColor: Colors.MRAGENDABUTTONBG,
                      // width: 'auto',
                      borderRadius: 50,
                      // alignSelf: 'center',
                      // justifyContent: 'center',
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      alignSelf: 'flex-start',
                      top: 1,
                    }}>
                    <FAIcon
                      name="calendar"
                      size={10}
                      style={{
                        color: network ? themecolor.WHITE : 'red',
                        alignSelf: 'center',
                      }}
                    />
                    <Text
                      style={{
                        ...styles.Text,
                        fontSize: isLandscape ? (network ? 9 : 10) : 9,
                        color: themecolor.WHITE,
                        textAlign: 'center',
                        alignSelf: 'center',
                      }}>
                      &nbsp;{network ? 'Change Date' : 'Offline'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              //  backgroundColor:'red',
            }}>
            <View style={{ width: 24, right: 20 }}>
              {sync_pending && <IIcon name="cloud-offline-sharp" color={Colors.darkgreen} size={24} />}

            </View>
            {/* {!network&&<View style={{marginRight:15}} >
            <ButtonRoot
              // onPress={props.onPressThird}
              width={'auto'}
              height={27}
              padding={10}
              borderRadius={15}
              color={'transparent'}
              title={'Offline'}
              fontSize={10}
              textColor={'red'}
              preIconName={'circle'}
              preIconStyle={{color: 'red'}}
              preIconSize={10}
            />
          </View>} */}
            <TouchableOpacity
              testID='searchHeader'
              activeOpacity={0.5}
              onPress={() => navigation.navigate('SearchHeader')}>
              <Image
                source={ImagesAssets.SearchIconsHeader}
                style={{ ...styles.BellIcon, right: 5 }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              testID='notification-bell'
              style={{ marginLeft: 10 }}
              activeOpacity={0.5}
              // onPress={() => navigation.navigate('RightDrawer')}
              // onPress={() =>
              //   props.setIsShowRightDrawer(!props.isShowRightDrawer)
              //   // alert('hiii')
              // }
              onPress={() => {
                if (network) {
                  rbRef.current.open();
                } else {
                  AlertDanger('No internet connection');
                }
              }}>
              {/* <Image
              source={ImagesAssets.BellIconsHeader}
              style={styles.BellIcon}
              resizeMode={'contain'}
            /> */}
              <View style={{ zIndex: 77868686 }}>
                {notification.length > 0 && (
                  <>
                    <Ring delay={0} />
                    <Ring delay={1000} />
                    <Ring delay={2000} />
                    <Ring delay={3000} />
                  </>
                )}
                <View>
                  <Image
                    source={ImagesAssets.BellIconsHeader}
                    style={styles.BellIcon}
                    resizeMode={'contain'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>


        </View>
        {/* </View> */}
        {
          <RightRBSheet
            content={<Notification notification={notification} rbRef={rbRef} />}
            refRBSheet={rbRef}
          />
        }

      </View>
      {openServerMigrationModal && <ModalRoot width={isMobile ? '90%' : '50%'} height={'50%'}
        showModal={true}
        setShowModal={setOpenServerMigrationModal}
        content={
          <View style={{ justifyContent: 'space-between', height: '100%', width: '80%', alignItems: 'center' }} >
            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: FontSize.h2, color: 'black' }} >Server Migration</Text>
              <IoIcon size={180} name='server' />
            </View>
            <View style={{ alignItems: 'center' }} >
              <Text style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: FontSize.labelText5, }} >{migrationMsg1}</Text>
              {migrationMsg2 && <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                <Image
                  source={require('../../../assets/alembicimages/syncgifformigration.gif')}
                  resizeMode="center"
                  style={{ width: 30, height: 30 }}
                />
                <Text style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: FontSize.labelText5, }} >{migrationMsg2}</Text>
              </View>}
              {migrationMsg3 &&
                <Text style={{ fontFamily: FontFamily.TTCommonsMedium, fontSize: FontSize.labelText5, }} >{migrationMsg3}</Text>
              }
              {/* {<ButtonRoot title='Close' width='auto' padding={10} />} */}
            </View>
          </View>
        } />}
    </>
  );
}
// setOpenServerMigrationModal(false);

Header.defaultProps = {
  height: 85,
  showChangeDate: false,
  showMigration: false
};
const stylesRes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    alignSelf: 'center',
    width: '100%',
  },
  containerRes: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  containerResButtonGrid: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  responsiveBoxButtonGrid: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  responsiveBoxFullButtonGrid: {
    width: '100%',
    alignSelf: 'center',
  },
  ProfileUser: {
    width: 35,
    height: 35,
    borderRadius: 50,
    left: 2,
  },

  SubContainer: {
    height: 50,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.borderColor1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leave_Text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
  },
});
