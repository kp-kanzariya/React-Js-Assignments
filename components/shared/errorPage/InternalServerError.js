import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Appearance,
  Alert
} from 'react-native';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import ButtonRoot from '../buttons/ButtonRoot';
import { Colors } from '../../../assets/config/Colors';
import { checkUnsyncedChanges } from '../../../Database/database';
import { API } from '../../../api/API';
import { SERVER_URL } from '../../../api/commonRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../../../redux/store';
import { navigateToClearStack } from '../../../navigation/NavigationDrw/NavigationService';
import { AlertDanger } from '../alerts/Alert';
import { getData } from '../../../api/Request';
import { truncateSqliteTable } from '../../../Database/Sqlite';
import { appendTextToFile } from '../../../helper/utils/Logger';


export default function InternalServerError(props) {
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: themecolor.THEMECOLOR1,
    },

    LogoStyle: {
      width: 220,
      height: 220,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    img_styl_server: {
      width: 500,
      height: 500,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    splash_img: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      alignSelf: 'center',
      // flex: 1,
    }
  });

  async function handleLogout() {
    // alert('hi')
    try {
      let sync_pending = await checkUnsyncedChanges();
      if (sync_pending) {
        Alert.alert('Warning !', 'please sync your data first.');
      } else {
        let result = await getData({ url: API.logout });
        if (
          result.statusCode === 200 &&
          result.message === 'Logout Successfully.'
        ) {
          await truncateSqliteTable();
          await AsyncStorage.removeItem('@user');
          await AsyncStorage.removeItem('@userProfile');
          await AsyncStorage.removeItem('@google_key');
          // await AsyncStorage.removeItem('fcmtoken');
          await AsyncStorage.removeItem('@roles');
          await AsyncStorage.removeItem('@firstFW');
          await AsyncStorage.removeItem('@firstNCA');
          store.dispatch({ type: 'REMOVE_USER_DATA' });
          // removeDatafromAsync("@userProfile");

          let t = {
            url: `${await SERVER_URL()}`,
          };
          navigateToClearStack('Login', t);
        } else {
          AlertDanger('Something went wrong,Please try again later.');
        }
      } //End of else
    } catch (e) {
      console.error('Error while sync...', e);
      AlertDanger('Something went wrong,Please try again later.');
      appendTextToFile({
        text: `Error in catch fun handleLogout inside InternalServerError Line 95 ${e}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  }


  return (
    <View style={[styles.MainContainer]}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ position: 'relative' }}>
          <Image
            style={{
              ...styles.img_styl_server
            }}
            source={require('../../../assets/alembicimages/server_error.jpg')}
          />
          <View
            style={{
              backgroundColor: themecolor.THEMECOLOR1,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 220,
            }}>
            <ButtonRoot onPress={() => {
              handleLogout()
            }} color={Colors.MRSTARTMYDAY} title='Logout' width={150} />
            {/* <ButtonRoot width={150} /> */}
          </View>
          <View>
            <Image
              style={{
                ...styles.splash_img
              }}
              source={
                require('../../../assets/alembicimages/background.png')
              } />
          </View>
        </View>
      </View>
    </View>
  );
}

