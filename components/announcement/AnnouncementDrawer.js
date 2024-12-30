import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking
} from 'react-native';
import React from 'react';
import { FontFamily } from '../../assets/fonts/FontFamily';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { MyThemeClass } from '../shared/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';
import { FontSize } from '../../assets/fonts/Fonts';

export default function AnnouncementContent(props) {
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <>
      <View
        style={{
          width: '94%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: 50,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: Colors.borderColor1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>
              <Entypo name="megaphone" size={30} color={Colors.MRSTARTMYDAY} />
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.TTCommonsDemiBold,
                color: 'black',
                fontSize: 16,
                marginLeft: 3,
              }}>
              Company Announcement
            </Text>
          </View>
          <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
            <MCIcon name="close" size={22} color={Colors.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.MV5} />

        <View
          style={{
            width: '100%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: FontFamily.TTCommonsDemiBold,
              fontSize: FontSize.labelText3,
              // fontWeight: '700',
            }}>
            Title
          </Text>
          <View style={styles.MV3} />
        </View>

        <View
          style={{
            ...styles.InputMainView,
            borderWidth: 0.5,
            borderColor: themecolor.BOXBORDERCOLOR1,
            backgroundColor: Colors.Textinputbg,
            width: '100%',
            minHeight: 45,
            padding: 10,
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: FontFamily.TTCommonsRegular,
              fontSize: FontSize.labelText2,
              color: 'black',
            }}>
            {props?.data?.Title}
          </Text>
        </View>

        <View style={styles.MV5} />

        <View style={{ width: '100%', alignSelf: 'center' }}>
          <Text
            style={{
              color: 'black',
              fontFamily: FontFamily.TTCommonsDemiBold,
              fontSize: FontSize.labelText3,
              // fontWeight: '700',
            }}>
            Description
          </Text>
          <View style={styles.MV3} />
        </View>

        <View
          style={{
            ...styles.InputMainView,
            borderWidth: 0.5,
            borderColor: themecolor.BOXBORDERCOLOR1,
            backgroundColor: Colors.Textinputbg,
            width: '100%',
            padding: 10,
            minHeight: 50,
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: FontFamily.TTCommonsRegular,
              fontSize: FontSize.labelText2,
              color: 'black',
            }}>
            {props?.data?.Message}
          </Text>
        </View>

        <View style={styles.MV6} />

        <View style={{ width: '100%', alignSelf: 'center' }}>
          <Text
            style={{
              color: 'black',
              fontFamily: FontFamily.TTCommonsDemiBold,
              fontSize: FontSize.labelText3,
              // fontWeight: '700',
            }}>
            Attachment
          </Text>
        </View>
        <View>

          {props?.data?.MediaURL == undefined || null ?
            <Image
              resizeMode="contain"
              style={styles.img_size}
              source={require('../../assets/alembicimages/camera.png')}
            /> :
            <TouchableOpacity onPress={() => props?.data?.MediaURL ? Linking.openURL(props?.data?.MediaURL) : alert('This announcement has no attachment.')}>
              <Image
                resizeMode="contain"
                style={styles.img_size}
                source={require('../../assets/alembicimages/camera.png')}
              />
            </TouchableOpacity>
          }

        </View>

        <View style={styles.MV5} />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  MV3: { marginVertical: 3 },
  MV5: { marginVertical: 5 },
  MV6: { marginVertical: 6 },
  MV8: { marginVertical: 8 },
  MainView: {
    width: '100%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    //   height: 'auto',
    // justifyContent: 'space-between',
  },
  InputMainView: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: Colors.Textinputbg,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  img_size: {
    width: 50,
    height: 50,
  },
});
