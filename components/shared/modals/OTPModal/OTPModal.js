import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import StyleCss from '../../../../assets/css/styleOutlet';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../../assets/config/Colors';
import ModalRoot from '../ModalRoot';
import { useSelector } from 'react-redux';
import useResponsiveDimensions from '../../../../hooks/useResponsiveDimensions';
import { ImagesAssets } from '../../ImagesAssets';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const { width, height } = Dimensions.get('window');
export default OTPModal = ({
  isModalVisible,
  setModalVisible,
  btnTitle,
  msg,
  onPressDone,
}) => {
  //   const [isModalVisible, setModalVisible] = useState(false);
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  // alert (isMobile)
  const [modalWidth] = useResponsiveDimensions({
    mobile: ['45%', '85%'],
    tab: ['40%', '60%'],
  });
  const [modalHeight] = useResponsiveDimensions({
    mobile: ['95%', '43%'],
    tab: ['70%', '40%'],
  });

  return (
    <>
      <ModalRoot
        width={modalWidth}
        height={modalHeight}
        content={
          <View style={{ ...StyleCss.ModalViewWidth }}>
            <View style={{ ...StyleCss.ModelVideoCenter }}>
              <Video
                source={ImagesAssets.OTPGif}
                // source={props.VideosURL}
                style={{
                  ...StyleCss.backgroundVideo,
                  height: isMobile ? 120 : 250,
                }}
                muted={true}
                resizeMode={'contain'}
                repeat={true}
                rate={2.0}
                ignoreSilentSwitch={'obey'}
              />

              <Text
                style={{ ...StyleCss.submittext, fontsize: isMobile ? 11 : 16 }}>
                {msg}
              </Text>
              <View
                style={{
                  width: isMobile ? '30%' : '45%',
                  height: 50,
                  alignSelf: 'center',
                }}>
                <OTPInputView
                  codeInputFieldStyle={{
                    width: 45,
                    // borderWidth: 0,
                    borderRadius: 13,
                    color: '#000',
                  }}
                  pinCount={4}
                  autoFocusOnLoad={false}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* </View> */}

            <View style={StyleCss.MV5} />
            <View style={StyleCss.FLexCenter}>
              <View style={StyleCss.MV5} />
              <View style={{ flexDirection: 'row' }}>
                <FullsizeButton
                  width={isMobile ? 72 : 144}
                  fontsize={isMobile ? 11 : 16}
                  BRadius={10}
                  height={35}
                  backgroundColor={Colors.MRGREEN}
                  onPress={onPressDone}
                  title={btnTitle}
                />
                <FullsizeButton
                  width={isMobile ? 68 : 168}
                  fontsize={isMobile ? 11 : 14}
                  BRadius={10}
                  height={35}
                  backgroundColor="#fff"
                  title="Cancel"
                  titlecolor="#b8b8b8"
                />
              </View>
              {/* <FullsizeButton width={width*0.25} fontsize={11} BRadius={30} height={30} backgroundColor={'transparent'} titlecolor={Colors.grey}  title='No' /> */}
            </View>
          </View>
        }
        showModal={isModalVisible}
        setShowModal={setModalVisible}
      />
    </>
  );
};

// Product brochure has been successfully downloading.
OTPModal.defaultProps = {
  msg: 'Product brochure has been successfully downloading.',
  btnTitle: 'Thank You',
};
