import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import StyleCss from '../../../assets/css/styleOutlet';
import { Colors } from '../../../assets/config/Colors';
import ModalRoot from './ModalRoot';
import { useSelector } from 'react-redux';
import useResponsiveDimensions from '../../../hooks/useResponsiveDimensions';
import ButtonRoot from '../buttons/ButtonRoot';
import { FontFamily } from '../../../assets/fonts/FontFamily';

let SuccessModal = ({
  isModalVisible,
  setModalVisible,
  btnTitle,
  msg,
  subTitle,
  onPress,
  disableBackPress,
}) => {
  const { isLandscape } = useSelector(state => state.isLandscape);
  const [modalWidth] = useResponsiveDimensions({
    mobile: ['50%', '90%'],
    tab: ['40%', '60%'],
  });

  return (
    <>
      <ModalRoot
        testID={'successModal'}
        width={modalWidth}
        // height={modalHeight}

        content={
          <View style={{ ...StyleCss.ModalViewWidth }}>
            <View style={{ width: '100%', alignSelf: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  width: '100%',
                  alignSelf: 'center',
                }}>
              </View>
            </View>
            <View style={{ ...StyleCss.ModelVideoCenter }}>
              <Video
                source={require('../../../assets/alembicimages/expesne/confirmation.mp4')}
                style={{
                  ...StyleCss.backgroundVideo,
                  width: 200,
                  height: 200,
                  alignSelf: 'center',
                }}
                muted={true}
                resizeMode={'contain'}
                repeat={true}
                rate={2.0}
                ignoreSilentSwitch={'obey'}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: isLandscape ? 18 : 13,
                    color: Colors.black,
                    textAlign: 'center',
                    fontFamily: FontFamily.TTCommonsMedium,
                    alignSelf: 'center',
                    top: 5
                  }}>
                  {msg}
                </Text>
                <Text style={StyleCss.submittext}>{subTitle}</Text>
              </View>
              <View style={StyleCss.MV5} />
              <View style={{ ...StyleCss.FLexCenter, bottom: 0 }}>
                <View style={StyleCss.MV5} />
                <ButtonRoot
                  testID={'ThanksAndCloseModal'}
                  color={Colors.MRGREEN}
                  width={isLandscape ? '30%' : '60%'}
                  height={40}
                  fontSize={14}
                  // width={isMobile ? 150 : 144}
                  // fontsize={isMobile ? 14 : 16}
                  // BRadius={isMobile ? 10 : 10}
                  // height={35}
                  backgroundColor={Colors.MRGREEN}
                  onPress={onPress}
                  title={btnTitle}
                />
                {/* <FullsizeButton width={width*0.25} fontsize={11} BRadius={30} height={30} backgroundColor={'transparent'} titlecolor={Colors.grey}  title='No' /> */}
              </View>
            </View>
            {/* </View> */}
          </View>
        }
        showModal={isModalVisible}
        setShowModal={setModalVisible}
        disableBackPress={disableBackPress}
      />
    </>
  );
};

export default SuccessModal;
// Product brochure has been successfully downloading.
SuccessModal.defaultProps = {
  msg: 'Product brochure has been successfully downloading.',
  btnTitle: 'Thank You',
  subTitle: '',
  // width: width * 0.32
};
const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
  },

  radioBtn: {
    backgroundColor: '#fff',
    width: '80%',
    // height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 14,
    color: Colors.black,
    alignSelf: 'flex-start',
  },
});
