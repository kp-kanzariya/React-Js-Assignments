import React from 'react';
import * as Progress from 'react-native-progress';
import { Modal, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { MyThemeClass } from '../shared/Theme/ThemeDarkLightColor';
import { StyleSheet } from 'react-native';
import { syncWithUpdated } from '../../Database/sync';
import { store } from '../../redux/store';
import { checkUnsyncedChanges, resetDataBase } from '../../Database/database';
import { SharedMethod } from '../../Database/SharedMethod';
import { useNavigation } from '@react-navigation/native';
import { AlertDanger } from '../shared/alerts/Alert';
import FullSyncModal from './FullSyncModal';
import { FullSync } from '../../Database/Helpers/FullSync';
import moment from 'moment';
import {
  getDatafromAsync,
  StoreDatatoAsync,
} from '../../helper/utils/AsyncStorageServices';
import { appendTextToFile } from '../../helper/utils/Logger';
import { userProfile } from '../../data/userProfile';
import employeeDao from '../../Database/DAO/employeeDao';
import { handleLogout } from '../../api/commonRepository';
import useUploadOfflineAttachments from '../../hooks/useUploadOfflineAttachments';

var arr = [];

export default MasterSyncModal = props => {
  const { network } = useSelector(state => state.network);
  const { mode } = useSelector(state => state.mode);
  const { headerDate } = useSelector(state => state.header);
  const navigation = useNavigation();
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const { isLandscape } = useSelector(state => state.isLandscape);
  const [modalVisible1, setModalVisible1] = React.useState(true);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [closeButton, setCloseButton] = React.useState(false);
  const [syncing, setSyncing] = React.useState('Syncing...');
  const [syncModal, setSyncModal] = React.useState(false);
  const uploadAttachments = useUploadOfflineAttachments();

  React.useEffect(() => {
    (
      async () => {
        try {
          await userProfile();
        } catch (e) {
          console.error('Error in getprofile in MasterSyncModal...', e);
        }
      }
    )()
  }, []);

  React.useEffect(() => {
    async function outerFunTemp() {
      try {
        setTimeout(() => {
          animate();
        }, 2000);

        function forFullSync() {
          async function recursiveFunction() {
            syncWithUpdated()
              .then(() => {
                // alert("Inside then")
                console.log('Inside then Line 51');
                async function innerFunTemp() {
                  // alert("Inside innerFunTemp"+arr.length)
                  console.log('Inside innerFunTemp 54');
                  console.warn('Master sync run ' + arr.length + ' time');

                  if (arr.length == 0) {
                    // alert("Inside If"+arr.length)
                    arr.push('0');
                    setSyncing('Syncing...');
                    setTimeout(() => {
                      recursiveFunction();
                      setSyncing('Syncing...');
                    }, 5000);
                  } else {
                    // alert("Inside Else"+arr.length)
                    arr.length = 0;
                    let pendingSync
                    console.log('Inside Else 69');
                     try{
                       pendingSync = await checkUnsyncedChanges();
                      // ======= new code 👇 ============
                      // if (!pendingSync) {
                      //   uploadAttachments();
                      // }
                     }catch(e){
                       console.error("Error duringh upload attachement --",e);
                     }
                   
                    // ======= new code 👆 ============
                    setSyncing('Data Synced Successfully');
                    setCloseButton(true);
                    store.dispatch({
                      type: 'SET_SYNC_STATUS',
                      payload: pendingSync,
                    });
                    props.setModalVisible1(!props.modalVisible1);
                    store.dispatch({
                      type: 'REMOVE_ALL_CUSTOMERS_TO_THE_FIELDWORK_TEMPORARY',
                    });
                    store.dispatch({ type: 'REMOVE_ALL_FIELDWORK_DATA' });
                    store.dispatch({
                      type: 'REMOVE_ALL_CUSTOMER_CLASSIFICATION',
                    });
                    store.dispatch({ type: 'REMOVE_ALL_CUSTOMER_TYPES' });
                    store.dispatch({ type: 'REMOVE_ALL_CUSTOMER_PATCHES' });

                    let parsed_last_full_sync = await getDatafromAsync(
                      '@last_full_sync',
                    );
                    console.log(
                      'last_full_sync Line 63 -->',
                      parsed_last_full_sync,
                    );
                    var d1 = new Date(parsed_last_full_sync);
                    var d2 = new Date();
                    var diff = d2.getTime() - d1.getTime();
                    var daydiff = (diff / (1000 * 60 * 60 * 24)).toFixed('0');
                    console.log('daydiff=====>', daydiff);

                    //If day difference between last full sync and current date is equal or more than 15 days
                    if (daydiff >= 15) {
                      setSyncModal(true);
                      //New Code with statusCode == 300 Start
                      async function forFullSync() {
                        await resetDataBase();
                        FullSync()
                          .then(async res => {
                            console.log(
                              'res in fullSync in UserProfile Line 156...',
                              res,
                            );
                            if (res == '300') {
                              console.log('inside 158 in UserProfile.');
                              setTimeout(() => {
                                forFullSync();
                              }, 5000);
                            } else {
                              console.log(
                                'Inside Else Line 230 resolved..',
                                res,
                              );
                              async function temporaryForStoreLastFullSync() {
                                await StoreDatatoAsync(
                                  '@last_full_sync',
                                  moment(new Date()).format('YYYY-MM-DD'),
                                );
                              }
                              temporaryForStoreLastFullSync();
                              setTimeout(() => {
                                setSyncModal(false);
                                navigation.reset({
                                  index: 0,
                                  routes: [{ name: 'Dashboard' }],
                                });
                              }, 5000);
                            }
                          })
                          .catch(async e => {
                            // setSyncModal(false);
                            Alert.alert('Error while FullSync.', `${e}`);
                            appendTextToFile({
                              text: `Error in catch inside MasterSyncModal Line 125 ${e}`,
                              headerDate: store?.getState().header.headerDate,
                            });
                          });
                      }

                      forFullSync();
                      //New Code with statusCode == 300 End
                    }
                    else {
                      console.log('Inside Else 130');
                      //---> New code for inActive user Start
                      let employee = await employeeDao.getEmployees();
                      console.log("Employee Data after syncing ===>",employee)
                      if(employee[0]?.Status == 0){
                        AlertDanger("User got inactive ")
                        await handleLogout();
                      }else{
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Dashboard' }],
                        });
                      }
                      //---> New code for inActive user End
                    }
                  }
                }

                // Called innerFunTemp
                innerFunTemp();
              })
              .catch(async e => {
                Alert.alert(`${e}`);
                appendTextToFile({
                  text: `Error in catch inside MasterSyncModal Line 152 ${e}`,
                  headerDate: store?.getState().header.headerDate,
                });
              });
          }

          recursiveFunction();
        } //End of forFullSync function

        setSyncing('Syncing...');
        var sharemethodobj = new SharedMethod();
        await sharemethodobj.syncAllOrderData();
        forFullSync();
      } catch (e) {
        console.error('Error in masterSync', e);
        props.setModalVisible1(!props.modalVisible1);
        AlertDanger(`${e}`);
        appendTextToFile({
          text: `Error in catch inside MasterSyncModal Line 172 ${e}`,
          headerDate: store?.getState().header.headerDate,
        });
      }
    }

    try {
      if (network) {
        outerFunTemp()
      } else {
        props.setModalVisible1(!props.modalVisible1);
        AlertDanger('No connection');
      }
    } catch (e) {
      AlertDanger(`${e}`);
      appendTextToFile({
        text: `Error in catch inside MasterSyncModal Line 188 ${e}`,
        headerDate: store?.getState().header.headerDate,
      });
    }
  }, []);

  const animate = async () => {
    let progress = 0;
    setProgress(progress);
    setTimeout(() => {
      setIndeterminate(false);
      let t = 1;
      setInterval(() => {
        progress += Math.random();
        if (progress > 1) {
          progress = progress + 30;
        }
        setProgress(progress);
      }, 3000);
    }, 1000);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
          props.setRefresh(!props.refresh);
        }}>
        <View style={{ ...StyleCss.centeredView }}>
          <View
            style={{
              ...StyleCss.modalView,
              backgroundColor: themecolor.RB2,
              width: isLandscape ? 500 : '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                ...StyleCss.FLexCenter,
                position: 'absolute',
                right: 10,
                top: 10,
                // alignItems: 'flex-end',
                width: isLandscape ? 500 : '85%',
                justifyContent: 'flex-end',
                // alignSelf:'flex-end'
              }}>
              {closeButton ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      props.setRefresh(!props.refresh);
                      props.setModalVisible1(!props.modalVisible1);
                    }}
                    activeOpacity={1}>
                    <View
                      style={{
                        ...StyleCss.CLOSEBUTTON,
                        borderColor: themecolor.TXTWHITE,
                      }}>
                      <MCIcon
                        name="close"
                        color={themecolor.TXTWHITE}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}
            </View>
            <View style={StyleCss.ModalViewWidth}>
              <View style={StyleCss.ModelVideoCenter}>
                <View style={{ marginTop: 30 }} />
                <Progress.Circle
                  indeterminate={indeterminate}
                  showsText={true}
                  color={Colors.green1}
                  borderRadius={30}
                  progress={progress}
                  animated={true}
                  size={120}
                  thickness={5}
                  //  width={300}
                  //  height={20}
                  indeterminateAnimationDuration={2000}
                />
                {/* <Image
          style={{...styles.ImageCss}}
          source={require('../../assets/alembicimages/recycle.gif')}
          resizeMode={'contain'}
        /> */}
              </View>

              <View style={StyleCss.MV5} />
              {/* <Text style={{ ...StyleCss.ModelTextSub, color: themecolor.TXTWHITE }}>Material {syncing}</Text>
            <Text style={{ ...StyleCss.ModelTextSub, color: themecolor.TXTWHITE }}>Calender {syncing}</Text> */}
              <Text
                style={{ ...StyleCss.ModelTextSub, color: themecolor.TXTWHITE }}>
                {syncing}
              </Text>
              <View style={StyleCss.MV5} />
            </View>
          </View>
        </View>
      </Modal>

      <FullSyncModal showModal={syncModal} setShowModal={setSyncModal} />
    </>
  );
};
const styles = StyleSheet.create({
  ImageCss: {
    resizeMode: 'contain',
    width: 220,
    height: 170,
    alignSelf: 'center',
  },
});
