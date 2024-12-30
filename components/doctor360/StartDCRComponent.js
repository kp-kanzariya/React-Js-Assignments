import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import SimmerStartDCRComponent from './SimmerStartDCRComponent';

const StartDCRComponent = props => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1000);

  }, []);


  return (
    <>
      {/* {show ? <></> : <SimmerStartDCRComponent />} */}
      {show ? (
        <SimmerStartDCRComponent />
      ) : (
        <View
          style={{
            ...styles.container,
            height: props.Cardheight,
            backgroundColor: props.backgroundColor,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              ...styles.img_container,

            }}>
            <Image
              resizeMode="contain"
              style={styles.img_size}
              source={props.ImagesDCR}
            />
          </View>
          <View
            style={{
              ...styles.side_text_btn_container,
              left: props.ML,
            }}>
            <Text
              style={{
                ...styles.text,
                fontSize: props.fontSize,
                flexWrap: 'wrap',
                width: props.WIDTHTEXT

              }}>
              {props.title}
            </Text>

            <View style={{ ...styles.btn }}>
              <ButtonRoot
                testID={props.testID}
                width="auto"
                height={25}
                borderRadius={30}
                color={props.btnColor}
                title={props.btnTitle}
                fontSize={14}
                padding={props.btnPadding}
                onPress={props.onPress}
                isdisable={props.isdisable}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default StartDCRComponent;

StartDCRComponent.defaultProps = {
  title: 'Are you ready for daily call reporting',
  btnTitle: 'Start DCR',
  fontSize: 12,
  backgroundColor: '#e1e1ff',
  btnPadding: 10,
  fontWeight: '400',
  btnColor: "#50b030"
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#e1e1ff',
    borderRadius: 10,
    flexDirection: 'row',
    //paddingHorizontal: 12,
    paddingVertical: 8,
  },
  img_container: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    alignSelf: 'center',
  },
  img_size: {
    width: 85,
    height: 85,
  },
  side_text_btn_container: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '72%',
    // padding: 5,
    // backgroundColor:'red'
    alignSelf: 'center',
    left: 8,
  },
  text: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000',
    fontSize: 12,
  },
  btn: {
    alignSelf: 'flex-start',
    // width: '60%',
    marginTop: 5,
  },
});
