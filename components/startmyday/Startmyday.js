import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import { useSelector } from 'react-redux';
import useResponsiveDimensions from '../../hooks/useResponsiveDimensions';
import { ImagesAssets } from '../../components/shared/ImagesAssets';

const StartMyDay = props => {
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  const [StartDayWidth] = useResponsiveDimensions({
    mobile: [55, 80],
    tab: [65, 100],
  });
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);
  // alert(JSON.stringify(props.cardimage))

  return (
    <>
      <View
        style={{
          ...styles.mainContainer,
          backgroundColor: props.bgcolor,
          // width: isLandscape ? '100%' : '100%',
          height: props.cardheight,
        }}>
        <View
          style={{
            ...styles.container,
            marginLeft: 10,
            // width: isLandscape ? 65 : 100,
            // borderRadius: 80,
            overflow: 'hidden',
            borderWidth: 0.5,
            borderColor: Colors.borderColor1
          }}>
          {props.showImage ? (
            <Image
              style={{
                ...styles.img,
                width: 70,
              }}
              source={props.cardimage}
              resizeMode='contain'
            />
          ) : (
            <Image
              style={{
                ...styles.img,
                width: 70,
              }}
              source={ImagesAssets.CardImages}
              resizeMode='contain'

            />
          )}
        </View>
        <View
          style={{
            width: isMobile
              ? '75%'
              : isLandscape
                ? '75%'
                : '80%',
            marginLeft: isMobile
              ? 10
              : isLandscape
                ? 22
                : 10,
            justifyContent: 'center',

          }}>
          <View style={{ paddingVertical: 2 }}>
            <Text
              style={{
                ...styles.Txt,
                fontSize: props.boldsize,
                fontFamily: FontFamily.TTCommonsBold,
                // fontSize:14
                flexWrap: 'wrap',
                width: isMobile
                  ? isLandscape
                    ? '75%'
                    : '95%'
                  : isLandscape
                    ? '75%'
                    : '80%',
              }}>
              {props.goodmorningtext}
            </Text>
          </View>
          <View style={{ width: '92%', }}>
            <Text
              numberOfLines={props.numberlines}
              ellipsizeMode={props.tails}
              style={{ ...styles.Txt, width: '92%' }}>
              {props.text}
              <Text style={{ ...styles.Txt, color: 'skyblue' }}>
                {props.textblue}
              </Text>
            </Text>
          </View>
          {/* <View >
                    <Text style={styles.Txt}>{props.text1}<Text style={{...styles.Txt,color:'skyblue'}}> {props.text2}</Text>{props.text3}<Text style={{...styles.Txt,color:'skyblue'}}> {props.text4}</Text></Text>
                </View> */}
          <View
            style={{
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              flexDirection: 'row',
              top: props.TOP,
            }}>
            {props.cardbutton && (
              <ButtonRoot
                testID={props.cardbuttontestId}
                onPress={props.onPress}
                width={props.buttonwidth}
                height={27}
                Right={props.Right}
                borderRadius={15}
                color={props.buttonbgcolor}
                title={props.cardbutton}
                fontSize={props.ButtonFontSize}
                isdisable={props.isdisable}
              />
            )}
            {props.secondBtn && (
              <ButtonRoot
                testID={props.secondBtntestId}
                onPress={props.onPressSecond}
                width={props.secondButtonwidth}
                Right={props.Right}
                height={27}
                borderRadius={15}
                color={props.secondButtonbgcolor}
                title={props.secondCardbutton}
                fontSize={props.ButtonFontSize}
              />
            )}
            {props.thirdBtn && (
              <ButtonRoot
                testID={props.thirdBtntestId}
                onPress={props.onPressThird}
                width={props.ThirdButtonwidth}
                height={27}
                borderRadius={15}
                color={props.ThirdButtonbgcolor}
                title={props.ThirdCardbutton}
                fontSize={11}
                textColor={props.ThirdTxtColor}
                preIconName={'circle'}
                preIconStyle={{ color: 'tomato' }}
                preIconSize={10}
                padding={10}
              />
            )}
          </View>
        </View>
      </View>

    </>
  );
};

export default StartMyDay;

StartMyDay.defaultProps = {
  secondBtn: false,
  cardbutton: false,
  thirdBtn: false,
  showImage: false,
  cardbuttontestId:'firstBtn',
  secondBtntestId:'secondBtn',
  thirdBtntestId:'thirdBtn'
  // cardimage:{ImagesAssets.CardImages}
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: '#e6f1e2',
    borderRadius: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignSelf: 'center',
  },
  container: {
    // width: '20%',
    width: 70, height: 70,
    // overflow: 'hidden',
    borderRadius: 100,
    alignSelf: 'center',
  },
  img: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    // marginHorizontal: 15,
  },
  Txt: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: Colors.black,
    fontSize: 13,
    // fontWeight:'500'
  },
  Button: {
    alignSelf: 'flex-start',
    width: '30%',
    marginTop: 5,
  },
  TextContainer: { width: '80%' },

  simmer_container: {
    width: '100%',
    height: 110,
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e2e2',
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
